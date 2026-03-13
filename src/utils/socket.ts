import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { ConversationModel } from "../models/conversation";
import { MessageModel } from "../models/message";

let io: Server;

export const onlineUsers = new Map<string, string>();

export const initSocket = (server: HttpServer): void => {
  io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  io.on("connection", async (socket: Socket) => {
    const userId = socket.handshake.auth.userId;

    if (userId) {
      socket.join(userId);
      onlineUsers.set(userId, socket.id);

      setTimeout(() => {
        const userIds = Array.from(onlineUsers.keys()).filter(
          (id) => id !== userId,
        );
        socket.emit("onlineUsers", userIds);
      }, 300);

      socket.broadcast.emit("onlineUser", { userId });

      // ✅ when user connects mark all their pending messages as delivered
      try {
        const conversations = await ConversationModel.find({ members: userId });
        const convIds = conversations.map((c: any) => c._id);

        // find sent messages in these convs NOT sent by this user
        const pendingMsgs = await MessageModel.find({
          conversationId: { $in: convIds },
          senderId: { $ne: userId },
          status: "sent",
        });

        if (pendingMsgs.length > 0) {
          // group by senderId so we know who to notify
          const senderMap = new Map<string, Set<string>>();
          pendingMsgs.forEach((m: any) => {
            const sid = m.senderId.toString();
            const cid = m.conversationId.toString();
            if (!senderMap.has(sid)) senderMap.set(sid, new Set());
            senderMap.get(sid)!.add(cid);
          });

          // update all to delivered
          await MessageModel.updateMany(
            {
              conversationId: { $in: convIds },
              senderId: { $ne: userId },
              status: "sent",
            },
            { status: "delivered" },
          );

          // notify each sender
          senderMap.forEach((convIds, senderId) => {
            io.to(senderId).emit("messagesDelivered", {
              conversationIds: Array.from(convIds),
            });
          });
        }
      } catch (e) {
        console.error("delivered on connect error:", e);
      }
    }

    // ✅ when receiver opens conversation mark as read
    socket.on("markRead", async ({ conversationId, senderId }) => {
      try {
        await MessageModel.updateMany(
          {
            conversationId,
            senderId,
            status: { $ne: "read" },
          },
          { status: "read" },
        );

        // notify sender their messages were read
        io.to(senderId).emit("messagesRead", { conversationId });
      } catch (e) {
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
    socket.on(
      "callOffer",
      ({ to, offer, callType, callerName, callerAvatar, callId }) => {
        io.to(to).emit("callOffer", {
          from: userId,
          offer,
          callType,
          callerName,
          callerAvatar,
          callId,
        });
      },
    );

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
      onlineUsers.delete(userId);
      socket.broadcast.emit("offlineUser", { userId });
      // ✅ notify all active calls this user was in
      socket.broadcast.emit("userDisconnected", { userId });
    });
  });
};

export const getIO = (): Server => {
  if (!io) throw new Error("Socket not initialized");
  return io;
};
