const {
  createStory,
  getStory,
  getStories,
  deleteStory,
  updateStory,
} = require("../controllers/story.controller");

const router = require("express").Router();

router.post("/", createStory);
router.get("/", getStories);
router.get("/:storyId", getStory);
router.delete("/:storyId", deleteStory);
router.put("/:storyId", updateStory);
module.exports = router;
