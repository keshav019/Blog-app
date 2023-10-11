const express = require("express");
const router = express.Router();
const {addBlog,addComment,deleteBlog,getBlog,getBlogs,likeBlog,searchBlog,updateBlog,updateComment,userIntrest } = require("../controllers/blogController.js");
const { Verify } = require("../middleware/authMiddleware");

router.route("/add").post(Verify, addBlog);
router.route("/:id").put(Verify, updateBlog);
router.route("/:id").delete(Verify, deleteBlog);
router.route("").get(Verify, getBlogs);
router.route("/user-interest").get(Verify, userIntrest);
router.route("/search").get(Verify, searchBlog);

module.exports = router;


