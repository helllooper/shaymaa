const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    articles:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Article"
    }],
    videos:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Video"
    }],
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    }
})

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

module.exports = mongoose.model("User", userSchema);

