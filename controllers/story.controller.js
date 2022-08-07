const storyModel = require("../models/story.model");

const createStory = async (req, res) => {
  const newStory = new storyModel({
    title: req.body.title,
    description: req.body.description,
    cover: req.body.cover,
    category: req.body.category,
    tags: req.body.tags,
    targetAudience: req.body.targetAudience,
    language: req.body.language,
    author: req.body.author,
  });
  try {
    const savedStory = await newStory.save();
    return res.status(201).json(savedStory);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getStories = async (req, res) => {
  try {
    const stories = await storyModel.find().populate("author");

    return res.status(200).json(stories);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getStory = async (req, res) => {
  const id = req.params.storyId;
  try {
    // Increment the READS and VIEWS
    const storyAfterINC = await storyModel
      .findOneAndUpdate(
        { _id: id },
        { $inc: { views: 1, reads: 1 } },
        { new: true }
      )
      .populate("categories")
      .populate("tags");

    return res.status(200).json(storyAfterINC);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const deleteStory = async (req, res) => {
  const id = req.params.storyId;
  try {
    const story = await storyModel.findByIdAndDelete(id);
    return res.status(200).json(story);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateStory = async (req, res) => {
  const id = req.params.productId;
  try {
    const story = await storyModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(story);
  } catch (err) {
    return res.status(500).json(err);
  }
};

/*  const getStoriesByCategory = async (req, res) => {
  const id = req.params.categoryId;

  try {
    const products = await storyModel
      .find({ category: id })
      .populate("category");
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json(err);
  }
};  */

module.exports.getStory = getStory;
module.exports.getStories = getStories;
module.exports.createStory = createStory;
module.exports.deleteStory = deleteStory;
module.exports.updateStory = updateStory;
//module.exports.getStoriesByCategory = getStoriesByCategory;
