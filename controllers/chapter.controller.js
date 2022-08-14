const chapterModel = require("../models/chapter.model");
const storyModel = require("../models/story.model");

const createChapter = async (req, res) => {
  try {
    const story = req.story;

    const newChapter = new chapterModel({
      title: req.body.title,
      content: req.body.content,
      story: story.id,
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
    const chapters = await chapterModel.find({ story: req.story.id });

    return res.status(200).json(chapters);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getChapter = async (req, res) => {
  try {
    // const chapter = await chapterModel.findById(req.chapter.id);
    const chapter = req.chapter;
    return res.status(200).json(chapter);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const deleteChapter = async (req, res) => {
  try {
    const chapter = await chapterModel.findByIdAndDelete(req.chapter.id);
    return res.status(200).json(chapter);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateChapter = async (req, res) => {
  try {
    const chapter = await chapterModel.findByIdAndUpdate(
      req.chapter.id,
      req.body,
      {
        new: true,
      }
    );
    return res.status(200).json(chapter);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.createChapter = createChapter;
module.exports.getChapter = getChapter;
module.exports.getChapters = getChapters;
module.exports.deleteChapter = deleteChapter;
module.exports.updateChapter = updateChapter;
