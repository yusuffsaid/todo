const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user.model");
const Todo = new Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    todo: {
      type: String,
      required: [true, "Lütfen bir görev ekleyiniz!"],
    },
    group: {
      type: mongoose.Schema.ObjectId,
      ref: "Group",
    },
    status: {
      type: Boolean,
      default: false,
    },
    deadline: {
      type: Date,
    },
    adding: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    donedate: {
      type: Date,
    },
  },
  { timestamps: true }
);

Todo.pre("save", async function (next) {
  if (!this.isModified("user")) return next();
  const user = await User.findById(this.user);
  user.todo.push(this._id);
  await user.save();
  next();
});

Todo.post("remove", async function () {
  const user = await User.findById(this.user);
  const index = user.todo.indexOf(this._id);
  user.todo.splice(index, 1);
  await user.save();
});

module.exports = mongoose.model("Todo", Todo);
