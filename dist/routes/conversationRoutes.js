"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conversationController_1 = require("../controllers/conversationController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// api/conversations/createConversation
router.post("createConversation", conversationController_1.createConversation);
// api/conversations/getConversations
router.get("/getConversations", auth_1.verifyToken, conversationController_1.getConversations);
exports.default = router;
//# sourceMappingURL=conversationRoutes.js.map