const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    comment: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    story: { type: mongoose.Schema.Types.ObjectId, ref: "Story" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
