const {
  createCategory,
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/category.controllers");

const router = require("express").Router();

router.post("/", createCategory);
router.get("/", getCategories);
router.get("/:categoryId", getCategory);
router.delete("/:categoryId", deleteCategory);
router.put("/:categoryId", updateCategory);

module.exports = router;
