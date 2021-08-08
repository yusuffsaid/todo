const express = require("express");
const {
  createGroup,
  addMember,
  deleteGroup,
  getGroup,
  usersGroup,
} = require("../controller/group.controller");
const group = express.Router();

group.post("/create", createGroup);
group.post("/addmember/:id", addMember);
group.get("/usergroup/:id", usersGroup);
group.delete("/:id", deleteGroup);
group.get("/:id", getGroup);

module.exports = group;
