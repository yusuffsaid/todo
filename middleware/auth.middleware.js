const JWT = require("jsonwebtoken");
const CustomError = require("../helper/Error.helper");

const getAccessToRoute = (req, res, next) => {
  const { JWT_SECRET_KEY } = process.env;

  !isTokenIncluded(req) && next(new CustomError("Hatalı giriş", 401));

  const token = getAccesTokenFromHeader(req);

  JWT.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    err && next(new CustomError("Lütfen tekrar giriş yapmayı deneyiniz", 404));

    req.user = decoded;
  });

  next();
};

const isTokenIncluded = (req) => {
  return (
    req.headers.authorization && req.headers.authorization.startsWith("Bearer")
  );
};

const getAccesTokenFromHeader = (req) => {
  const authorization = req.headers.authorization;

  const accesToken = authorization.split(" ")[1];

  return accesToken;
};

module.exports = getAccessToRoute;
