const asyncErrorHandler = require("express-async-handler");
const CustomError = require("../helper/Error.helper");

const User = require("../model/user.model");

const getOneUser = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json({ status: true, user });
});

const searchUser = asyncErrorHandler(async (req, res, next) => {
  const name = req.query.name;
  const users = await User.find({ name: new RegExp(name, "i") });

  res.json({ success: true, users });
});

module.exports = { getOneUser, searchUser };
