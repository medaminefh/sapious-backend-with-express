const router = require("express").Router();
const {
  getUser,
  getUsers,
  deleteUser,
  updateUser,
} = require("../controllers/user.controller");

router.get("/", getUsers);
router.get("/:userId", getUser);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

module.exports = router;
