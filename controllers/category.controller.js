const categoryModel = require("../models/category.model");

const createCategory = async (req, res) => {
  const newCategory = new categoryModel({
    name: req.body.name,
  });
  try {
    const savedCategory = await newCategory.save();
    return res.status(201).json(savedCategory);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    return res.status(200).json(categories);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getCategory = async (req, res) => {
  try {
    // const category = await categoryModel.findById(req.category.id);

    const category = await categoryModel.aggregate([
      { $match: { _id: req.category._id } },
    ]);
    return res.status(200).json(category[0]);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await categoryModel.findByIdAndDelete(req.category.id);
    return res.status(200).json(category);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await categoryModel.findByIdAndUpdate(
      req.category.id,
      req.body,
      {
        new: true,
      }
    );
    return res.status(200).json(category);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.getCategory = getCategory;
module.exports.getCategories = getCategories;
module.exports.createCategory = createCategory;
module.exports.deleteCategory = deleteCategory;
module.exports.updateCategory = updateCategory;
