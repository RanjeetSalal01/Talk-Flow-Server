import { NextFunction, Request, Response } from "express";
import { ConversationModel } from "../models/Conversation";
import { ObjectId } from "mongodb";

export const createConversation = async (req: Request, res: Response) => {
  try {
    const { members, type, groupName, groupAvatar } = req.body;

    // For private chat prevent duplicate conversation
    if (type === "private") {
      const existing = await ConversationModel.findOne({
        type: "private",
        members: { $all: members, $size: 2 },
      });

      if (existing) {
        return res.status(200).json({
          success: true,
          data: existing,
        });
      }
    }

    const conversation = await ConversationModel.create({
      type,
      members,
      admins: [],
      groupName,
      groupAvatar,
      lastMessage: "",
      lastMessageAt: null,
    });

    return res.status(201).json({
      success: true,
      data: conversation,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getConversations = async (req: any, res: Response, next: NextFunction) => {
  try {
    const userId = new ObjectId(req.user.userId);

    const conversations = await ConversationModel.aggregate([
      { $match: { members: userId } },
      {
        $lookup: {
          from: "users",
          let: { members: "$members" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $in: ["$_id", "$$members"] },
                    { $ne: ["$_id", userId] },
                  ],
                },
              },
            },
            {
              $project: { username: 1, avatarUrl: 1, isOnline: 1, fullName: 1 },
            },
          ],
          as: "receiver",
        },
      },
      { $unwind: "$receiver" },

      // ✅ lookup unread messages count
      {
        $lookup: {
          from: "messages",
          let: { convId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$conversationId", "$$convId"] },
                    { $ne: ["$senderId", userId] }, // not sent by me
                    { $ne: ["$status", "read"] }, // not read
                    { $ne: ["$isDeleted", true] }, // not deleted
                  ],
                },
              },
            },
            { $count: "count" },
          ],
          as: "unreadMessages",
        },
      },

      {
        $project: {
          username: "$receiver.username",
          fullName: "$receiver.fullName",
          avatarUrl: "$receiver.avatarUrl",
          isOnline: "$receiver.isOnline",
          receiverId: "$receiver._id",
          lastMessage: 1,
          lastMessageAt: 1,
          // ✅ extract count from array, default 0
          unreadCount: {
            $ifNull: [{ $arrayElemAt: ["$unreadMessages.count", 0] }, 0],
          },
        },
      },
      { $sort: { lastMessageAt: -1 } },
    ]);

    return res.status(200).json(conversations);
  } catch (error) {
    next(error);
  }
};
