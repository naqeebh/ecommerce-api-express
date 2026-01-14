import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";

export function validateObjectId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: "Invalid id",
    });
  }

  next();
}
