const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
	name: { type: String },
	quantity: { type: Number },
	image: { type: String },
});

module.exports = mongoose.model("Product", ProductSchema);
