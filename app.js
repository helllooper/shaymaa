const express = require("express");
const app = express();
const connectDB = require("./db");
const articleRoutes = require("./routes/articleRoutes")
const usersRoutes = require("./routes/userRoutes")
const videoRoutes = require("./routes/videoRoutes");
const dotenv = require("dotenv");
const {notFound, errorHandler} = require("./middlewares/errorMiddleware")

dotenv.config();
connectDB();
app.use(express.json());
// app.use(express.urlencoded({
//     extended:true
// }))
app.use("/api/articles", articleRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/videos", videoRoutes);

if(process.env.NODE_ENV === "production"){
    console.log("production");
    app.use(express.static(path.join(__dirname, "/frontend/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
    })
} else {
    app.get("/" , (req, res) => {
        res.send("API is running ...")
    })
}

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running on port ${PORT}`));