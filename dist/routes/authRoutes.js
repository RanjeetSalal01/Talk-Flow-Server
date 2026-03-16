"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// api/auth/login
router.post("/login", authController_1.login);
// api/auth/logout
router.post("/logout", authController_1.logout);
// api/auth/me
router.get("/me", auth_1.verifyToken, authController_1.getUser);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map