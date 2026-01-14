import { Router } from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/users";
import { createUserSchema } from "../schemas/user.schema";
import { validate } from "../middleware/validate";

const router = Router();

router.post("/", validate(createUserSchema), createUser);
router.get("/", getUsers);

router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
