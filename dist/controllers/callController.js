"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCallHistory = exports.updateCallStatus = exports.initiateCall = void 0;
<<<<<<< HEAD
const Call_1 = require("../models/Call");
=======
const call_1 = require("../models/call");
>>>>>>> 9699da23981e5a07e6f2cac1c38569c3dd1c87a9
const mongodb_1 = require("mongodb");
const initiateCall = async (req, res, next) => {
    try {
        const callerId = new mongodb_1.ObjectId(req.user.userId);
        const { receiverId, callType } = req.body;
<<<<<<< HEAD
        const call = await Call_1.CallModel.create({
            callerId,
            receiverId: new mongodb_1.ObjectId(receiverId),
            callType,
            status: Call_1.CallStatus.Ringing,
=======
        const call = await call_1.CallModel.create({
            callerId,
            receiverId: new mongodb_1.ObjectId(receiverId),
            callType,
            status: call_1.CallStatus.Ringing,
>>>>>>> 9699da23981e5a07e6f2cac1c38569c3dd1c87a9
        });
        return res.status(201).json({ callId: call._id });
    }
    catch (error) {
        next(error);
    }
};
exports.initiateCall = initiateCall;
const updateCallStatus = async (req, res, next) => {
    try {
        const { callId, status } = req.body;
        const now = new Date();
        const update = { status };
<<<<<<< HEAD
        if (status === Call_1.CallStatus.Active) {
            update.startedAt = now; // ✅ server sets startedAt
        }
        if (status === Call_1.CallStatus.Ended) {
            update.endedAt = now; // ✅ server sets endedAt
            const call = await Call_1.CallModel.findById(callId).select("startedAt");
=======
        if (status === call_1.CallStatus.Active) {
            update.startedAt = now; // ✅ server sets startedAt
        }
        if (status === call_1.CallStatus.Ended) {
            update.endedAt = now; // ✅ server sets endedAt
            const call = await call_1.CallModel.findById(callId).select("startedAt");
>>>>>>> 9699da23981e5a07e6f2cac1c38569c3dd1c87a9
            if (call?.startedAt) {
                // ✅ server calculates duration
                update.duration = Math.floor((now.getTime() - new Date(call.startedAt).getTime()) / 1000);
            }
        }
        // missed, rejected, busy → only update status, no times
<<<<<<< HEAD
        await Call_1.CallModel.findByIdAndUpdate(callId, update, { new: true });
=======
        await call_1.CallModel.findByIdAndUpdate(callId, update, { new: true });
>>>>>>> 9699da23981e5a07e6f2cac1c38569c3dd1c87a9
        return res.status(200).json({ success: true });
    }
    catch (error) {
        next(error);
    }
};
exports.updateCallStatus = updateCallStatus;
const getCallHistory = async (req, res, next) => {
    try {
        const userId = new mongodb_1.ObjectId(req.user.userId);
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 15;
        const skip = (page - 1) * limit;
<<<<<<< HEAD
        const total = await Call_1.CallModel.countDocuments({
            $or: [{ callerId: userId }, { receiverId: userId }]
        });
        const calls = await Call_1.CallModel.find({
=======
        const total = await call_1.CallModel.countDocuments({
            $or: [{ callerId: userId }, { receiverId: userId }]
        });
        const calls = await call_1.CallModel.find({
>>>>>>> 9699da23981e5a07e6f2cac1c38569c3dd1c87a9
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
    }
    catch (error) {
        next(error);
    }
};
exports.getCallHistory = getCallHistory;
//# sourceMappingURL=callController.js.map