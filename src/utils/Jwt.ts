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

export const logout = (req: Request, res: Response): void => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ message: "No authentication token provided." });
      return;
    }

    const decoded = jwt.verify(token, SECRET_KEY) as {
      id: string;
      role: string;
    };

    const { userId } = req.params;

    if (userId !== decoded.id) {
      res
        .status(401)
        .json({ message: "User ID does not match the authenticated user." });
      return;
    }

    res.clearCookie("token", {
      httpOnly: true,
    });

    res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "An error occurred during logout." });
    return;
  }
};
export { generateToken };
