import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

function generateToken(payload: object): string {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
}

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.token;

  console.log("token extraido : ", token);

  if (!token) {
    res.status(401).json({ message: "Access token is missing or invalid" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as {
      id: string;
      role: string;
    };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
export { generateToken };
