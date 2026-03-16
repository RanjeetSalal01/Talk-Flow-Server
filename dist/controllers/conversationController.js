"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConversations = exports.createConversation = void 0;
const conversation_1 = require("../models/conversation");
const mongodb_1 = require("mongodb");
const createConversation = async (req, res) => {
    try {
        const { members, type, groupName, groupAvatar } = req.body;
        // For private chat prevent duplicate conversation
        if (type === "private") {
            const existing = await conversation_1.ConversationModel.findOne({
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
        const conversation = await conversation_1.ConversationModel.create({
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
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.createConversation = createConversation;
const getConversations = async (req, res, next) => {
    try {
        const userId = new mongodb_1.ObjectId(req.user.userId);
        const conversations = await conversation_1.ConversationModel.aggregate([
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
    }
    catch (error) {
        next(error);
    }
};
exports.getConversations = getConversations;
//# sourceMappingURL=conversationController.js.map