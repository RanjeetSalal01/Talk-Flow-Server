"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypingIndicator = void 0;
const TypingIndicator_1 = require("../models/TypingIndicator");
const getTypingIndicator = async (req, res) => {
    try {
        const { userId, chatWith } = req.query;
        if (!userId || !chatWith) {
            return res
                .status(400)
                .json({ success: false, message: "userId and chatWith are required" });
        }
        const indicator = await TypingIndicator_1.TypingIndicatorModel.findOne({
            userId: userId,
            chatWith: chatWith,
        });
        res.json({ success: true, data: indicator });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getTypingIndicator = getTypingIndicator;
//# sourceMappingURL=typingController.js.map