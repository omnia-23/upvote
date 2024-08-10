import { Router } from "express";
import { authenticate, authorized } from "../../middleware/auth.middleware.js";
import { createUser, getAllUsers } from "./user.controllers.js";
import { uniqueEmail } from "../auth/auth.middleware.js";
import { createUserVal } from "./user.validation.js";
import { validation } from "../../middleware/validation.middleware.js";

const userRouter = Router();

userRouter.get("/", authenticate, authorized(["admin"]), getAllUsers);
userRouter.post(
  "/",
  authenticate,
  uniqueEmail,
  validation(createUserVal),
  createUser
);
export default userRouter;
