const express = require("express");
const router = express.Router();
const { login, signup, getProfile, updateProfile, verifyEmail, forgotPassword, resetPassword } = require("../controllers/authController");
const { Verify } = require("../middleware/authMiddleware");

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/profile/get").get(Verify, getProfile);
router.route("/profile/update").put(Verify, updateProfile);
router.route("/verify-email").put(verifyEmail);
router.route("/forgot-password").put(forgotPassword);
router.route("/reset-password").put(resetPassword);

module.exports = router;
