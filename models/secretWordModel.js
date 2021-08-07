const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const secretWordSchema = mongoose.Schema({
    word:{
        type:String,
        required:true
    }
})

secretWordSchema.methods.matchSecretWords = async function(enteredSecretWord){
    return await bcrypt.compare(enteredSecretWord, this.word);
}

secretWordSchema.pre("save", async function(next){
    if(!this.isModified("word")){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.word = await bcrypt.hash(this.word, salt)
})

module.exports = mongoose.model("SecretWord", secretWordSchema);