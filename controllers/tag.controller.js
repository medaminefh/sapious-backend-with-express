const tagModel = require("../models/tag.model");

const createTag = async (req, res) => {
  console.log(req.body);
  const newTag = new tagModel({
    name: req.body.name,
  });
  try {
    const savedTag = await newTag.save();
    return res.status(201).json(savedTag);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getTags = async (req, res) => {
  try {
    const tags = await tagModel.find();
    return res.status(200).json(tags);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getTag = async (req, res) => {
  const name = req.params.tagName;
  try {
    const tag = await tagModel.findOne({ name });
    return res.status(200).json(tag);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const deleteTag = async (req, res) => {
  const name = req.params.tagName;
  try {
    const tag = await tagModel.findOneAndDelete({ name });
    return res.status(200).json(tag);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateTag = async (req, res) => {
  const name = req.params.tagName;
  try {
    const tag = await tagModel.findOneAndUpdate({ name }, req.body, {
      new: true,
    });
    return res.status(200).json(tag);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.getTag = getTag;
module.exports.getTags = getTags;
module.exports.createTag = createTag;
module.exports.deleteTag = deleteTag;
module.exports.updateTag = updateTag;
