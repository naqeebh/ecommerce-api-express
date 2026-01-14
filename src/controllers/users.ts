import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models";

/**
 * POST /users
 */
export async function createUser(req: Request, res: Response) {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "Email already in use" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
  });
}

/**
 * GET /users
 */
export async function getUsers(_req: Request, res: Response) {
  const users = await User.find();

  res.status(200).json(
    users.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
    }))
  );
}

/**
 * GET /users/:id
 */
export async function getUserById(req: Request, res: Response) {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
  });
}

/**
 * PUT /users/:id
 */
export async function updateUser(req: Request, res: Response) {
  const { id } = req.params;
  const { name, email, password } = req.body;

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (email && email !== user.email) {
    const emailTaken = await User.findOne({ email });
    if (emailTaken) {
      return res.status(409).json({ message: "Email already in use" });
    }
    user.email = email;
  }

  if (name !== undefined) {
    user.name = name;
  }

  if (password !== undefined) {
    user.password = await bcrypt.hash(password, 10);
  }

  await user.save();

  res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
  });
}

/**
 * DELETE /users/:id
 */
export async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;

  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(204).send();
}
