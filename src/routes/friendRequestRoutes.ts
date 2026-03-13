import express from "express";
import {
  acceptFriendRequest,
  getFriends,
  getIncomingRequests,
  getOutgoingRequests,
  rejectFriendRequest,
  sendFriendRequest,
} from "../controllers/friendRequestController";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

// api/friend-request/sendFriendRequest
router.post("/sendFriendRequest", verifyToken, sendFriendRequest);

// api/friend-request/acceptFriendRequest
router.patch("/acceptFriendRequest/:id", verifyToken, acceptFriendRequest);

// api/friend-request/rejectFriendRequest
router.delete("/rejectFriendRequest/:id", verifyToken, rejectFriendRequest);

// api/friend-request/getFriends
router.get("/getFriends", verifyToken, getFriends);

// api/friend-request/getIncomingRequests
router.get("/getIncomingRequests", verifyToken, getIncomingRequests);

// api/friend-request/getOutgoingRequests
router.get("/getOutgoingRequests", verifyToken, getOutgoingRequests);

export default router;
