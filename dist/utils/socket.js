"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIO = exports.initSocket = exports.onlineUsers = void 0;
const socket_io_1 = require("socket.io");
const conversation_1 = require("../models/conversation");
const message_1 = require("../models/message");
let io;
exports.onlineUsers = new Map();
const initSocket = (server) => {
    io = new socket_io_1.Server(server, {
        cors: { origin: "*", methods: ["GET", "POST"] },
    });
    io.on("connection", async (socket) => {
        const userId = socket.handshake.auth.userId;
        if (userId) {
            socket.join(userId);
            exports.onlineUsers.set(userId, socket.id);
            setTimeout(() => {
                const userIds = Array.from(exports.onlineUsers.keys()).filter((id) => id !== userId);
                socket.emit("onlineUsers", userIds);
            }, 300);
            socket.broadcast.emit("onlineUser", { userId });
            // ✅ when user connects mark all their pending messages as delivered
            try {
                const conversations = await conversation_1.ConversationModel.find({ members: userId });
                const convIds = conversations.map((c) => c._id);
                // find sent messages in these convs NOT sent by this user
                const pendingMsgs = await message_1.MessageModel.find({
                    conversationId: { $in: convIds },
                    senderId: { $ne: userId },
                    status: "sent",
                });
                if (pendingMsgs.length > 0) {
                    // group by senderId so we know who to notify
                    const senderMap = new Map();
                    pendingMsgs.forEach((m) => {
                        const sid = m.senderId.toString();
                        const cid = m.conversationId.toString();
                        if (!senderMap.has(sid))
                            senderMap.set(sid, new Set());
                        senderMap.get(sid).add(cid);
                    });
                    // update all to delivered
                    await message_1.MessageModel.updateMany({
                        conversationId: { $in: convIds },
                        senderId: { $ne: userId },
                        status: "sent",
                    }, { status: "delivered" });
                    // notify each sender
                    senderMap.forEach((convIds, senderId) => {
                        io.to(senderId).emit("messagesDelivered", {
                            conversationIds: Array.from(convIds),
                        });
                    });
                }
            }
            catch (e) {
                console.error("delivered on connect error:", e);
            }
        }
        // ✅ when receiver opens conversation mark as read
        socket.on("markRead", async ({ conversationId, senderId }) => {
            try {
                await message_1.MessageModel.updateMany({
                    conversationId,
                    senderId,
                    status: { $ne: "read" },
                }, { status: "read" });
                // notify sender their messages were read
                io.to(senderId).emit("messagesRead", { conversationId });
            }
            catch (e) {
                console.error("markRead error:", e);
            }
        });
        socket.on("typing", ({ conversationId, receiverId }) => {
            io.to(receiverId).emit("typing", { conversationId });
        });
        socket.on("stopTyping", ({ conversationId, receiverId }) => {
            io.to(receiverId).emit("stopTyping", { conversationId });
        });
        // ✅ call signaling — server just relays, never touches DB
        socket.on("callOffer", ({ to, offer, callType, callerName, callerAvatar, callId }) => {
            io.to(to).emit("callOffer", {
                from: userId,
                offer,
                callType,
                callerName,
                callerAvatar,
                callId,
            });
        });
        socket.on("callAnswer", ({ to, answer }) => {
            io.to(to).emit("callAnswer", { answer });
        });
        socket.on("iceCandidate", ({ to, candidate }) => {
            io.to(to).emit("iceCandidate", { candidate });
        });
        socket.on("callRejected", ({ to, callId }) => {
            io.to(to).emit("callRejected", { callId });
        });
        socket.on("callEnded", ({ to, callId }) => {
            io.to(to).emit("callEnded", { callId });
        });
        socket.on("callBusy", ({ to, callId }) => {
            io.to(to).emit("callBusy", { callId });
        });
        socket.on("callCancelled", ({ to, callId }) => {
            // ✅ caller cancelled before callee picked up
            io.to(to).emit("callCancelled", { callId });
        });
        socket.on("disconnect", () => {
            exports.onlineUsers.delete(userId);
            socket.broadcast.emit("offlineUser", { userId });
            // ✅ notify all active calls this user was in
            socket.broadcast.emit("userDisconnected", { userId });
        });
    });
};
exports.initSocket = initSocket;
const getIO = () => {
    if (!io)
        throw new Error("Socket not initialized");
    return io;
};
exports.getIO = getIO;
//# sourceMappingURL=socket.js.map