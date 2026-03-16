"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProfile = exports.updateProfile = exports.getProfile = exports.createProfile = void 0;
const models_1 = require("../models");
const createProfile = async (req, res) => {
    try {
        const { id, username } = req.body;
        const profile = await models_1.ProfileModel.create({ id, username });
        res.status(201).json({ success: true, data: profile });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.createProfile = createProfile;
const getProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await models_1.ProfileModel.findById(id);
        res.json({ success: true, data: profile });
    }
    catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await models_1.ProfileModel.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json({ success: true, data: profile });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.updateProfile = updateProfile;
const deleteProfile = async (req, res) => {
    try {
        const { id } = req.params;
        await models_1.ProfileModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Profile deleted" });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.deleteProfile = deleteProfile;
//# sourceMappingURL=profileController.js.map