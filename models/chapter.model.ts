import mongoose from "mongoose";

const ChapterSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    story: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
      required: true,
    },
    part: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model("Chapter", ChapterSchema);
