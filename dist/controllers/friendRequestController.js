"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOutgoingRequests = exports.getIncomingRequests = exports.getFriends = exports.rejectFriendRequest = exports.acceptFriendRequest = exports.sendFriendRequest = void 0;
const FriendRequest_1 = require("../models/FriendRequest");
const socket_1 = require("../utils/socket");
const mongodb_1 = require("mongodb");
const FriendShip_1 = require("../models/FriendShip");
const sendFriendRequest = async (req, res) => {
    try {
        const { receiverId } = req.body;
        let friendRequest = await FriendRequest_1.FriendRequestModel.create({
            senderId: req.user.userId,
            receiverId,
            status: FriendRequest_1.FriendRequestStatus.Pending,
        });
        let friendRequestDetails = await FriendRequest_1.FriendRequestModel.findById(friendRequest._id).populate("senderId", "username avatarUrl bio fullName");
        // notify receiver via socket
        try {
            const io = (0, socket_1.getIO)();
            io.to(receiverId).emit("friendRequest", friendRequestDetails);
        }
        catch (e) {
            console.warn("Socket not ready when sending friend request", e);
        }
        return res.status(201).json({ success: true, data: friendRequest });
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
exports.sendFriendRequest = sendFriendRequest;
const acceptFriendRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const friendRequest = await FriendRequest_1.FriendRequestModel.findByIdAndUpdate(id, { status: "accepted" }, { new: true }).populate("receiverId", "username avatarUrl bio fullName");
        // create friendship
        if (friendRequest) {
            await FriendShip_1.FriendShipModel.create({
                participants: [friendRequest.senderId, friendRequest.receiverId],
                status: "accepted",
            });
        }
        // inform sender about acceptance
        try {
            const io = (0, socket_1.getIO)();
            if (friendRequest) {
                io.to(friendRequest.senderId.toString()).emit("friendRequestAccepted", friendRequest);
            }
        }
        catch (e) {
            console.warn("Socket not ready when accepting friend request", e);
        }
        return res.status(200).json({ success: true, data: friendRequest });
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
exports.acceptFriendRequest = acceptFriendRequest;
const rejectFriendRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const fr = await FriendRequest_1.FriendRequestModel.findByIdAndDelete(id).populate("receiverId", "username avatarUrl bio fullName");
        // inform sender about rejection
        try {
            const io = (0, socket_1.getIO)();
            if (fr) {
                io.to(fr.senderId.toString()).emit("friendRequestRejected", fr);
            }
        }
        catch (e) {
            console.warn("Socket not ready when rejecting friend request", e);
        }
        return res.status(200).json({ success: true, message: "Request rejected" });
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
exports.rejectFriendRequest = rejectFriendRequest;
const getFriends = async (req, res) => {
    try {
        const me = new mongodb_1.ObjectId(req.user.userId);
        const friends = await FriendShip_1.FriendShipModel.aggregate([
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
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
exports.getFriends = getFriends;
// GET /friend-requests/incoming — requests sent TO me
const getIncomingRequests = async (req, res) => {
    try {
        const userId = new mongodb_1.ObjectId(req.user.userId);
        const requests = await FriendRequest_1.FriendRequestModel.find({
            receiverId: userId,
            status: FriendRequest_1.FriendRequestStatus.Pending,
        })
            .populate("senderId", "username avatarUrl bio fullName")
            .sort({ createdAt: -1 });
        return res.status(200).json(requests);
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
exports.getIncomingRequests = getIncomingRequests;
// GET /friend-requests/outgoing — requests sent BY me
const getOutgoingRequests = async (req, res) => {
    try {
        const userId = new mongodb_1.ObjectId(req.user.userId);
        const requests = await FriendRequest_1.FriendRequestModel.find({
            senderId: userId,
            status: FriendRequest_1.FriendRequestStatus.Pending,
        })
            .populate("receiverId", "username avatarUrl bio fullName")
            .sort({ createdAt: -1 });
        return res.status(200).json(requests);
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
exports.getOutgoingRequests = getOutgoingRequests;
//# sourceMappingURL=friendRequestController.js.map