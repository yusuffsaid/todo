const bcrypt = require("bcrypt");

const loginInputControl = (email, password) => {
  return email && password;
};

const comparePassword = (password, hashpasword) => {
  return bcrypt.compareSync(password, hashpasword);
};

module.exports = {
  loginInputControl,
  comparePassword,
};
