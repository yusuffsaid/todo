const asyncErrorHandler = require("express-async-handler");
const { sendJWTToCookie } = require("../helper/auth.helper");
const CustomError = require("../helper/Error.helper");
const {
  loginInputControl,
  comparePassword,
} = require("../helper/getData.helper");

const User = require("../model/user.model");

const register = asyncErrorHandler(async (req, res, next) => {
  const information = req.body;
  const user = await User.create({
    ...information,
    name: information.name.replace(/\w\S*/g, (w) =>
      w.replace(/^\w/, (c) => c.toUpperCase())
    ),
    profil_img:
      "https://ui-avatars.com/api/?background=random&name=" + information.name,
  });
  sendJWTToCookie(user, res);
});

const login = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!loginInputControl(email, password)) {
    return next(
      new CustomError("Lütfen bir kullanıcı adı ve şifre giriniz", 400)
    );
  }
  const user = await User.findOne({ email: email }).select("+password");
  if (!user) {
    return next(new CustomError("Böyle bir kullanıcı yok", 401));
  }
  if (!comparePassword(password, user.password)) {
    return next(
      new CustomError("Hatalı bir şifre girdiniz lütfen tekrar deneyiniz", 400)
    );
  }

  sendJWTToCookie(user, res);
});

const logout = (req, res, next) => {
  const { NODE_ENV } = process.env;
  res
    .cookie("access_token", " ", {
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: NODE_ENV === "development" ? false : true,
    })
    .json({ status: true });
};

module.exports = {
  register,
  login,
  logout,
};
