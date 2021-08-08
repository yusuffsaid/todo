const sendJWTToCookie = (user, res) => {
  const token = user.createJWTFromUser();

  const NODE_ENV = process.env.NODE_ENV;
  res
    .cookie("access_token", token, {
      httpOnly: false,
      expires: new Date(Number(new Date()) + 315360000000),
      secure: NODE_ENV === "development" ? false : true,
    })
    .status(200)
    .json({
      status: true,
      user: user,
    });
};

module.exports = {
  sendJWTToCookie,
};
