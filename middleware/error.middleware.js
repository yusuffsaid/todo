const errorHandling = (err, req, res, next) => {
  console.log(err);
  res.json({
    status: false,
    message: err.message,
  });
};

module.exports = errorHandling;
