import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  name: { type: String },
  quantity: { type: Number },
});

export default mongoose.model("Product", ProductSchema);
