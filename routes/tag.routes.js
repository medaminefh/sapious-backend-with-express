const {
  createTag,
  getTag,
  getTags,
  deleteTag,
  updateTag,
} = require("../controllers/tag.controller");

const router = require("express").Router();

router.post("/", createTag);
router.get("/", getTags);
router.get("/:tagName", getTag);
router.delete("/:tagName", deleteTag);
router.put("/:tagName", updateTag);

module.exports = router;
