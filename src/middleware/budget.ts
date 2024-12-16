import type { Request, Response, NextFunction } from "express";
import { param, validationResult, body } from "express-validator";
import Budget from "../models/Budget";

declare global {
  namespace Express {
    interface Request {
      budget?: Budget;
    }
  }
}

export const validateBudgetId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  await param("budgetId")
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

export const validateBudgetExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { budgetId } = req.params;
    const budget = await Budget.findByPk(budgetId);
    if (!budget) {
      const error = new Error("No se encontro el presupuesto");
      return res.status(404).json({ error: error.message });
    }
    req.budget = budget;
    next();
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
};

export const validateBudgetInput = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  await body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .run(req);
  await body("amount")
    .notEmpty()
    .withMessage("La cantidad es obligatoria")
    .custom((value) => value > 0)
    .withMessage("La cantidad no puede ser negativa")
    .run(req);
  next();
};
