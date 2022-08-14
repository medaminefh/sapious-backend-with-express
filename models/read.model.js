const mongoose = require("mongoose");

const ReadsSchema = new mongoose.Schema(
  {
    reader: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reads", ReadsSchema);
