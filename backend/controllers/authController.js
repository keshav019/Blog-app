const User = require("../models/User");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/error");

exports.signup = async (req, res, next) => {
  try {
    // Extract information from req body
    let { fullname, username, email, password } = req.body;
    //Check all required information is filled or not
    if (!fullname || !username || !email || !password) {
      return next(new AppError("Please fill all fields", 400));
    }
    if (/^[a-z0-9]+$/i.exec(username) == null) {
      return next(
        new AppError("username should only contain letter and digit", 400)
      );
    }
    if (username.length < 7) {
      return next(
        new AppError("username should contain atleast 7 characters", 400)
      );
    }
    if (
      username == "trending" ||
      username == "newstory" ||
      username == "stories"
    ) {
      return next(new AppError("This username is not available", 400));
    }
    //regex for email

    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(String(email).toLowerCase())) {
      return next(new AppError("Email is invalid", 400));
    }

    const checkIfEmailAlreadyRegistered = await User.findOne({
      email: email.toLowerCase(),
    });
    if (checkIfEmailAlreadyRegistered) {
      return next(new AppError("Email is already registered", 400));
    }

    const checkIfUsernameTaken = await User.findOne({ username });
    if (checkIfUsernameTaken) {
      return next(new AppError("Username is already taken", 400));
    }

    //verify password length

    if (password.length < 6 || password.length > 12) {
      return next(new AppError("Password length should be in range 6-12", 400));
    }

    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(password, salt);
    const user = await User.create({
      fullname,
      username,
      email,
      password: pass,
    });
    const token = user.getJwtToken();

    res.status(200).json({
      success: true,
      token: token,
      authdata: ({
        avatar,
        username,
        fullname,
        email,
        _id,
        website,
        bio,
        cover,
      } = user),
    });
  } catch (e) {
    return next(err.message, 500);
  }
};

exports.login = async (req, res, next) => {
  try {
    let { password, email } = req.body;
    let user;
    if (!email || !password) {
      return next(new AppError("Please fill your credentials", 400));
    }
    if (email.indexOf("@") > -1) {
      user = await User.findOne({ email: email.toLowerCase() });
    } else {
      user = await User.findOne({ username: email });
    }
    if (!user) {
      return next(new AppError("User not found", 404));
    }
    const correct = await user.checkPassword(password);

    if (!correct) {
      return next(new AppError("Password is incorrect", 400));
    }
    const token = user.getJwtToken();
    res.status(200).json({
      success: true,
      token: token,
      authdata: ({
        avatar,
        username,
        fullname,
        email,
        _id,
        website,
        bio,
        cover,
      } = user),
    });
  } catch (e) {
    return next(new AppError(err.message, 500));
  }
};

exports.getProfile = async (req, res, next) => {
  const { avatar, username, fullname, email, _id, website, bio, cover } =
    req.user;
  return res.status(200).json({
    success: true,
    data: { avatar, username, fullname, email, _id, website, bio, cover },
  });
};
