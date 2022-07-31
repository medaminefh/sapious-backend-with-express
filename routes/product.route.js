import express from "express";
import {
  createProduct,
  getProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} from "../controllers/product.controller.js";
const router = express.Router();

router.get("/", getProducts);
router.get("/:productId", getProduct);
router.put("/:productId", updateProduct);
router.post("/", createProduct);
router.delete("/:productId", deleteProduct);

export default router;
