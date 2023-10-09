const User = require("../models/User");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/error");
const { validateEmail, validatePassword, isTokenExpired } = require("../utils/validator");
const { generateOTP } = require("../utils/otp");
const { sendMail } = require("../service/EmailService");

exports.signup = async (req, res, next) => {
  try {
    let { firstname, lastname, email, password, bio } = req.body;
    if (!firstname || !lastname || !email || !password) {
      return next(new AppError("Please fill all fields", 400));
    }

    validateEmail(email);
    validatePassword(password);

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });
    var user;

    if (existingUser && existingUser.enabled) {
      return next(new AppError("Email is already registered", 400));
    }
    else if (existingUser && !existingUser.enabled) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      existingUser.password = hashedPassword;
      existingUser.firstname = firstname;
      existingUser.lastname = lastname;
      existingUser.email = email;
      existingUser.otp = generateOTP();
      existingUser.bio = bio;
      existingUser.updated_at = new Date();
      user = await existingUser.save();
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user = await User.create({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        otp: generateOTP(),
        bio
      });
    }
    sendMail(user.otp, email, firstname);
    res.status(200).json({
      firstname,
      lastname,
      email,
      userId: user._id,
    });
  } catch (err) {
    return next(err.message, 500);
  }
};

exports.login = async (req, res, next) => {
  try {
    let { password, email } = req.body;
    if (!email || !password) {
      return next(new AppError("Please fill your credentials", 400));
    }
    validateEmail(email);
    validatePassword(password);
    let user = await User.findOne({ email: email });
    if (!user || !user.enabled) {
      return next(new AppError("User not found", 404));
    }
    const correct = await user.checkPassword(password);
    if (!correct) {
      return next(new AppError("Password is incorrect", 403));
    }
    const token = user.getJwtToken();
    res.status(200).json({
      token,
      firstname: user.firstname,
      lastname: user.lastname,
      email,
      userId: user._id,
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

exports.getProfile = async (req, res) => {
  const { _id, firstname, lastname, email, bio, followers, following, stories } = req.user;
  return res.status(200).json({
    user: {
      userId: _id,
      firstname,
      lastname,
      email,
      bio,
      followers,
      following,
      stories
    }
  });
};

exports.updateProfile = async (req, res, next) => {
  const { firstname, lastname, bio } = req.body;
  var user = req.user;
  try {
    user.firstname = firstname;
    user.lastname = lastname;
    user.bio = bio;
    await User.updateOne({ _id: user._id }, { firstname, lastname, bio });
    user = await User.findOne({ _id: user._id });
    return res.status(200).json({
      user: {
        userId: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        intrest: user.intrest,
        bio: user.bio,
        stories: user.stories
      }
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }

}

exports.verifyEmail = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(new AppError(`User Not Exist with email: ${email}`, 404));
    }

    if (isTokenExpired(user.updated_at)) {
      return next(new AppError("OTP Expired !", 404));
    }
    if (!user.otp || user.otp !== otp) {
      return next(new AppError("Please Enter correct OTP !", 404));
    }

    user.enabled = true;
    user.otp = null;
    await user.save();
    res.status(200).json({ 'message': "Email verified !" });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};


exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email }).exec();

    if (!user) {
      throw new Error(`User Not Exist with email: ${email}`);
    }

    const otp = generateOTP();
    user.otp = otp;
    user.updated_at = new Date();
    await user.save();
    sendMail(user.otp, email, user.firstname);
    return res.status(200).json({ 'message': "OTP Sent !" });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
}

exports.resetPassword = async (req, res, next) => {
  const { password, email, otp } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error(`User Not Exist with email: ${email}`);
    }

    if (isTokenExpired(user.updated_at)) {
      return next(new AppError("OTP Expired !", 404));
    }
    console.log(!user.otp || user.otp !== otp);
    if (!user.otp || user.otp !== otp) {
      throw new Error("Please Enter correct OTP!", 404);
    }

    user.enabled = true;
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    return res.status(200).json({ 'message': "Password Updated" });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
}

