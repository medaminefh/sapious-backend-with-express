const storyModel = require("../models/story.model");
const storyReadsModel = require("../models/storyReads.model");

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
  try {
    // Increment the READS and VIEWS

    /*     const storyAfterINC = await storyModel
          .findOneAndUpdate(
            { _id: req.story.id },
            { $inc: { views: 1, reads: 1 } },
            { new: true }
          )
          .populate("categories")
          .populate("tags"); */

    // add a reader

    const alreadyReadIt = await storyReadsModel.findOne({
      reader: req.user.id,
      story: req.story._id,
    });

    if (!alreadyReadIt) {
      const newReader = new storyReadsModel({
        reader: req.user.id,
        story: req.story._id,
      });

      await newReader.save();
    }

    // with aggregate

    // Always use _id in aggregation because _id its a (new ObjectId) and id (just a string), and they're not the same in aggregation (You need to be specific)
    const story = await storyModel.aggregate([
      { $match: { _id: req.story._id } },

      {
        $lookup: {
          from: "chapters",
          localField: "_id",
          foreignField: "story",
          as: "chapters",
        },
      },

      {
        $lookup: {
          from: "categories",
          localField: "categories",
          foreignField: "_id",
          as: "categories",
        },
      },

      {
        $lookup: {
          from: "tags",
          localField: "tags",
          foreignField: "_id",
          as: "tags",
        },
      },

      {
        $lookup: {
          from: "storyreads",
          localField: "_id",
          foreignField: "story",
          as: "storyreaders",
        },
      },

      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "story",
          as: "storycomments",
        },
      },
      {
        $addFields: {
          totalChapters: { $size: "$chapters" },
          totalReaders: { $size: "$storyreaders" },
          totalComments: { $size: "$storycomments" },
        },
      },
    ]);

    return res.status(200).json(story[0]);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const deleteStory = async (req, res) => {
  try {
    const story = await storyModel.findByIdAndDelete(req.story.id);
    return res.status(200).json(story);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateStory = async (req, res) => {
  try {
    const story = await storyModel.findByIdAndUpdate(req.story.id, req.body, {
      new: true,
    });
    return res.status(200).json(story);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.getStory = getStory;
module.exports.getStories = getStories;
module.exports.createStory = createStory;
module.exports.deleteStory = deleteStory;
module.exports.updateStory = updateStory;
