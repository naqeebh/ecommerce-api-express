import { Router } from "express";
import { createUser } from "../controllers/users";
import { createUserSchema } from "../schemas/user.schema";
import { validate } from "../middleware/validate";

const router = Router();

router.post("/", validate(createUserSchema), createUser);

export default router;
