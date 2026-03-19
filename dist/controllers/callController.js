"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCallHistory = exports.updateCallStatus = exports.initiateCall = void 0;
const Call_1 = require("../models/Call");
const mongodb_1 = require("mongodb");
// POST /calls/initiate
// Called by caller when they press the call button.
// Just creates the record in DB with status = ringing.
const initiateCall = async (req, res, next) => {
    try {
        const call = await Call_1.CallModel.create({
            callerId: new mongodb_1.ObjectId(req.user.userId),
            receiverId: new mongodb_1.ObjectId(req.body.receiverId),
            callType: req.body.callType,
            status: Call_1.CallStatus.Ringing,
        });
        return res.status(201).json({ callId: call._id });
    }
    catch (error) {
        next(error);
    }
};
exports.initiateCall = initiateCall;
// POST /calls/status
// Called whenever call state changes: active, ended, rejected, missed, busy.
// Server sets all timestamps and calculates duration — never trust the client for this.
const updateCallStatus = async (req, res, next) => {
    try {
        const { callId, status } = req.body;
        const now = new Date();
        const update = { status };
        if (status === Call_1.CallStatus.Active) {
            update.startedAt = now;
        }
        if (status === Call_1.CallStatus.Ended) {
            update.endedAt = now;
            const call = await Call_1.CallModel.findById(callId).select("startedAt");
            if (call?.startedAt) {
                update.duration = Math.floor((now.getTime() - new Date(call.startedAt).getTime()) / 1000);
            }
        }
        // For rejected / missed / busy → only status is updated, no times needed
        await Call_1.CallModel.findByIdAndUpdate(callId, update);
        return res.status(200).json({ success: true });
    }
    catch (error) {
        next(error);
    }
};
exports.updateCallStatus = updateCallStatus;
// GET /calls/history
// Returns paginated call history for the logged-in user.
const getCallHistory = async (req, res, next) => {
    try {
        const userId = new mongodb_1.ObjectId(req.user.userId);
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 15;
        const skip = (page - 1) * limit;
        const filter = { $or: [{ callerId: userId }, { receiverId: userId }] };
        const [total, calls] = await Promise.all([
            Call_1.CallModel.countDocuments(filter),
            Call_1.CallModel.find(filter)
                .populate("callerId", "fullName avatarUrl username")
                .populate("receiverId", "fullName avatarUrl username")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
        ]);
        return res.status(200).json({ data: calls, hasMore: skip + limit < total, page, total });
    }
    catch (error) {
        next(error);
    }
};
exports.getCallHistory = getCallHistory;
//# sourceMappingURL=callController.js.map