import storyModel from "../models/story.model";
import { Request, Response } from "express";

export const createStory = async (req: Request, res: Response) => {
  const newStory = new storyModel({
    title: req.body.title,
    description: req.body.description,
    cover: req.body.cover,
    category: req.body.category,
    tags: req.body.tags,
    targetAudience: req.body.targetAudience,
    language: req.body.language,
    author: req.body.author,
  });
  try {
    const savedStory = await newStory.save();
    return res.status(201).json(savedStory);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getStories = async (req: Request, res: Response) => {
  try {
    const stories = await storyModel.find().populate("author");

    return res.status(200).json(stories);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getStory = async (req: Request, res: Response) => {
  const id = req.params.storyId;
  try {
    // Increment the READS and VIEWS
    const storyAfterINC = await storyModel
      .findOneAndUpdate(
        { _id: id },
        { $inc: { views: 1, reads: 1 } },
        { new: true }
      )
      .populate("categories")
      .populate("tags");

    return res.status(200).json(storyAfterINC);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const deleteStory = async (req: Request, res: Response) => {
  const id = req.params.storyId;
  try {
    const story = await storyModel.findByIdAndDelete(id);
    return res.status(200).json(story);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const updateStory = async (req: Request, res: Response) => {
  const id = req.params.productId;
  try {
    const story = await storyModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(story);
  } catch (err) {
    return res.status(500).json(err);
  }
};

/*  const getStoriesByCategory = async  (req: Request, res: Response) => {
  const id = req.params.categoryId;

  try {
    const products = await storyModel
      .find({ category: id })
      .populate("category");
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json(err);
  }
};  */
