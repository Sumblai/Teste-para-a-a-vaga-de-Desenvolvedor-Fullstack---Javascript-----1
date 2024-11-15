import { Request, Response, NextFunction } from "express";

export function requireClientRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user?.role !== "cliente") {
    return res
      .status(403)
      .json({ message: "Access restricted to clients only" });
  }
  next();
}

export function requireProviderRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user?.role !== "prestador") {
    return res
      .status(403)
      .json({ message: "Access restricted to providers only" });
  }
  next();
}
