import express from "express";
import {
  sendMessage,
  getMessages,
  deleteMessage,
} from "../controllers/messageController";
import { getTypingIndicator } from "../controllers/typingController";
import { verify } from "../utils/jwt";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

// api/messages/sendMessage
router.post("/sendMessage", verifyToken, sendMessage);

// api/messages/getMessages
router.get("/getMessages/:conversationId", verifyToken, getMessages);

// api/messages/typing
router.get("/typing", verifyToken, getTypingIndicator);

// api/messages/deleteMessage
router.delete("/deleteMessage/:id", verifyToken, deleteMessage);

export default router;
