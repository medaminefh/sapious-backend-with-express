const productModels = require("../models/comment.models");

const createProduct = async (req, res) => {
  const newProduct = new productModels({
    name: req.body.name,
    quantity: req.body.quantity,
    image: req.body.image,
    category: req.body.category,
  });
  try {
    const savedProduct = await newProduct.save();
    return res.status(201).json(savedProduct);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await productModels.find().populate("category");
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getProduct = async (req, res) => {
  const id = req.params.productId;
  try {
    const product = await productModels.findById(id).populate("category");
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getProductsByCategory = async (req, res) => {
  const id = req.params.categoryId;

  try {
    const products = await productModels
      .find({ category: id })
      .populate("category");
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.productId;
  try {
    const product = await productModels.findByIdAndDelete(id);
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json(err);
  }
};
const updateProduct = async (req, res) => {
  const id = req.params.productId;
  try {
    const product = await productModels.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json(err);
  }
};
module.exports.getProduct = getProduct;
module.exports.getProducts = getProducts;
module.exports.createProduct = createProduct;
module.exports.deleteProduct = deleteProduct;
module.exports.updateProduct = updateProduct;
module.exports.getProductsByCategory = getProductsByCategory;
