import { Request, Response, NextFunction } from "express";

export function requireClientRole(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (req.user?.role !== "cliente") {
    res.status(403).json({ message: "Access restricted to clients only" });
    return;
  }
  next();
}

export function requireProviderRole(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (req.user?.role !== "prestador") {
    res.status(403).json({ message: "Access restricted to providers only" });
    return;
  }
  next();
}
