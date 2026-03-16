import express from "express";

import { userRoutes, messageRoutes, callRoutes, friendRequestRoutes, authRoutes, conversationRoutes } from "./routes";

const mainRoutes = express();

// api/user
mainRoutes.use("/user", userRoutes);

// api/messages
mainRoutes.use("/messages", messageRoutes);

// api/friend-requests
mainRoutes.use("/friend-request", friendRequestRoutes);

// api/calls
mainRoutes.use("/calls", callRoutes);

// api/auth
mainRoutes.use("/auth", authRoutes);

// api/conversations
mainRoutes.use("/conversations", conversationRoutes);

export default mainRoutes;
