"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.searchUser = exports.deleteUser = exports.updateUser = exports.getUser = exports.register = void 0;
<<<<<<< HEAD
const User_1 = require("../models/User");
=======
const user_1 = require("../models/user");
>>>>>>> 9699da23981e5a07e6f2cac1c38569c3dd1c87a9
const common_1 = require("../utils/common");
const mongodb_1 = require("mongodb");
const cloudinary_1 = require("../utils/cloudinary");
const register = async (req, res, next) => {
    try {
        const { password, ...rest } = req.body;
        const hashedPassword = await (0, common_1.hashPassword)(password);
<<<<<<< HEAD
        const user = await User_1.UserModel.create({
=======
        const user = await user_1.UserModel.create({
>>>>>>> 9699da23981e5a07e6f2cac1c38569c3dd1c87a9
            ...rest,
            password: hashedPassword,
        });
        return res.status(201).json({
            success: true,
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
<<<<<<< HEAD
        const user = await User_1.UserModel.findById(id);
=======
        const user = await user_1.UserModel.findById(id);
>>>>>>> 9699da23981e5a07e6f2cac1c38569c3dd1c87a9
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
    }
    catch (error) {
        next(error);
    }
};
exports.getUser = getUser;
const updateUser = async (req, res, next) => {
    try {
        const userId = new mongodb_1.ObjectId(req.user.userId);
        const { fullName, bio } = req.body;
        const update = {};
        if (fullName)
            update.fullName = fullName;
        if (bio !== undefined)
            update.bio = bio;
        // ✅ upload avatar to cloudinary if provided
        if (req.file) {
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary_1.cloudinaryUploader.upload_stream({
                    folder: "avatars",
                    transformation: [{ width: 400, height: 400, crop: "fill" }],
                }, (err, result) => (err ? reject(err) : resolve(result)));
                stream.end(req.file.buffer);
            });
            update.avatarUrl = result.secure_url;
        }
<<<<<<< HEAD
        const user = await User_1.UserModel.findByIdAndUpdate(userId, update, {
=======
        const user = await user_1.UserModel.findByIdAndUpdate(userId, update, {
>>>>>>> 9699da23981e5a07e6f2cac1c38569c3dd1c87a9
            new: true,
        }).select("-password");
        return res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
<<<<<<< HEAD
        const user = await User_1.UserModel.findByIdAndDelete(id);
=======
        const user = await user_1.UserModel.findByIdAndDelete(id);
>>>>>>> 9699da23981e5a07e6f2cac1c38569c3dd1c87a9
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
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUser = deleteUser;
const searchUser = async (req, res, next) => {
    try {
        const { query } = req.query;
        const currentUserId = new mongodb_1.ObjectId(req.user?.userId);
<<<<<<< HEAD
        const users = await User_1.UserModel.aggregate([
=======
        const users = await user_1.UserModel.aggregate([
>>>>>>> 9699da23981e5a07e6f2cac1c38569c3dd1c87a9
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
    }
    catch (error) {
        next(error);
    }
};
exports.searchUser = searchUser;
const changePassword = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { currentPassword, newPassword } = req.body;
        // ✅ get user with password field
<<<<<<< HEAD
        const user = await User_1.UserModel.findById(userId).select('+password');
=======
        const user = await user_1.UserModel.findById(userId).select('+password');
>>>>>>> 9699da23981e5a07e6f2cac1c38569c3dd1c87a9
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        // ✅ verify current password
        const isMatch = await (0, common_1.comparePassword)(currentPassword, user.password);
        if (!isMatch)
            return res.status(400).json({ message: 'Current password is incorrect' });
        // ✅ hash and save new password
        const hashed = await (0, common_1.hashPassword)(newPassword);
<<<<<<< HEAD
        await User_1.UserModel.findByIdAndUpdate(userId, { password: hashed });
=======
        await user_1.UserModel.findByIdAndUpdate(userId, { password: hashed });
>>>>>>> 9699da23981e5a07e6f2cac1c38569c3dd1c87a9
        return res.status(200).json({ success: true });
    }
    catch (error) {
        next(error);
    }
};
exports.changePassword = changePassword;
//# sourceMappingURL=userController.js.map