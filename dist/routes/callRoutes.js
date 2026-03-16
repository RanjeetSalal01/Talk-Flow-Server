"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const callController_1 = require("../controllers/callController");
const router = express_1.default.Router();
// api/calls/initiate
router.post("/initiate", auth_1.verifyToken, callController_1.initiateCall);
// api/calls/status
router.patch("/status", auth_1.verifyToken, callController_1.updateCallStatus);
// api/calls/history
router.get("/history", auth_1.verifyToken, callController_1.getCallHistory);
exports.default = router;
//# sourceMappingURL=callRoutes.js.map