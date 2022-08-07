import express from "express";
import {
  createChapter,
  getChapter,
  getChaptersByStory,
  getChapters,
  deleteChapter,
  updateChapter,
} from "../controllers/chapter.controller";

const router = express.Router();

router.post("/", createChapter);
router.get("/", getChapters);
router.get("/:chapterId", getChapter);
router.get("/:storyId/byStory", getChaptersByStory);
router.put("/:chapterId", updateChapter);
router.delete("/:chapterId", deleteChapter);

export default router;
