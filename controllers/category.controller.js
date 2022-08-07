const categoryModel = require("../models/category.model");

const createCategory = async (req, res) => {
  console.log(req.body);
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
  const name = req.params.categoryName;
  try {
    const category = await categoryModel.findOne({ name });
    return res.status(200).json(category);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const deleteCategory = async (req, res) => {
  const name = req.params.categoryName;
  try {
    const category = await categoryModel.findOneAndDelete({ name });
    return res.status(200).json(category);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateCategory = async (req, res) => {
  const name = req.params.categoryName;
  try {
    const category = await categoryModel.findOneAndUpdate({ name }, req.body, {
      new: true,
    });
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
