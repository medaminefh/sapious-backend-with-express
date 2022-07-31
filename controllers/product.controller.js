import ProductModel from "../models/ProductModel.js";

export const createProduct = async (req, res) => {
  console.log(req.body);
  const newProduct = new ProductModel({
    name: req.body.name,
    quantity: req.body.quantity,
  });

  try {
    const savedProduct = await newProduct.save();
    return res.status(200).json(savedProduct);
  } catch (error) {
    return res.status(400).json({ error: "err with creating data " + error });
  }
};

export const getProducts = async (req, res) => {
  try {
    const Products = await ProductModel.find();
    return res.status(200).json(Products);
  } catch (error) {
    return res.status(400).json({ error: "err with getting data " + error });
  }
};

export const getProduct = async (req, res) => {
  try {
    const Product = await ProductModel.findById(req.params.productId);
    return res.status(200).json(Product);
  } catch (error) {
    return res
      .status(400)
      .json({ error: "err with getting one product " + error });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { _id: req.params.productId },
      { name, quantity },
      { new: true }
    );
    if (updatedProduct) return res.status(200).json({ status: "Updated" });
    return res.status(401).json({ status: "No Product Found" });
  } catch (error) {
    return res
      .status(400)
      .json({ error: "err with updating one product " + error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.productId);
    return res.status(200).json({ status: "Deleted" });
  } catch (error) {
    return res.status(400).json({ error: "err with deleting data " + error });
  }
};
