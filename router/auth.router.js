const express = require("express");
const { register, login, logout } = require("../controller/auth.controller");
const auth = express.Router();

auth.post("/register", register);
auth.post("/login", login);
auth.get("/logout", logout);

module.exports = auth;
