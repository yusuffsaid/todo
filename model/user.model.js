const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = new Schema(
  {
    name: {
      type: String,
      required: [true, "Lütfen isminizi giriniz!"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Lütfen geçerli bir email adresi giriniz",
      ],
    },
    password: {
      type: String,
      minLenght: [6, "Lütfen geçerli bir şifre adresi giriniz"],
      required: [true, "Lütfen geçerli bir şifre adresi giriniz"],
      select: false,
    },
    profil_img: {
      type: String,
      default: "default.png",
    },
    group: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Group",
      },
    ],
    todo: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Todo",
      },
    ],
    notification: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Notification",
      },
    ],
  },
  { timestamps: true }
);
User.methods.createJWTFromUser = function () {
  const { JWT_EXPIRE, JWT_SECRET_KEY } = process.env;

  const payload = {
    id: this._id,
    name: this.name,
  };

  const token = JWT.sign(payload, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRE,
  });

  return token;
};

User.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next();

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next();

      this.password = hash;

      next();
    });
  });
});

module.exports = mongoose.model("User", User);
