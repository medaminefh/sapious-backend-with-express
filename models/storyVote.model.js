const mongoose = require("mongoose");

const StoryVoteSchema = new mongoose.Schema(
  {
    voter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    srory: { type: mongoose.Schema.Types.ObjectId, ref: "Story" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StoryReads", StoryReadsSchema);
