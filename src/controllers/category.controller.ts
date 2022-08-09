import categoryModel from "../models/category.model";
import { Request, Response } from "express";

export const createCategory = async (req: Request, res: Response) => {
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

export const getCategories = async (_: Request, res: Response) => {
  try {
    const categories = await categoryModel.find();
    return res.status(200).json(categories);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getCategory = async (req: Request, res: Response) => {
  const name = req.params.categoryName;
  try {
    const category = await categoryModel.findOne({ name });
    return res.status(200).json(category);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const name = req.params.categoryName;
  try {
    const category = await categoryModel.findOneAndDelete({ name });
    return res.status(200).json(category);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const updateCategory = async (req: Request, res: Response) => {
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
