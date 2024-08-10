import { Router } from "express";
import { uniqueEmail } from "./auth.middleware.js";
import { signUp, confirmEmail, signIn } from "./auth.controllers.js";

const authRoute = Router();

authRoute.post("/signup", uniqueEmail, signUp);
authRoute.post("/signin", signIn);
authRoute.get("/confirm", confirmEmail);

export default authRoute;
