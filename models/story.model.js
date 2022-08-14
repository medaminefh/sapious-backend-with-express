const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    cover: { type: String },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    targetAudience: { type: String },
    language: { type: String, default: "Arabic" },
    rating: { type: Number },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    views: { type: Number, default: 0 },
    readTtime: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Story", StorySchema);
