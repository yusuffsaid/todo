const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require("./user.model");
const Todo = require("./todo.model");

const Group = new Schema({
  title: {
    type: String,
    required: [true, "Lütfen grubunuza bir isim ekleyiniz!"],
  },
  members: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  admin: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  todos: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Todo",
    },
  ],
});

Group.pre("save", async function (next) {
  if (!this.isModified("members")) return next();

  this.members.map(async (member, i) => {
    const user = await User.findById(member);
    if (!user.group.includes(member)) {
      user.group.push(this._id);
      await user.save();
    }
  });
  next();
});

Group.post("remove", async function () {
  this.members.map(async (member) => {
    const user = await User.findById(member);
    const index = user.group.indexOf(this._id);
    user.group.splice(index, 1);
    await user.save();
  });

  const todo = await Todo.find({ group: this._id });
  todo.map(async (m) => {
    await m.remove();
  });
});

module.exports = mongoose.model("Group", Group);
