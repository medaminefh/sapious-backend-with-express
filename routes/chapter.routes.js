const {
  createChapter,
  getChapter,
  getChaptersByStory,
  getChapters,
  deleteChapter,
  updateChapter,
} = require("../controllers/chapter.controller");

const router = require("express").Router();

router.post("/", createChapter);
router.get("/", getChapters);
router.get("/:chapterId", getChapter);
router.get("/:storyId/byStory", getChaptersByStory);
router.put("/:chapterId", updateChapter);
router.delete("/:chapterId", deleteChapter);

module.exports = router;
