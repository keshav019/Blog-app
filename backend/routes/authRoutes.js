const express = require("express");
const router = express.Router();
const { login, signup, getProfile } = require("../controllers/authController");
const { Verify } = require("../middleware/authMiddleware");

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/me").get(Verify, getProfile);

module.exports = router;
