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
import { validateObjectId } from "../middleware/validateObjectId";

const router = Router();

// POST USERS 
router.post("/", validate(createUserSchema), createUser);
router.get("/", getUsers);

router.get("/:id", validateObjectId, getUserById);
router.put("/:id", validateObjectId, updateUser);
router.delete("/:id", validateObjectId, deleteUser);

export default router;
