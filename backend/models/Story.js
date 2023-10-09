const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StorySchema = new Schema({
    title:{
        type:String,
        required:true
    },
    cover:{
        type:String
    },    
    content:{
        type:String,
        required:true
    },    
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    }, 

    topics:[{
        type:mongoose.Schema.ObjectId,
        ref:"Topic"
    }],

    likedBy:[{
        type: mongoose.Schema.ObjectId,   
    }],
    
    comments:[{
        type: mongoose.Schema.ObjectId,
        ref:"Comment"
      }],
});
StorySchema.pre('remove', function(next) {
    this.model('Comment').deleteMany({ story: this._id }, (err,res)=>{next(err)});
    this.model("Report").deleteMany({story:this._id},(err,res)=>{next(err)});
    this.model("Notification").deleteMany({story:this._id},(err,res)=>{next(err)});
    this.model("LikedStory").deleteMany({story:this._id},(err,res)=>{next(err)});
    this.model("ReadingList").deleteMany({story:this._id},(err,res)=>{next(err)});
    this.model("SavedStory").deleteMany({story:this._id},(err,res)=>{next(err)});
});
module.exports = mongoose.model("Story", StorySchema);