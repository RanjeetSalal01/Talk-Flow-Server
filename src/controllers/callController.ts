import { Request, Response, NextFunction } from "express";
import { CallModel, CallStatus } from "../models/call";
import { ObjectId } from "mongodb";

export const initiateCall = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const callerId = new ObjectId(req.user.userId);
    const { receiverId, callType } = req.body;
    const call = await CallModel.create({
      callerId,
      receiverId: new ObjectId(receiverId),
      callType,
      status: CallStatus.Ringing,
    });
    return res.status(201).json({ callId: call._id });
  } catch (error) {
    next(error);
  }
};

export const updateCallStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { callId, status } = req.body;
    const now = new Date();
    const update: any = { status };

    if (status === CallStatus.Active) {
      update.startedAt = now; // ✅ server sets startedAt
    }

    if (status === CallStatus.Ended) {
      update.endedAt = now; // ✅ server sets endedAt
      const call = await CallModel.findById(callId).select("startedAt");
      if (call?.startedAt) {
        // ✅ server calculates duration
        update.duration = Math.floor(
          (now.getTime() - new Date(call.startedAt).getTime()) / 1000,
        );
      }
    }

    // missed, rejected, busy → only update status, no times
    await CallModel.findByIdAndUpdate(callId, update, { new: true });
    return res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const getCallHistory = async (req: any, res: Response, next: NextFunction) => {
  try {
    const userId = new ObjectId(req.user.userId);
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 15;
    const skip = (page - 1) * limit;

    const total = await CallModel.countDocuments({
      $or: [{ callerId: userId }, { receiverId: userId }]
    });

    const calls = await CallModel.find({
      $or: [{ callerId: userId }, { receiverId: userId }],
    })
      .populate("callerId", "fullName avatarUrl username")
      .populate("receiverId", "fullName avatarUrl username")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      data: calls,
      hasMore: skip + limit < total, // ✅ same pattern as getMessages
      page,
      total,
    });
  } catch (error) {
    next(error);
  }
};
