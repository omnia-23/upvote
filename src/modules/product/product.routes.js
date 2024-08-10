import express from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "./product.controller.js";
import { upload } from "../../utils/multer.js";
const router = express.Router();

router.get("/", authenticate, getProducts);
router.post("/", upload.single("image"), authenticate, createProduct);
router.put("/:id", authenticate, updateProduct);

router.delete("/:id", authenticate, deleteProduct);

export default router;
