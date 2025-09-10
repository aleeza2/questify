// server/index.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import verifyRouter from "./api/verify/index.js";

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});

// quick health check
app.get("/api/verify/health", (_req, res) => res.json({ ok: true }));

// mount the API
app.use("/api/verify", verifyRouter);

const PORT = process.env.PORT || 5057;
app.listen(PORT, () => console.log(`⚔ Oracle running at http://localhost:${PORT}`));
