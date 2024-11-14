import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const SECRET_KEY = "your_secret_key";

interface MyCookies {
  token: string;
  // Adicione outros cookies aqui, se necessário
}

function generateToken(payload: object): string {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const { token }: MyCookies = req.cookies as MyCookies;
  if (!token) return res.status(401).json({ Message: "Not Allowed " });
  const decodedData = jwt.verify(token, SECRET_KEY) as { _id: string };
  // req.Admin = await Administrator.findById(decodedData._id);
  next();
}

export { generateToken };
