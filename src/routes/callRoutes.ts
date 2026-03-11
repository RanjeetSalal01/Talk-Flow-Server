import express from "express";
import {
  initiateCall,
  endCall,
  acceptCall,
} from "../controllers/callController";

const router = express.Router();

router.post("/initiate", initiateCall);
router.put("/:id/accept", acceptCall);
router.put("/:id/end", endCall);

export default router;
