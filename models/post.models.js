const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    content: {
      type: String,
    },
    likes: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
