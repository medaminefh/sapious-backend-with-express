import express from "express";
import {
  createStory,
  getStory,
  getStories,
  deleteStory,
  updateStory,
} from "../controllers/story.controller";

const router = express.Router();

router.post("/", createStory);
router.get("/", getStories);
router.get("/:storyId", getStory);
router.delete("/:storyId", deleteStory);
router.put("/:storyId", updateStory);

export default router;
