import mongoose from "mongoose";

const TagSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, lowercase: true },
  },
  { timestamps: true }
);

export default mongoose.model("Tag", TagSchema);
