import { Request, Response } from "express";
import { TypingIndicatorModel } from "../models/typingIndicator";

export const getTypingIndicator = async (req: Request, res: Response) => {
  try {
    const { userId, chatWith } = req.query as { userId?: string; chatWith?: string };
    if (!userId || !chatWith) {
      return res
        .status(400)
        .json({ success: false, message: "userId and chatWith are required" });
    }

    const indicator = await TypingIndicatorModel.findOne({
      userId: userId,
      chatWith: chatWith,
    });
    res.json({ success: true, data: indicator });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};