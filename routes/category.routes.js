const {
  createCategory,
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/category.controller");
const categoryModel = require("../models/category.model");

const router = require("express").Router();

router.param("category", async (req, res, next, id) => {
  try {
    const category = await categoryModel.findById(id);

    if (!category) return res.status(404).json("No Category Found!");

    req.category = category;
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/", createCategory);
router.get("/", getCategories);
router.get("/:category", getCategory);
router.delete("/:category", deleteCategory);
router.put("/:category", updateCategory);

module.exports = router;
