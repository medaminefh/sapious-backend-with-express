module.exports = function (req, res, next) {
  try {
    if (req.user.id !== req.comment.user.toString())
      return res.status(403).json("You're not the Owner of this comment");

    next();
  } catch (error) {
    return res.status(500).json(error);
  }
};
