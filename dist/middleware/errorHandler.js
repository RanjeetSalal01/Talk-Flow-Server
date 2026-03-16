"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.globalErrorHandler = void 0;
const globalErrorHandler = (err, req, res, next) => {
    // Duplicate key error
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        const value = err.keyValue[field];
        return res.status(400).json({
            success: false,
            message: `${field} '${value}' already exists`,
        });
    }
    // Validation error
    if (err.name === "ValidationError") {
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }
    // Default error
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
};
exports.globalErrorHandler = globalErrorHandler;
const notFound = (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
};
exports.notFound = notFound;
//# sourceMappingURL=errorHandler.js.map