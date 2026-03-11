import express from "express";
import { login, logout, getUser } from "../controllers/authController";
import { verifyToken } from "../middleware/auth";


const router = express.Router();

// api/auth/login
router.post("/login", login);

// api/auth/logout
router.post("/logout", logout);

// api/auth/me
router.get("/me", verifyToken, getUser);

export default router;
