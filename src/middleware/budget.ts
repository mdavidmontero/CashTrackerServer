import type { Request, Response, NextFunction } from "express";
import { param, validationResult, body } from "express-validator";

export const validateBudgetId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  await param("id")
    .isInt()
    .withMessage("ID no válido")
    .bail()
    .custom((value) => value > 0)
    .withMessage("ID no válido")
    .bail()
    .run(req);

  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
