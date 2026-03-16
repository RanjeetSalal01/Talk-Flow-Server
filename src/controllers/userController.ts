import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/User";
import { comparePassword, hashPassword } from "../utils/common";
import { ObjectId } from "mongodb";
import { cloudinaryUploader } from "../utils/cloudinary";
import { compare } from "bcrypt";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, ...rest } = req.body;

    const hashedPassword = await hashPassword(password);

    const user = await UserModel.create({
      ...rest,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = new ObjectId(req.user.userId);
    const { fullName, bio } = req.body;
    const update: any = {};

    if (fullName) update.fullName = fullName;
    if (bio !== undefined) update.bio = bio;

    // ✅ upload avatar to cloudinary if provided
    if (req.file) {
      const result = await new Promise<any>((resolve, reject) => {
        const stream = cloudinaryUploader.upload_stream(
          {
            folder: "avatars",
            transformation: [{ width: 400, height: 400, crop: "fill" }],
          },
          (err, result) => (err ? reject(err) : resolve(result)),
        );
        stream.end(req.file!.buffer);
      });
      update.avatarUrl = result.secure_url;
    }
    
    const user = await UserModel.findByIdAndUpdate(userId, update, {
      new: true,
    }).select("-password");

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const searchUser = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { query } = req.query;
    const currentUserId = new ObjectId(req.user?.userId);

    const users = await UserModel.aggregate([
      {
        $match: {
          _id: { $ne: currentUserId },
          $or: [
            { username: { $regex: query, $options: "i" } },
            { bio: { $regex: query, $options: "i" } },
          ],
        },
      },
      {
        $lookup: {
          from: "friendrequests",
          let: { userId: "$_id" }, // $$userId = current user's _id
          pipeline: [
            {
              $match: {
                $expr: {
                  $or: [
                    // currentUser sent request to this user
                    {
                      $and: [
                        { $eq: ["$senderId", currentUserId] },
                        { $eq: ["$receiverId", "$$userId"] },
                      ],
                    },
                    // this user sent request to currentUser
                    {
                      $and: [
                        { $eq: ["$senderId", "$$userId"] },
                        { $eq: ["$receiverId", currentUserId] },
                      ],
                    },
                  ],
                },
              },
            },
            { $project: { status: 1, _id: 0 } },
          ],
          as: "request",
        },
      },
      { $unwind: { path: "$request", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          username: 1,
          bio: 1,
          avatarUrl: 1,
          status: {
            $switch: {
              branches: [
                {
                  case: { $eq: ["$request.status", "accepted"] },
                  then: "friends",
                },
                {
                  case: { $eq: ["$request.status", "pending"] },
                  then: "pending",
                },
              ],
              default: "none",
            },
          },
        },
      },
    ]);

    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user.userId;
    const { currentPassword, newPassword } = req.body;

    // ✅ get user with password field
    const user = await UserModel.findById(userId).select('+password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    // ✅ verify current password
    const isMatch = await comparePassword(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' });

    // ✅ hash and save new password
    const hashed = await hashPassword(newPassword);
    await UserModel.findByIdAndUpdate(userId, { password: hashed });

    return res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};