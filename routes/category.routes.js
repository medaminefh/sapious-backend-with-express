const {
  createCategory,
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/category.controller");

const router = require("express").Router();

router.post("/", createCategory);
router.get("/", getCategories);
router.get("/:categoryName", getCategory);
router.delete("/:categoryName", deleteCategory);
router.put("/:categoryName", updateCategory);

module.exports = router;
