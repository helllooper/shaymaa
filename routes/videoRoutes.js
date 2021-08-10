const express = require("express");
const asyncHandler = require("express-async-handler");
const Video = require("../models/videoModel");
const {isAdmin, protect } = require("../middlewares/authMiddleware")
const multer  = require('multer');
const { storage } = require("../cloudinary")
const upload = multer({ storage })
const router = express.Router();

router.post("/", protect, upload.single("video"), asyncHandler(async(req, res) => {
    if(req.file === null){
        return res.status(400).json({"message":"No file uploaded"})
    }
    const {title, brief} = req.body;
    conosle.log(req.file)
    const video = new Video({
       title,
       brief,
       publicId:req.file.publicId
    })
    await video.save(); 
    res.json({
        "message":"Uploaded successfully"
    })
}))

router.get("/", asyncHandler(async (req, res) => {
    const pageSize = 5;
    const page = req.query.pageNumber || 1;
    const count = await Video.countDocuments();
    const videos = await Video.find({}).limit(pageSize).skip(pageSize * (page - 1));
    res.json({videos, page, pages:Math.ceil(count / pageSize)});
}))

module.exports = router;