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

module.exports = mongoose.model("Article", articlesSchema);