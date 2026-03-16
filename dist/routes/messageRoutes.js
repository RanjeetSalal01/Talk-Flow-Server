"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageController_1 = require("../controllers/messageController");
const auth_1 = require("../middleware/auth");
const upload_1 = require("../middleware/upload");
const router = express_1.default.Router();
// api/messages/sendMessage
router.post("/sendMessage", auth_1.verifyToken, messageController_1.sendMessage);
// api/messages/getMessages
router.get("/getMessages/:conversationId", auth_1.verifyToken, messageController_1.getMessages);
// api/messages/getUnreadCount
router.get("/getUnreadCount", auth_1.verifyToken, messageController_1.getUnreadCount);
// api/messages/deleteMessage
router.delete("/deleteMessage/:id", auth_1.verifyToken, messageController_1.deleteMessage);
// api/messages/uploadFile
router.post('/uploadFile', auth_1.verifyToken, upload_1.upload.single('file'), messageController_1.uploadFile);
exports.default = router;
//# sourceMappingURL=messageRoutes.js.map