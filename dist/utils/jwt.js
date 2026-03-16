"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.verify = verify;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TOKEN_EXPIRY = "4h";
function generateToken(payload) {
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET);
}
function verify(token) {
    return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
}
//# sourceMappingURL=jwt.js.map