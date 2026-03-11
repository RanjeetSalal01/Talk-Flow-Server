import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
import { MessageModel } from "../models/message";
import { ConversationModel } from "../models/conversation";
import { getIO } from "../utils/socket";
import { send } from "process";

export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { conversationId, receiverId, content } = req.body;
    const senderId = new ObjectId(req.body.user.userId);
    const receiverOId = new ObjectId(receiverId);

    // find or create conversation
    let convId = conversationId;
    if (!convId) {
      let conv = await ConversationModel.findOne({
        type: "private",
        members: { $all: [senderId, receiverOId] },
      });

      if (!conv) {
        conv = await ConversationModel.create({
          type: "private",
          members: [senderId, receiverOId],
          lastMessage: "",
          lastMessageAt: new Date(),
        });
      }

      convId = conv._id;
    }

    const message = await MessageModel.create({
      conversationId: convId,
      senderId,
      content,
    });

    await ConversationModel.findByIdAndUpdate(convId, {
      lastMessage: content,
      lastMessageAt: new Date(),
    });
    console.log(
      "Emitting newMessage to",
      receiverId,
      "from sender",
      senderId.toString(),
    );
    console.log("Rooms:", getIO().sockets.adapter.rooms); // all active rooms
    try {
      getIO().to(receiverId.toString()).emit("newMessage", {
        _id: message._id.toString(),
        conversationId: convId.toString(),
        senderId: senderId.toString(), // ✅ string
        content,
        status: "sent",
        createdAt: message.createdAt,
      });
    } catch (e) {
      console.warn("Socket not ready", e);
    }

    return res.status(201).json({ message, conversationId: convId });
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { conversationId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const total = await MessageModel.countDocuments({
      conversationId,
      isDeleted: false,
    });

    const messages = await MessageModel.find({
      conversationId,
      isDeleted: false,
    })
      .sort({ createdAt: -1 }) // newest first
      .skip(skip)
      .limit(limit)
      .select("_id senderId conversationId content status createdAt");

    return res.status(200).json({
      messages: messages.reverse(), // back to oldest first for display
      hasMore: skip + limit < total,
      page,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    await MessageModel.findByIdAndUpdate(id, { isDeleted: true });
    return res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};
