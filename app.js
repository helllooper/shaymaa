const express = require("express");
const app = express();
const connectDB = require("./db");
const articleRoutes = require("./routes/articleRoutes")
const usersRoutes = require("./routes/userRoutes")
const dotenv = require("dotenv");

dotenv.config();
connectDB();
app.use(express.json());
app.use("/api/articles", articleRoutes);
app.use("/api/users", usersRoutes);

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running on port ${PORT}`));