"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const mainRoutes = (0, express_1.default)();
// api/user
mainRoutes.use("/user", routes_1.userRoutes);
// api/messages
mainRoutes.use("/messages", routes_1.messageRoutes);
// api/friend-requests
mainRoutes.use("/friend-request", routes_1.friendRequestRoutes);
// api/calls
mainRoutes.use("/calls", routes_1.callRoutes);
// api/auth
mainRoutes.use("/auth", routes_1.authRoutes);
// api/conversations
mainRoutes.use("/conversations", routes_1.conversationRoutes);
exports.default = mainRoutes;
//# sourceMappingURL=mainRoutes.js.map