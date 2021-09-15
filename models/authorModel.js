const mongoose = require("mongoose");

const authorSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    cv:{
        type:String,
        required:true,
        unique:true
    },
    url:{
        type:String,
        required:true
    },
    filename:{
        type:String,
        required:true
    },
    articles:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Article"
    }]
})

module.exports = mongoose.model("Author", authorSchema);