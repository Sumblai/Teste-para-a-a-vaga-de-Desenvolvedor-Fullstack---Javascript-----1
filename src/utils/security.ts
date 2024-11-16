import rateLimit from "express-rate-limit";
import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateInputs = [
  body("name").trim().escape(),
  body("email").isEmail().normalizeEmail(),
  body("message").trim().escape(),
];

export const validateAndSanitize = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  next();
};

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 6,
  message: "Too many login attempts, please try again later.",
});
