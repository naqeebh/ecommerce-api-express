 import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  // 1) Mongoose invalid ObjectId cast (extra safety net)
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ message: "Invalid id" });
  }

  // 2) Mongo duplicate key error (e.g. unique email)
  // Mongo uses code 11000 for duplicate key violations
  if (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as any).code === 11000
  ) {
    return res.status(409).json({ message: "Duplicate key error" });
  }

  // 3) Fallback
  console.error(err);
  return res.status(500).json({ message: "Internal server error" });
}
