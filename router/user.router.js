const express = require("express");
const { getOneUser, searchUser } = require("../controller/user.controller");
const user = express.Router();

user.get("/search", searchUser);
user.get("/:id", getOneUser);

module.exports = user;
