import express from "express";

import {
  getUser,
  getUsers,
  deleteUser,
  updateUser,
} from "../controllers/user.controller";

const router = express.Router();

router.get("/", getUsers);
router.get("/:userId", getUser);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

export default router;
