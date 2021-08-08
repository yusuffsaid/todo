const express = require("express");
const getAccessToRoute = require("../middleware/auth.middleware");
const auth = require("./auth.router");
const group = require("./group.router");
const todo = require("./todo.router");
const user = require("./user.router");
const router = express.Router();

router.use("/auth", auth);
router.use("/todo", getAccessToRoute, todo);
router.use("/user", user);
router.use("/group", getAccessToRoute, group);

module.exports = router;
