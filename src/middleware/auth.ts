import { Request, Response, NextFunction } from "express";
import { verify } from "../utils/jwt";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["cookie"];

  if (!authHeader || !authHeader.toString().startsWith("token=")) {
    return res.status(401).json({ success: false, message: "Missing token" });
  }

  const token = authHeader.toString().split("=")[1];
  try {
    const decoded = verify(token);
    // attach to request for handlers
    (req as any).body.user = decoded;
    next();
  } catch (err: any) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};
