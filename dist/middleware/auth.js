"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jwt_1 = require("../utils/jwt");
const verifyToken = (req, res, next) => {
    const authHeader = req.headers["cookie"];
    if (!authHeader || !authHeader.toString().startsWith("token=")) {
        return res.status(401).json({ success: false, message: "Missing token" });
    }
    const token = authHeader.toString().split("=")[1];
    try {
        const decoded = (0, jwt_1.verify)(token);
        // attach to request for handlers
        req.user = decoded;
        next();
    }
    catch (err) {
        return res
            .status(401)
            .json({ success: false, message: "Invalid or expired token" });
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=auth.js.map