"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
async function connectDB() {
    try {
        const url = process.env.MONGODB_URL || "";
        await mongoose_1.default.connect(url);
        console.log("✓ MongoDB Connected");
    }
    catch (error) {
        console.error("✗ MongoDB Error:", error);
        process.exit(1);
    }
}
exports.default = mongoose_1.default;
//# sourceMappingURL=db.js.map