import { Request, Response } from "express";
import { Category } from "../models";

export async function createCategory(req: Request, res: Response) {
  const { name } = req.body;

  const existing = await Category.findOne({ name });
  if (existing) {
    return res.status(409).json({ message: "Category already exists" });
  }

  const category = await Category.create({ name });

  res.status(201).json({
    id: category._id,
    name: category.name,
  });
}
