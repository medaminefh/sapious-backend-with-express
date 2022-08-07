const chapterModel = require("../models/chapter.model");
const storyModel = require("../models/story.model");

const createChapter = async (req, res) => {
  try {
    // get the storyId
    const storyId = req.params.storyId;

    // check if the story exist
    const story = await storyModel.findById(storyId);

    // if there's no story
    if (!story) {
      return res.status(404).json({ err: "There is no Story" });
    }

    const newChapter = new chapterModel({
      title: req.body.title,
      content: req.body.content,
      story: storyId,
      part: req.body.part,
    });
    const savedChapter = await newChapter.save();
    return res.status(201).json(savedChapter);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getChapters = async (req, res) => {
  try {
    const chapters = await chapterModel.find().populate("story");

    return res.status(200).json(chapters);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getChaptersByStory = async (req, res) => {
  try {
    const storyId = req.params.storyId;

    const chapters = await chapterModel
      .find({ story: storyId })
      .populate("story");

    return res.status(200).json(chapters);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getChapter = async (req, res) => {
  const id = req.params.chapterId;
  try {
    const chapter = await chapterModel.findById(id).populate("story");

    return res.status(200).json(chapter);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const deleteChapter = async (req, res) => {
  const id = req.params.chapterId;
  try {
    const chapter = await chapterModel.findByIdAndDelete(id);
    return res.status(200).json(chapter);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateChapter = async (req, res) => {
  const id = req.params.chapterId;
  try {
    const chapter = await chapterModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(chapter);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.createChapter = createChapter;
module.exports.getChapter = getChapter;
module.exports.getChapters = getChapters;
module.exports.getChaptersByStory = getChaptersByStory;
module.exports.deleteChapter = deleteChapter;
module.exports.updateChapter = updateChapter;
