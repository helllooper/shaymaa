const User = require("./userModel");
const mongoose = require("mongoose");

const articlesSchema = new mongoose.Schema({
  
    title:{
        type:String,
        required:true
    },
    brief:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    date:{
        type: Date, 
        default: Date.now,
        required:true
    }

});

articlesSchema.pre('remove', async function(){
    await User.update({}, { $pull: { articles: { $in: this._id } } }, { multi: true });
});

module.exports = mongoose.model("Article", articlesSchema);