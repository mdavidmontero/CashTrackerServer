import { NextFunction, Request, Response } from "express";
import { param, validationResult, body } from "express-validator";
import Expense from "../models/Expense";

declare global {
  namespace Express {
    interface Request {
      expense?: Expense;
    }
  }
}

export const validateExpenseInput = async (
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

export const validateExpenseId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  await param("expenseId")
    .isInt()
    .custom((value) => value > 0)
    .withMessage("ID no válido")
    .run(req);

  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateExpenseExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { expenseId } = req.params;
    const expense = await Expense.findByPk(expenseId);
    if (!expense) {
      const error = new Error("Gasto no encontrado");
      return res.status(404).json({ error: error.message });
    }
    req.expense = expense;
    next();
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
};
