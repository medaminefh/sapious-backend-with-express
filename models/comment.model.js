const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    comment: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
