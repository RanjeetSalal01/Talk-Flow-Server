import { Request, Response, NextFunction } from "express";
import { CallModel, CallStatus } from "../models/Call";
import { ObjectId } from "mongodb";

// POST /calls/initiate
// Called by caller when they press the call button.
// Just creates the record in DB with status = ringing.
export const initiateCall = async (req: any, res: Response, next: NextFunction) => {
  try {
    const call = await CallModel.create({
      callerId:   new ObjectId(req.user.userId),
      receiverId: new ObjectId(req.body.receiverId),
      callType:   req.body.callType,
      status:     CallStatus.Ringing,
    });
    return res.status(201).json({ callId: call._id });
  } catch (error) {
    next(error);
  }
};

// POST /calls/status
// Called whenever call state changes: active, ended, rejected, missed, busy.
// Server sets all timestamps and calculates duration — never trust the client for this.
export const updateCallStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { callId, status } = req.body;
    const now    = new Date();
    const update: any = { status };

    if (status === CallStatus.Active) {
      update.startedAt = now;
    }

    if (status === CallStatus.Ended) {
      update.endedAt = now;
      const call = await CallModel.findById(callId).select("startedAt");
      if (call?.startedAt) {
        update.duration = Math.floor(
          (now.getTime() - new Date(call.startedAt).getTime()) / 1000
        );
      }
    }

    // For rejected / missed / busy → only status is updated, no times needed
    await CallModel.findByIdAndUpdate(callId, update);
    return res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

// GET /calls/history
// Returns paginated call history for the logged-in user.
export const getCallHistory = async (req: any, res: Response, next: NextFunction) => {
  try {
    const userId = new ObjectId(req.user.userId);
    const page   = parseInt(req.query.page  as string) || 1;
    const limit  = parseInt(req.query.limit as string) || 15;
    const skip   = (page - 1) * limit;
    const filter = { $or: [{ callerId: userId }, { receiverId: userId }] };

    const [total, calls] = await Promise.all([
      CallModel.countDocuments(filter),
      CallModel.find(filter)
        .populate("callerId",   "fullName avatarUrl username")
        .populate("receiverId", "fullName avatarUrl username")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
    ]);

    return res.status(200).json({ data: calls, hasMore: skip + limit < total, page, total });
  } catch (error) {
    next(error);
  }
};