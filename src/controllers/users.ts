import bcrypt from "bcrypt";
import { User } from "../models";

export async function createUser(req: any, res: any) {
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
