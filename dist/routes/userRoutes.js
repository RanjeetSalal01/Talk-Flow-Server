"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middleware/auth");
const upload_1 = require("../middleware/upload");
const router = express_1.default.Router();
// api/user/register
router.post("/register", userController_1.register);
// api/user/getUsers
router.get("/getUsers/:id", userController_1.getUser);
// api/user/updateUser
router.patch("/updateUser", auth_1.verifyToken, upload_1.upload.single('avatar'), userController_1.updateUser);
// api/user/deleteUser
router.delete("/deleteUser/:id", userController_1.deleteUser);
// api/user/searchUser
router.get("/searchUser", auth_1.verifyToken, userController_1.searchUser);
// api/user/changePassword
router.patch('/changePassword', auth_1.verifyToken, userController_1.changePassword);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map