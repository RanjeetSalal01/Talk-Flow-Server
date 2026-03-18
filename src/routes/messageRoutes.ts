import express from "express";
import {
  deleteMessage,
  getMessages,
  getUnreadCount,
  sendMessage,
  uploadFile,
} from "../controllers/messageController";
import { verifyToken } from "../middleware/auth";
import { upload } from "../middleware/upload";

const router = express.Router();

// api/messages/sendMessage
router.post("/sendMessage", verifyToken, sendMessage);

// api/messages/getMessages
router.get("/getMessages/:conversationId", verifyToken, getMessages);

// api/messages/getUnreadCount
router.get("/getUnreadCount", verifyToken, getUnreadCount);

// api/messages/deleteMessage
router.delete("/deleteMessage/:id", verifyToken, deleteMessage);

// api/messages/uploadFile
router.post('/uploadFile', verifyToken, upload.single('file'), uploadFile);

export default router;
