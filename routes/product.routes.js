const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  getProductsByCategory,
} = require("../controllers/product.controllers");

const router = require("express").Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:categoryId/byCategory", getProductsByCategory);
router.get("/:productId", getProduct);
router.delete("/:productId", deleteProduct);
router.put("/:productId", updateProduct);
module.exports = router;
