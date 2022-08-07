import chapterModel from "../models/chapter.model";
import storyModel from "../models/story.model";
import { Request, Response } from "express";

export const createChapter = async (req: Request, res: Response) => {
  try {
    // get the storyId
    const storyId = req.params.storyId;

    // check if the story exist
    const story = await storyModel.findById(storyId);

    // if there's no story
    if (!story) {
      return res.status(404).json({ err: "There is no Story" });
    }

    const newChapter = new chapterModel({
      title: req.body.title,
      content: req.body.content,
      story: storyId,
      part: req.body.part,
    });
    const savedChapter = await newChapter.save();
    return res.status(201).json(savedChapter);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getChapters = async (req: Request, res: Response) => {
  try {
    const chapters = await chapterModel.find().populate("story");

    return res.status(200).json(chapters);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getChaptersByStory = async (req: Request, res: Response) => {
  try {
    const storyId = req.params.storyId;

    const chapters = await chapterModel
      .find({ story: storyId })
      .populate("story");

    return res.status(200).json(chapters);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getChapter = async (req: Request, res: Response) => {
  const id = req.params.chapterId;
  try {
    const chapter = await chapterModel.findById(id).populate("story");

    return res.status(200).json(chapter);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const deleteChapter = async (req: Request, res: Response) => {
  const id = req.params.chapterId;
  try {
    const chapter = await chapterModel.findByIdAndDelete(id);
    return res.status(200).json(chapter);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const updateChapter = async (req: Request, res: Response) => {
  const id = req.params.chapterId;
  try {
    const chapter = await chapterModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(chapter);
  } catch (err) {
    return res.status(500).json(err);
  }
};
