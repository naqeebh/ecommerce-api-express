import { Router } from "express";
import { createUser, getUsers } from "../controllers/users";
import { createUserSchema } from "../schemas/user.schema";
import { validate } from "../middleware/validate";

const router = Router();

router.post("/", validate(createUserSchema), createUser);
router.get("/", getUsers); // 👈 THIS IS WHAT YOU ARE MISSING

export default router;
