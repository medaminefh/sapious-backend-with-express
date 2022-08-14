const {
  createTag,
  getTag,
  getTags,
  deleteTag,
  updateTag,
} = require("../controllers/tag.controller");
const verifyToken = require("../middlewares/verifyToken");
const tagModel = require("../models/tag.model");

const router = require("express").Router();

router.param("tag", (req, res, next, id) => {
  try {
    const tag = tagModel.findById(id);
    if (!tag) return res.status(404).json("There is No tag");

    req.tag = tag;
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/", verifyToken, createTag);
router.get("/", getTags);
router.get("/:tag", getTag);
router.delete("/:tag", verifyToken, deleteTag);
router.put("/:tag", verifyToken, updateTag);

module.exports = router;
