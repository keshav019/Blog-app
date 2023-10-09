const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  firstname: {
    type: String,
    required: [true, "Your fullname"],
    trim: true,
  },
  lastname: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
  },
  enabled: {
    type: Boolean,
    default: false
  },
  otp: {
    type: String
  },
  bio: String,
  intrest: [{ type: mongoose.Schema.ObjectId, ref: "Topic" }],
  stories: [{ type: mongoose.Schema.ObjectId, ref: "Story" }],
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});

userSchema.methods.getJwtToken = function () {
  return jwt.sign(
    { userId: this._id, tempid: this.tempid },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};
userSchema.methods.updatePassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash(password, salt);
  this.password = pass;
};
userSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.pre("remove", function (next) {
  this.model("Comment").deleteMany({ user: this._id }, (err, res) => {
    next(err);
  });
  this.model("Story").deleteMany({ author: this._id }, (err, res) => {
    next(err);
  });
});
module.exports = mongoose.model("User", userSchema);
