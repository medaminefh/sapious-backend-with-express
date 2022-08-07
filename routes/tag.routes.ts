import express from "express";

import {
  createTag,
  getTag,
  getTags,
  deleteTag,
  updateTag,
} from "../controllers/tag.controller";

const router = express.Router();

router.post("/", createTag);
router.get("/", getTags);
router.get("/:tagName", getTag);
router.delete("/:tagName", deleteTag);
router.put("/:tagName", updateTag);

export default router;
