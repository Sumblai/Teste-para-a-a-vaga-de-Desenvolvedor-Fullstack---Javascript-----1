// app/controllers/authController.ts
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/Jwt";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { Request, Response } from "express";

import User, { IUser } from "../../domain/entities/User";
const userRepository = new UserRepository();

async function register(req: Request, res: Response) {
  const { name, nif, email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, nif, email, password: hashedPassword, role });

  try {
    const savedUser = await userRepository.create(user);
    res.json({ message: "User created", userId: savedUser._id });
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error });
    console.log(error);
  }
}

async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await userRepository.findByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken({ id: user._id, role: user.role });
  res.json({ token });
}

export { register };
export { login };
