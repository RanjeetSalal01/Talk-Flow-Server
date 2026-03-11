import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/user";
import { hashPassword } from "../utils/common";
import { ObjectId } from "mongodb";

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
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

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
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { query } = req.query;
    const currentUserId = new ObjectId(req.body.user?.userId);

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
