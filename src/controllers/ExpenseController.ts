import type { Request, Response } from "express";
import Expense from "../models/Expense";

export class ExpensesController {
  static getAll = async (req: Request, res: Response): Promise<any> => {};

  static create = async (req: Request, res: Response): Promise<any> => {
    //del middleware -> req.budget.id
    // del params -> req.params.budgetId
    try {
      const expense = new Expense(req.body);
      expense.budgetId = req.budget.id;
      await expense.save();
      res.status(201).json("Gasto Agregado Correctamente");
    } catch (error) {
      // console.log(error);
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getById = async (req: Request, res: Response): Promise<any> => {
    res.json(req.expense);
  };

  static updateById = async (req: Request, res: Response): Promise<any> => {
    await req.expense.update(req.body);
    res.json("Se actualizo el gasto correctamente");
  };

  static deleteById = async (req: Request, res: Response): Promise<any> => {
    await req.expense.destroy();
    res.json("El gasto se elimino correctamente");
  };
}
