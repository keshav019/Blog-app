const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StorySchema = new Schema({
    title:{
        type:String,
        required:true
    },    
    content:{
        type:String,
        required:true
    },    
    author:{
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
blogSchema.index({ title: 'text', content: 'text' });
StorySchema.pre('remove', function(next) {
    this.model('Comment').deleteMany({ story: this._id }, (err,res)=>{next(err)});
});
module.exports = mongoose.model("Story", StorySchema);