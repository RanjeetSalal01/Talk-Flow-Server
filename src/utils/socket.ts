import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";

let io: Server;

const onlineUsers = new Map<string, string>(); // userId -> socketId

export const initSocket = (server: HttpServer): void => {
  io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  io.on("connection", (socket: Socket) => {
    const userId = socket.handshake.auth.userId; // ✅ no join event needed

    if (userId) {
      socket.join(userId);
      onlineUsers.set(userId, socket.id);

      // ✅ delay so client registers listener first
      setTimeout(() => {
        const userIds = Array.from(onlineUsers.keys()).filter(
          (id) => id !== userId,
        );
        socket.emit("onlineUsers", userIds);
      }, 300);

      socket.broadcast.emit("onlineUser", { userId }); // Notify others about the new online user
    }

    socket.on("typing", ({ conversationId, receiverId }) => {
      io.to(receiverId).emit("typing", { conversationId });
    });

    socket.on("stopTyping", ({ conversationId, receiverId }) => {
      io.to(receiverId).emit("stopTyping", { conversationId });
    });

    socket.on("disconnect", () => {
      onlineUsers.delete(userId);
      socket.broadcast.emit("offlineUser", { userId }); // Notify others about the user going offline
      console.log(`User ${userId} disconnected`);
    });
  });
};

export const getIO = (): Server => {
  if (!io) throw new Error("Socket not initialized");
  return io;
};
