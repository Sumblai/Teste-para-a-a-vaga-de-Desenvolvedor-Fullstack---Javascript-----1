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

  // Se houver erros, envia a resposta e não chama o next
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return; // Aqui usamos `return` para garantir que o fluxo seja interrompido
  }

  // Se não houver erros, passa para o próximo middleware
  next();
};

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 6,
  message: "Too many login attempts, please try again later.",
});
