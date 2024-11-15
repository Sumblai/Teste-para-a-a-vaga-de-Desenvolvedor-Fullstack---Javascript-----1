// app/controllers/authController.ts
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/Jwt";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { Request, Response, NextFunction } from "express";

import User, { IUser } from "../../domain/entities/User";
const userRepository = new UserRepository();

async function register(req: Request, res: Response) {
  const { name, nif, email, password, role } = req.body;

  const nifRegex = /^\d{9}$/;
  if (!nifRegex.test(nif)) {
    res.status(400).json({ message: "NIF must have exactly 9 digits" });
    return;
  }

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

async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { email, password } = req.body;
  try {
    const user = await userRepository.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = generateToken({ id: user._id, role: user.role });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });

    res.json({ token });
  } catch (error) {
    next(error);
  }
}

export { register };
export { login };
