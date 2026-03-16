import { Request, Response } from "express";
import {
  FriendRequestModel,
  FriendRequestStatus,
} from "../models/FriendRequest";
import { getIO } from "../utils/socket";
import { ObjectId } from "mongodb";
import { FriendShipModel } from "../models/FriendShip";

export const sendFriendRequest = async (req: Request, res: Response) => {
  try {
    const { user, receiverId } = req.body;

    let friendRequest = await FriendRequestModel.create({
      senderId: user.userId,
      receiverId,
      status: FriendRequestStatus.Pending,
    });

    let friendRequestDetails = await FriendRequestModel.findById(
      friendRequest._id,
    ).populate("senderId", "username avatarUrl bio fullName");

    // notify receiver via socket
    try {
      const io = getIO();
      io.to(receiverId).emit("friendRequest", friendRequestDetails);
    } catch (e) {
      console.warn("Socket not ready when sending friend request", e);
    }

    return res.status(201).json({ success: true, data: friendRequest });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const acceptFriendRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const friendRequest = await FriendRequestModel.findByIdAndUpdate(
      id,
      { status: "accepted" },
      { new: true },
    ).populate("receiverId", "username avatarUrl bio fullName");

    // create friendship
    if (friendRequest) {
      await FriendShipModel.create({
        participants: [friendRequest.senderId, friendRequest.receiverId],
        status: "accepted",
      });
    }

    // inform sender about acceptance
    try {
      const io = getIO();
      if (friendRequest) {
        io.to((friendRequest as any).senderId.toString()).emit(
          "friendRequestAccepted",
          friendRequest,
        );
      }
    } catch (e) {
      console.warn("Socket not ready when accepting friend request", e);
    }

    return res.status(200).json({ success: true, data: friendRequest });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const rejectFriendRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const fr = await FriendRequestModel.findByIdAndDelete(id).populate(
      "receiverId",
      "username avatarUrl bio fullName",
    );

    // inform sender about rejection
    try {
      const io = getIO();
      if (fr) {
        io.to((fr as any).senderId.toString()).emit(
          "friendRequestRejected",
          fr,
        );
      }
    } catch (e) {
      console.warn("Socket not ready when rejecting friend request", e);
    }

    return res.status(200).json({ success: true, message: "Request rejected" });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const getFriends = async (req: any, res: Response) => {
  try {
    const me = new ObjectId(req.user.userId);

    const friends = await FriendShipModel.aggregate([
      { $match: { participants: me, status: "accepted" } },
      {
        $lookup: {
          from: "users",
          let: { participants: "$participants" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $in: ["$_id", "$$participants"] }, // is a participant
                    { $ne: ["$_id", me] }, // but not me
                  ],
                },
              },
            },
            {
              $project: {
                username: 1,
                avatarUrl: 1,
                bio: 1,
                isOnline: 1,
                fullName: 1,
              },
            },
          ],
          as: "friend",
        },
      },
      { $unwind: "$friend" },
      { $replaceRoot: { newRoot: "$friend" } }, // flatten — return friend directly
    ]);

    return res.status(200).json(friends);
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// GET /friend-requests/incoming — requests sent TO me
export const getIncomingRequests = async (req: any, res: Response) => {
  try {
    const userId = new ObjectId(req.user.userId);

    const requests = await FriendRequestModel.find({
      receiverId: userId,
      status: FriendRequestStatus.Pending,
    })
      .populate("senderId", "username avatarUrl bio fullName")
      .sort({ createdAt: -1 });

    return res.status(200).json(requests);
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// GET /friend-requests/outgoing — requests sent BY me
export const getOutgoingRequests = async (req: any, res: Response) => {
  try {
    const userId = new ObjectId(req.user.userId);

    const requests = await FriendRequestModel.find({
      senderId: userId,
      status: FriendRequestStatus.Pending,
    })
      .populate("receiverId", "username avatarUrl bio fullName")
      .sort({ createdAt: -1 });

    return res.status(200).json(requests);
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
