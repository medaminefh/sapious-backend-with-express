const userModel = require("../models/user.model");

const createUser = async (req, res) => {
  const newUser = new userModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    avatar: req.body.avatar,
    password: req.body.password,
  });
  try {
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getUsers = async (req, res) => {
  try {
    // get all users without their passwords (with the select method)
    const users = await userModel.find().select("-password");
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getUser = async (req, res) => {
  const id = req.params.userId;
  try {
    const user = await userModel.findById(id).select("-password");
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.userId;
  try {
    const user = await userModel.findByIdAndDelete(id);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  const id = req.params.userId;
  try {
    const user = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.getUser = getUser;
module.exports.getUsers = getUsers;
module.exports.createUser = createUser;
module.exports.deleteUser = deleteUser;
module.exports.updateUser = updateUser;
