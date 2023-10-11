const jwt = require("jsonwebtoken");
const Userdb = require("../models/User");
const AppError = require("../utils/error");

exports.Verify = async (req, res, next) => {
  var token;
  console.log("token");
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("Please login to continue further", 400));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Userdb.findById(decoded.userId);
    if (!user) {
      return next(new AppError(`No User found for ID ${decoded.userId} `, 400));
    }
    user.password = null;
    req.user = user;
    next();
  } catch (err) {
    return next(new AppError(err.message, 403));
  }
};
