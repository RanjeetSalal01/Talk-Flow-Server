"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = exports.callRoutes = exports.friendRequestRoutes = exports.conversationRoutes = exports.messageRoutes = exports.userRoutes = void 0;
const userRoutes_1 = __importDefault(require("./userRoutes"));
exports.userRoutes = userRoutes_1.default;
const messageRoutes_1 = __importDefault(require("./messageRoutes"));
exports.messageRoutes = messageRoutes_1.default;
const friendRequestRoutes_1 = __importDefault(require("./friendRequestRoutes"));
exports.friendRequestRoutes = friendRequestRoutes_1.default;
const callRoutes_1 = __importDefault(require("./callRoutes"));
exports.callRoutes = callRoutes_1.default;
const conversationRoutes_1 = __importDefault(require("./conversationRoutes"));
exports.conversationRoutes = conversationRoutes_1.default;
const authRoutes_1 = __importDefault(require("./authRoutes"));
exports.authRoutes = authRoutes_1.default;
//# sourceMappingURL=index.js.map