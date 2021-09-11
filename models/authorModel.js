const mongoose = require("mongoose");

const authorSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    articles:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Article"
    }]
})

module.exports = mongoose.model("Author", userSchema);