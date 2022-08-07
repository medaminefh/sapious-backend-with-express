import tagModel from "../models/tag.model";
import { Request, Response } from "express";

export const createTag = async (req: Request, res: Response) => {
  console.log(req.body);
  const newTag = new tagModel({
    name: req.body.name,
  });
  try {
    const savedTag = await newTag.save();
    return res.status(201).json(savedTag);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getTags = async (req: Request, res: Response) => {
  try {
    const tags = await tagModel.find();
    return res.status(200).json(tags);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getTag = async (req: Request, res: Response) => {
  const name = req.params.tagName;
  try {
    const tag = await tagModel.findOne({ name });
    return res.status(200).json(tag);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const deleteTag = async (req: Request, res: Response) => {
  const name = req.params.tagName;
  try {
    const tag = await tagModel.findOneAndDelete({ name });
    return res.status(200).json(tag);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const updateTag = async (req: Request, res: Response) => {
  const name = req.params.tagName;
  try {
    const tag = await tagModel.findOneAndUpdate({ name }, req.body, {
      new: true,
    });
    return res.status(200).json(tag);
  } catch (err) {
    return res.status(500).json(err);
  }
};
