"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const friendRequestController_1 = require("../controllers/friendRequestController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// api/friend-request/sendFriendRequest
router.post("/sendFriendRequest", auth_1.verifyToken, friendRequestController_1.sendFriendRequest);
// api/friend-request/acceptFriendRequest
router.patch("/acceptFriendRequest/:id", auth_1.verifyToken, friendRequestController_1.acceptFriendRequest);
// api/friend-request/rejectFriendRequest
router.delete("/rejectFriendRequest/:id", auth_1.verifyToken, friendRequestController_1.rejectFriendRequest);
// api/friend-request/getFriends
router.get("/getFriends", auth_1.verifyToken, friendRequestController_1.getFriends);
// api/friend-request/getIncomingRequests
router.get("/getIncomingRequests", auth_1.verifyToken, friendRequestController_1.getIncomingRequests);
// api/friend-request/getOutgoingRequests
router.get("/getOutgoingRequests", auth_1.verifyToken, friendRequestController_1.getOutgoingRequests);
exports.default = router;
//# sourceMappingURL=friendRequestRoutes.js.map