const express = require("express");
const asyncHandler = require("express-async-handler");
const Video = require("../models/videoModel");
const {isAdmin, protect } = require("../middlewares/authMiddleware")
const multer  = require('multer');
const { storage } = require("../cloudinary")
const upload = multer({ storage })
const router = express.Router();

router.post("/", protect, upload.single("video"), asyncHandler(async(req, res) => {
    res.send("test")
}))

module.exports = router;