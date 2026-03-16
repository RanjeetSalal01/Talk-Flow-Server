"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnreadCount = exports.uploadFile = exports.deleteMessage = exports.getMessages = exports.sendMessage = void 0;
const mongodb_1 = require("mongodb");
const conversation_1 = require("../models/conversation");
const message_1 = require("../models/message");
const socket_1 = require("../utils/socket");
const cloudinary_1 = require("../utils/cloudinary");
const friendRequest_1 = require("../models/friendRequest");
const sendMessage = async (req, res, next) => {
    try {
        const { conversationId, receiverId, content, type, mediaUrl } = req.body;
        const senderId = new mongodb_1.ObjectId(req.user.userId);
        const receiverOId = new mongodb_1.ObjectId(receiverId);
        // find or create conversation
        let convId = conversationId;
        if (!convId) {
            let conv = await conversation_1.ConversationModel.findOne({
                type: "private",
                members: { $all: [senderId, receiverOId] },
            });
            if (!conv) {
                conv = await conversation_1.ConversationModel.create({
                    type: "private",
                    members: [senderId, receiverOId],
                    lastMessage: "",
                    lastMessageAt: new Date(),
                });
            }
            convId = conv._id;
        }
        // ✅ check if receiver is online → set delivered, else sent
        const isReceiverOnline = socket_1.onlineUsers.has(receiverId.toString());
        const status = isReceiverOnline ? "delivered" : "sent";
        const message = await message_1.MessageModel.create({
            conversationId: convId,
            senderId,
            content,
            type: type || "text", // ✅ store type
            status,
            mediaUrl: mediaUrl || null,
        });
        console.log(convId, type);
        await conversation_1.ConversationModel.findByIdAndUpdate(convId, {
            lastMessage: type === "text"
                ? content
                : type === "image"
                    ? "📷 Image"
                    : type === "video"
                        ? "🎥 Video"
                        : "📎 File",
            lastMessageAt: new Date(),
        });
        console.log("Rooms:", (0, socket_1.getIO)().sockets.adapter.rooms); // all active rooms
        try {
            (0, socket_1.getIO)()
                .to(receiverId.toString())
                .emit("newMessage", {
                _id: message._id.toString(),
                conversationId: convId.toString(),
                senderId: senderId.toString(), // ✅ string
                content,
                type: type || "text",
                mediaUrl: mediaUrl || null,
                status: "sent",
                createdAt: message.createdAt,
            });
        }
        catch (e) {
            console.warn("Socket not ready", e);
        }
        return res.status(201).json({ message, conversationId: convId });
    }
    catch (error) {
        next(error);
    }
};
exports.sendMessage = sendMessage;
const getMessages = async (req, res, next) => {
    try {
        const { conversationId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;
        const total = await message_1.MessageModel.countDocuments({
            conversationId,
            isDeleted: false,
        });
        const messages = await message_1.MessageModel.find({
            conversationId,
            isDeleted: false,
        })
            .sort({ createdAt: -1 }) // newest first
            .skip(skip)
            .limit(limit)
            .select("_id senderId conversationId content mediaUrl type status createdAt");
        return res.status(200).json({
            messages: messages.reverse(), // back to oldest first for display
            hasMore: skip + limit < total,
            page,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getMessages = getMessages;
const deleteMessage = async (req, res, next) => {
    try {
        const { id } = req.params;
        await message_1.MessageModel.findByIdAndUpdate(id, { isDeleted: true });
        return res.status(200).json({ success: true });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteMessage = deleteMessage;
const uploadFile = async (req, res) => {
    try {
        if (!req.file)
            return res
                .status(400)
                .json({ success: false, message: "No file provided" });
        const result = await new Promise((resolve, reject) => {
            cloudinary_1.cloudinaryUploader
                .upload_stream({ resource_type: "auto", folder: "talkflow" }, (error, result) => error ? reject(error) : resolve(result))
                .end(req.file.buffer);
        });
        return res.json({
            success: true,
            url: result.secure_url,
            type: getFileType(req.file.mimetype),
        });
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
exports.uploadFile = uploadFile;
const getFileType = (mimetype) => {
    if (mimetype.startsWith("image/"))
        return "image";
    if (mimetype.startsWith("video/"))
        return "video";
    return "file";
};
// messageController.ts
const getUnreadCount = async (req, res, next) => {
    try {
        const userId = new mongodb_1.ObjectId(req.user.userId);
        const conversations = await conversation_1.ConversationModel.find({ members: userId });
        const convIds = conversations.map((c) => c._id);
        const chatCount = await message_1.MessageModel.countDocuments({
            conversationId: { $in: convIds },
            senderId: { $ne: userId },
            status: { $ne: "read" },
            isDeleted: { $ne: true },
        });
        const reqCount = await friendRequest_1.FriendRequestModel.countDocuments({
            receiverId: userId,
            status: friendRequest_1.FriendRequestStatus.Pending,
        });
        return res.status(200).json({ chatCount, reqCount });
    }
    catch (error) {
        next(error);
    }
};
exports.getUnreadCount = getUnreadCount;
//# sourceMappingURL=messageController.js.map