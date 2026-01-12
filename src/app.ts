import express from "express";
import cors from "cors";

const app = express();

// Global middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

export default app;
