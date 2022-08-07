import express from "express";
import {
  createCategory,
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/category.controller";

const router = express.Router();

router.post("/", createCategory);
router.get("/", getCategories);
router.get("/:categoryName", getCategory);
router.delete("/:categoryName", deleteCategory);
router.put("/:categoryName", updateCategory);

export default router;
