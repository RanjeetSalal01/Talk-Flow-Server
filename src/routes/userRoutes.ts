import express from "express";
import {
  register,
  getUser,
  updateUser,
  deleteUser,
  searchUser,
  changePassword
} from "../controllers/userController";
import { verifyToken } from "../middleware/auth";
import { upload } from "../middleware/upload";

const router = express.Router();

// api/user/register
router.post("/register", register);

// api/user/getUsers
router.get("/getUsers/:id", getUser);

// api/user/updateUser
router.patch("/updateUser", verifyToken, upload.single('avatar'), updateUser);

// api/user/deleteUser
router.delete("/deleteUser/:id", deleteUser);

// api/user/searchUser
router.get("/searchUser", verifyToken, searchUser);

// api/user/changePassword
router.patch('/changePassword', verifyToken, changePassword);

export default router;
