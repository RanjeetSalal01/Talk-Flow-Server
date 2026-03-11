import express from "express";
import {
  register,
  getUser,
  updateUser,
  deleteUser,
  searchUser,
} from "../controllers/userController";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

// api/user/register
router.post("/register", register);

// api/user/getUsers
router.get("/getUsers/:id", getUser);

// api/user/updateUser
router.put("/updateUser/:id", updateUser);

// api/user/deleteUser
router.delete("/deleteUser/:id", deleteUser);

// api/user/searchUser
router.get("/searchUser", verifyToken, searchUser);

export default router;
