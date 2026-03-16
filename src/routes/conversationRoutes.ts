import express from "express";
import {
  createConversation,
  getConversations,
} from "../controllers/conversationController";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

// api/conversations/createConversation
router.post("createConversation", createConversation);

// api/conversations/getConversations
router.get("/getConversations", verifyToken, getConversations);

export default router;
