import { Router } from "express";
import { createCategory } from "../controllers/categories";
import { validate } from "../middleware/validate";
import { createCategorySchema } from "../schemas/category.schema";

const router = Router();

router.post("/", validate(createCategorySchema), createCategory);

export default router;
