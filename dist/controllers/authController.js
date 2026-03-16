"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.logout = exports.login = void 0;
<<<<<<< HEAD
const User_1 = require("../models/User");
=======
const user_1 = require("../models/user");
>>>>>>> 9699da23981e5a07e6f2cac1c38569c3dd1c87a9
const common_1 = require("../utils/common");
const jwt_1 = require("../utils/jwt");
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
<<<<<<< HEAD
        const user = await User_1.UserModel.findOne({ email });
=======
        const user = await user_1.UserModel.findOne({ email });
>>>>>>> 9699da23981e5a07e6f2cac1c38569c3dd1c87a9
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        const isMatch = await (0, common_1.comparePassword)(password, user.password);
        console.log("Password match:", isMatch);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        const token = (0, jwt_1.generateToken)({ userId: user._id });
        // 🍪 Send token in cookie
        res.cookie("token", token, {
            httpOnly: true, // JS cannot access
            secure: true, // HTTPS only in prod
            sameSite: "none", // CSRF protection
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });
        return res.status(200).json({
            success: true,
            message: "Login successful",
            userId: user._id,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
const logout = async (req, res, next) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.logout = logout;
const getUser = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        console.log(userId);
<<<<<<< HEAD
        const foundUser = await User_1.UserModel.findById(userId);
=======
        const foundUser = await user_1.UserModel.findById(userId);
>>>>>>> 9699da23981e5a07e6f2cac1c38569c3dd1c87a9
        if (!foundUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        return res.status(200).json({
            success: true,
            data: foundUser,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getUser = getUser;
//# sourceMappingURL=authController.js.map