"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profileController_1 = require("../controllers/profileController");
const router = express_1.default.Router();
router.post("/", profileController_1.createProfile);
router.get("/:id", profileController_1.getProfile);
router.put("/:id", profileController_1.updateProfile);
router.delete("/:id", profileController_1.deleteProfile);
exports.default = router;
//# sourceMappingURL=profileRoutes.js.map