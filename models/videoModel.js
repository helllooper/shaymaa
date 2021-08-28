const User = require("./userModel");
const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    brief:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    filename:{
        type:String
    },
    date:{
        type: Date, 
        default: Date.now,
        required:true
    }

});

videoSchema.pre('remove', async function(){
    await User.update({}, { $pull: { videos: { $in: this._id } } }, { multi: true });
});

module.exports = mongoose.model("Video", videoSchema);