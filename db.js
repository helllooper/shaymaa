const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://EmadHassan:emad1987emad@cluster0.fzd4l.mongodb.net/emad?retryWrites=true&w=majority", {
            useUnifiedTopology:true,
            useNewUrlParser:true,
            useCreateIndex:true
        })
        console.log(`MongoDB connected: ${conn.connection.host}`)
    }
    catch(error){
        console.error(`Error: ${error.message}`)
        process.exit(1);
    }
}

module.exports = connectDB