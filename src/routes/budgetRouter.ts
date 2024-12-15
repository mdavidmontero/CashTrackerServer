import { Router } from "express";
import { body } from "express-validator";
import { BudgetController } from "../controllers/BudgetController";
import { handleInputErrors } from "../middleware/validation";
import { validateBudgetId } from "../middleware/budget";

const router = Router();

router.get("/", BudgetController.getAll);

router.post(
  "/",
  body("name").notEmpty().withMessage("El nombre es obligatorio"),
  body("amount")
    .notEmpty()
    .withMessage("La cantidad es obligatoria")
    .custom((value) => value > 0)
    .withMessage("La cantidad no puede ser negativa"),
  handleInputErrors,
  BudgetController.create
);

router.get("/:id", validateBudgetId, BudgetController.getById);

router.put(
  "/:id",
  validateBudgetId,
  body("name").notEmpty().withMessage("El nombre es obligatorio"),
  body("amount")
    .notEmpty()
    .withMessage("La cantidad es obligatoria")
    .custom((value) => value > 0)
    .withMessage("La cantidad no puede ser negativa"),
  handleInputErrors,
  BudgetController.updateById
);

router.delete("/:id", validateBudgetId, BudgetController.deleteById);

export default router;
