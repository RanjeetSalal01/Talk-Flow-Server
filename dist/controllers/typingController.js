"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypingIndicator = void 0;
<<<<<<< HEAD
const TypingIndicator_1 = require("../models/TypingIndicator");
=======
const typingIndicator_1 = require("../models/typingIndicator");
>>>>>>> 9699da23981e5a07e6f2cac1c38569c3dd1c87a9
const getTypingIndicator = async (req, res) => {
    try {
        const { userId, chatWith } = req.query;
        if (!userId || !chatWith) {
            return res
                .status(400)
                .json({ success: false, message: "userId and chatWith are required" });
        }
<<<<<<< HEAD
        const indicator = await TypingIndicator_1.TypingIndicatorModel.findOne({
=======
        const indicator = await typingIndicator_1.TypingIndicatorModel.findOne({
>>>>>>> 9699da23981e5a07e6f2cac1c38569c3dd1c87a9
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