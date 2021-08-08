const express = require("express");
const todo = express.Router();

const {
  createTodo,
  deleteTodo,
  allTodos,
  oneTodo,
  changeStatus,
  usersTodo,
} = require("../controller/todo.controller.js");

todo.post("/create", createTodo);

todo.delete("/:id", deleteTodo);

todo.get("/userstodo/:id", usersTodo);

todo.get("/", allTodos);

todo.get("/changestatus", changeStatus);

// todo.get("/:id", oneTodo);

module.exports = todo;
