const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    story: {
        type: mongoose.Schema.ObjectId,
        ref: "Story"
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Comment", CommentSchema);
