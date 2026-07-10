import express from "express";
import { capitalize, formatDate } from "@projectos/shared";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        credentials: true,
    },
});
// Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
// Socket.io
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});
// Health check route
app.get("/api/health", (req, res) => {
    res.json({
        status: capitalize("ok"),
        timestamp: new Date().toISOString(),
        date: formatDate(new Date()),
        uptime: process.uptime(),
    });
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
