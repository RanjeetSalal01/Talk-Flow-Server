"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mainRoutes_1 = __importDefault(require("./mainRoutes"));
const errorHandler_1 = require("./middleware/errorHandler");
const db_1 = require("./utils/db");
const socket_1 = require("./utils/socket");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// middleware
app.use((0, cors_1.default)({
    origin: "http://localhost:4200", // your frontend URL
    credentials: true, // 🔥 VERY IMPORTANT
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// routes
app.use("/api", mainRoutes_1.default);
// health check
app.get("/api/health", (req, res) => res.json({ status: "OK", timestamp: new Date() }));
// error handling
app.use(errorHandler_1.notFound);
app.use(errorHandler_1.globalErrorHandler);
// create HTTP server and plug sockets
const server = http_1.default.createServer(app);
(0, socket_1.initSocket)(server);
async function start() {
    try {
        await (0, db_1.connectDB)();
        server.listen(PORT, () => {
            console.log(`✓ Server running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("✗ Server failed to start:", error);
        process.exit(1);
    }
}
start();
exports.default = app;
//# sourceMappingURL=index.js.map