const asyncErrorHandler = require("express-async-handler");
const CustomError = require("../helper/Error.helper");

const Group = require("../model/group.model");
const User = require("../model/user.model");

const createGroup = asyncErrorHandler(async (req, res, next) => {
  console.log(req.user.id);
  const information = req.body;

  const newGroup = await Group.create({ ...information });

  const group = await Group.findById(newGroup._id).populate({
    path: "members",
  });

  res.json({
    status: true,
    group,
  });
});

const addMember = asyncErrorHandler(async (req, res, next) => {
  const groupID = req.params.id;
  const members = req.body;
  console.log(members);
  const group = await Group.findByIdAndUpdate(
    groupID,
    {
      members: members.members,
    },
    { new: true }
  )
    .populate({ path: "members" })
    .exec(function (err, post) {
      if (err) next(new CustomError("Üye eklerken birşeyler ters gitti.", 401));
      res.json({ status: true, post });
    });
});

const deleteGroup = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  const group = await Group.findById(id);

  await group.remove();

  res.json({
    status: true,
  });
});

const getGroup = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  const group = await Group.findById(id).populate({ path: "members" });

  res.json({
    status: true,
    group,
  });
});

const usersGroup = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const group = await Group.find({
    members: id,
  })
    .populate({ path: "members" })
    .populate({ path: "todos", populate: { path: "user" } });

  res.json({ status: true, group });
});

module.exports = {
  createGroup,
  addMember,
  deleteGroup,
  getGroup,
  usersGroup,
};
