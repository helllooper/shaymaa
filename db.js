const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://EmadHassan:emad1987emad@cluster0-shard-00-00.fzd4l.mongodb.net:27017,cluster0-shard-00-01.fzd4l.mongodb.net:27017,cluster0-shard-00-02.fzd4l.mongodb.net:27017/emad?ssl=true&replicaSet=atlas-13t4vf-shard-0&authSource=admin&retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
        // const conn = await mongoose.connect("mongodb+srv://EmadHassan:emad1987emad@cluster0.fzd4l.mongodb.net/emad?retryWrites=true&w=majority", {
        //     useUnifiedTopology:true,
        //     useNewUrlParser:true,
        //     useCreateIndex:true
        // })
        console.log(`MongoDB connected: ${conn.connection.host}`)
    }
    catch(error){
        console.error(`Error: ${error.message}`)
        process.exit(1);
    }
}

module.exports = connectDB