const asyncErrorHandler = require("express-async-handler");
const CustomError = require("../helper/Error.helper");
const Todo = require("../model/todo.model");
const Group = require("../model/group.model");
const moment = require("moment");
require("moment/locale/tr");

const createTodo = asyncErrorHandler(async (req, res, next) => {
  const information = req.body;

  const todo = await Todo.create({
    ...information,
  });

  if (information.group) {
    const group = await Group.findById(information.group);
    group.todos.push(todo._id);
    await group.save();
  }
  const newTodo = await Todo.findById(todo._id)
    .populate({ path: "user" })
    .populate({ path: "group" });

  res.json({ status: true, newTodo });
});

const deleteTodo = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  await todo.remove();
  res.json({ status: true });
});

const allTodos = asyncErrorHandler(async (req, res, next) => {
  const todo = await Todo.find();

  res.json({
    status: true,
    todos: todo,
  });
});

const oneTodo = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);

  res.json({
    status: true,
    todo,
  });
});
const changeStatus = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.query;
  const todo = await Todo.findById(id);
  todo.status = !todo.status;
  todo.donedate = new Date(Date.now());
  await todo.save();
  res.json({
    status: true,
  });
});

const usersTodo = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const todos = await Todo.find({
    user: id,
  })
    .populate({ path: "group" })
    .populate({ path: "user" });

  res.json({ status: true, todos });
});

module.exports = {
  createTodo,
  deleteTodo,
  allTodos,
  oneTodo,
  changeStatus,
  usersTodo,
};
