const jwt = require("jsonwebtoken");
const Userdb = require("../models/User");
const AppError = require("../utils/error");

exports.Verify = async (req, res, next) => {
  var token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("Please login to continue further", 400));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const User = await Userdb.findById(decoded.id).populate({
      path: "unseennotice",
      select: "sender",
    });
    if (!User) {
      return next(new AppError(`No User found for ID ${decoded.id} `, 400));
    }
    User.password = null;
    req.user = User;
    next();
  } catch (err) {
    return next(new AppError(err.message, 403));
  }
};
