const mongoose = require("mongoose");

const {
  createChapter,
  getChapters,
  getChapter,
  deleteChapter,
} = require("../controllers/chapter.controller");

const {
  createComment,
  getComments,
  getComment,
  deleteComment,
  updateComment,
} = require("../controllers/comment.controller");

const {
  createStory,
  getStory,
  getStories,
  deleteStory,
  updateStory,
} = require("../controllers/story.controller");
const isCommentOwner = require("../middlewares/isCommentOwner");

const isStoryOwner = require("../middlewares/isStoryOwner");
const verifyToken = require("../middlewares/verifyToken");
const chapterModel = require("../models/chapter.model");
const storyModel = require("../models/story.model");
const storyCommentsModel = require("../models/storyComments.model");

const router = require("express").Router();

router.param("story", async (req, res, next, id) => {
  try {
    const story = await storyModel.findById(id);

    if (!story) return res.status(404).json("No story Found!");

    const chapters = await chapterModel.find({ story: story.id });

    req.story = story;
    req.chapters = chapters;
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.param("chapter", async (req, res, next, id) => {
  try {
    const chapter = await chapterModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(id) } },
    ]);

    if (!chapter) return res.status(404).json("No chapter with that id!");

    req.chapter = chapter[0];
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.param("comment", async (req, res, next, id) => {
  try {
    const comment = await storyCommentsModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(id) } },
    ]);

    if (!comment) return res.status(404).json("No comment with that id!");

    req.comment = comment[0];
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/", verifyToken, createStory);
router.get("/", getStories);
router.get("/:story", verifyToken, getStory);
router.delete("/:story", verifyToken, isStoryOwner, deleteStory);
router.put("/:story", verifyToken, isStoryOwner, updateStory);

//chapters
router.post("/:story/chapters", verifyToken, isStoryOwner, createChapter);
router.get("/:story/chapters", getChapters);
router.get("/:story/chapters/:chapter", getChapter);
router.delete(
  "/:story/chapters/:chapter",
  verifyToken,
  isStoryOwner,
  deleteChapter
);
router.put("/:story/chapters/:chapter", verifyToken, isStoryOwner, updateStory);

//comments
router.post("/:story/comments", verifyToken, createComment);
router.get("/:story/comments", getComments);
router.get("/:story/comments/:comment", getComment);
router.delete(
  "/:story/comments/:comment",
  verifyToken,
  isCommentOwner,
  deleteComment
);
router.put(
  "/:story/comments/:comment",
  verifyToken,
  isCommentOwner,
  updateComment
);

module.exports = router;
