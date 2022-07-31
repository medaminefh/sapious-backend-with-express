import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  name: { type: String },
  quantity: { type: String },
});

export default mongoose.model("Product", ProductSchema);
