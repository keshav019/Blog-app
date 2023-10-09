const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema({
    name:String,   
    description:String,
})
module.exports = mongoose.model("Topic",TopicSchema);