import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, maxlength: 120 },
    lastName: { type: String, maxlength: 120 },
    password: { type: String, minlength: 8 },
    email: {
      type: String,
      unique: true,
      index: true,
      lowercase: true,
      required: true,
    },
    avatar: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
