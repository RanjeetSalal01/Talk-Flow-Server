import { NextFunction, Request, Response } from "express";
import { ConversationModel } from "../models/conversation";
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

export const getConversations = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = new ObjectId(req.body.user.userId);

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
            { $project: { username: 1, avatarUrl: 1, isOnline: 1, fullName: 1 } },
          ],
          as: "receiver",
        },
      },
      { $unwind: "$receiver" },
      {
        $project: {
          username: "$receiver.username",
          fullName: "$receiver.fullName",
          avatarUrl: "$receiver.avatarUrl",
          isOnline: "$receiver.isOnline",
          receiverId: "$receiver._id",
          lastMessage: 1,
          lastMessageAt: 1,
          unreadCount: { $literal: 0 }, // implement with a separate unread count model if needed
        },
      },
      { $sort: { lastMessageAt: -1 } },
    ]);

    return res.status(200).json(conversations);
  } catch (error) {
    next(error);
  }
};
