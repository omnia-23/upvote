import express from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import { createLike, getLike } from "./likes.contollers.js";

const router = express.Router();

router.post("/", authenticate, createLike);
router.get("/", authenticate, getLike);
export default router;
