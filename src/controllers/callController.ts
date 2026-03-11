import { Request, Response } from "express";
import { CallModel } from "../models/call";
import { getIO } from "../utils/socket";

export const initiateCall = async (req: Request, res: Response) => {
  try {
    const { callerId, receiverId, callType } = req.body;
    const call = await CallModel.create({
      id: `${callerId}_${receiverId}_${Date.now()}`,
      callerId,
      receiverId,
      callType,
      status: "ringing",
    });

    // notify receiver via socket
    try {
      const io = getIO();
      io.to(receiverId).emit("incomingCall", call);
    } catch (e) {
      console.warn("Socket not ready when initiating call", e);
    }

    res.status(201).json({ success: true, data: call });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const endCall = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const call = await CallModel.findByIdAndUpdate(
      id,
      {
        status: "ended",
        ended_at: new Date(),
      },
      { new: true }
    );

    // notify both parties that the call has ended
    try {
      const io = getIO();
      if (call) {
        io.to((call as any).callerId.toString()).emit("callEnded", call);
        io.to((call as any).receiverId.toString()).emit("callEnded", call);
      }
    } catch (e) {
      console.warn("Socket not ready when ending call", e);
    }

    res.json({ success: true, data: call });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const acceptCall = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const call = await CallModel.findByIdAndUpdate(
      id,
      {
        status: "accepted",
        started_at: new Date(),
      },
      { new: true }
    );

    // notify caller
    try {
      const io = getIO();
      if (call) {
        io.to((call as any).callerId.toString()).emit("callAccepted", call);
      }
    } catch (e) {
      console.warn("Socket not ready when accepting call", e);
    }

    res.json({ success: true, data: call });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
