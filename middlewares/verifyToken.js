const jwt = require("jsonwebtoken");

module.exports = function verifyToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) return res.status(400).json("You're not allowed!");

  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(403).json(error);
  }
};
