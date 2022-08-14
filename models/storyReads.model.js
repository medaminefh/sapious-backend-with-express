const mongoose = require("mongoose");

const StoryReadsSchema = new mongoose.Schema(
  {
    reader: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    story: { type: mongoose.Schema.Types.ObjectId, ref: "Story" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StoryReads", StoryReadsSchema);
