const commentModel = require("../models/storyComments.model");

const createComment = async (req, res) => {
  const newComment = new commentModel({
    comment: req.body.comment,
    user: req.user.id,
    story: req.story._id,
  });
  try {
    const savedComment = await newComment.save();
    return res.status(201).json(savedComment);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getComments = async (req, res) => {
  try {
    // const comments = await commentModel.find({ story: req.story._id });
    const comments = await commentModel.aggregate([
      { $match: { story: req.story._id } },
    ]);
    return res.status(200).json(comments);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getComment = async (req, res) => {
  try {
    // const category = await commentModel.findById(req.category.id);

    return res.status(200).json(req.comment);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await commentModel.findByIdAndDelete(req.comment._id);
    return res.status(200).json(comment);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateComment = async (req, res) => {
  try {
    const comment = await commentModel.findByIdAndUpdate(
      req.comment._id,
      req.body,
      {
        new: true,
      }
    );
    return res.status(200).json(comment);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.getComment = getComment;
module.exports.getComments = getComments;
module.exports.createComment = createComment;
module.exports.deleteComment = deleteComment;
module.exports.updateComment = updateComment;
