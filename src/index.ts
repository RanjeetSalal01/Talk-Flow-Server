require("dotenv").config();

import cors from "cors";
import express, { Express } from "express";
import http from "http";

import mainRoutes from "./mainRoutes";
import { globalErrorHandler, notFound } from "./middleware/errorHandler";
import { connectDB } from "./utils/db";
import { initSocket } from "./utils/socket";

const app: Express = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(
  cors({
    origin: "http://localhost:4200", // your frontend URL
    credentials: true, // 🔥 VERY IMPORTANT
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api", mainRoutes);

// health check
app.get("/api/health", (req, res) =>
  res.json({ status: "OK", timestamp: new Date() }),
);

// error handling
app.use(notFound);
app.use(globalErrorHandler);

// create HTTP server and plug sockets
const server = http.createServer(app);
initSocket(server);

async function start() {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`✓ Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("✗ Server failed to start:", error);
    process.exit(1);
  }
}

start();

export default app;
