const express = require("express");
const app = express();
const connectDB = require("./db");
const articleRoutes = require("./routes/articleRoutes")

connectDB();
app.use(express.json());
app.use("/api/articles", articleRoutes);

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running on port ${PORT}`));