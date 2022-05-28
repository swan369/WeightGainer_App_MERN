const User = require("../models/users");

const createUser = async (req, res, next) => {
  try {
    const createdUser = await User.create(req.body);
    res.status(201).json({ message: createdUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserByIdAndUpdate = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params, req.body);
    res.status(200).json({ updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserByIdAndDelete = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params);
    res.status(200).json({ deletedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createUser = createUser;
exports.getAllUsers = getAllUsers;
exports.getUserByIdAndUpdate = getUserByIdAndUpdate;
exports.getUserByIdAndDelete = getUserByIdAndDelete;
