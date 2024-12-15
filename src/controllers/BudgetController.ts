import type { Request, Response } from "express";
import Budget from "../models/Budget";

export class BudgetController {
  static getAll = async (req: Request, res: Response): Promise<any> => {
    try {
      const budgets = await Budget.findAll({
        order: [["createdAt", "DESC"]],
      });
      res.json(budgets);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static create = async (req: Request, res: Response): Promise<any> => {
    try {
      const budget = await Budget.create(req.body);
      await budget.save();
      res.status(201).json("Presupuesto Creado Correctamente");
    } catch (error) {
      // console.log(error)
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getById = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const budget = await Budget.findByPk(id);
    res.json(budget);
  };

  static updateById = async (req: Request, res: Response): Promise<any> => {
    try {
      const budget = await Budget.findByPk(req.params.id);
      if (!budget) {
        const error = new Error("No se encontro el presupuesto");
        return res.status(404).json({ error: error.message });
      }

      await budget.update(req.body);

      res.json("Presupuesto actualizado correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static deleteById = async (req: Request, res: Response): Promise<any> => {
    try {
      const budget = await Budget.findByPk(req.params.id);
      if (!budget) {
        const error = new Error("No se encontro el presupuesto");
        return res.status(404).json({ error: error.message });
      }
      await budget.destroy();
      res.json("Presupuesto eliminado correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };
}
