module.exports = function (req, res, next) {
  try {
    if (req.user.id !== req.story.author.toString())
      return res.status(403).json("You're not the Owner of this story");

    next();
  } catch (error) {
    return res.status(500).json(error);
  }
};
