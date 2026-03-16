import express from "express";
import { verifyToken } from "../middleware/auth";
import {
  getCallHistory,
  initiateCall,
  updateCallStatus,
} from "../controllers/callController";

const router = express.Router();

// api/calls/initiate
router.post("/initiate", verifyToken, initiateCall);

// api/calls/status
router.patch("/status", verifyToken, updateCallStatus);

// api/calls/history
router.get("/history", verifyToken, getCallHistory);

export default router;
