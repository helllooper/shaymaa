const express = require("express");
const asyncHandler = require("express-async-handler");
const Video = require("../models/videoModel");
const {isAdmin, protect } = require("../middlewares/authMiddleware")
const multer  = require('multer');
const { storage, cloudinary } = require("../cloudinary")
const upload = multer({ storage })
const router = express.Router();

router.post("/", protect, upload.single("video"), asyncHandler(async(req, res) => {
    if(req.file === null){
        return res.status(400).json({"message":"No file uploaded"})
    }
    const {title, brief} = req.body;
    console.log(req.file)
    const video = new Video({
       title,
       brief,
       url:req.file.path,
       filename:req.file.filename
    })
    await video.save(); 
    res.json({
        "message":"Uploaded successfully"
    })
}))

router.post("/youtube", protect, asyncHandler(async(req, res) => {
    const {title, brief, url} = req.body;
    const video = new Video({
       title,
       brief,
       url:url
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

router.delete("/:id", isAdmin, asyncHandler(async (req, res) => {
    const video = await Video.findById(req.params.id);
    if(!video){
        res.status(404);
        throw new Error("Video is not found")
    }
    if(video.filename){
        await cloudinary.uploader.destroy(video.filename);
    }
    await video.remove();
    res.json({message : "Video is removed"})
}))

router.get("/:id", isAdmin, asyncHandler(async(req, res) => {
    const video = await Video.findById(req.params.id,"title brief")
    if(video){
        res.json(video);
    }else {
        res.status(404)
        throw new Error("Video is not found")
    }
}))

router.put("/:id", isAdmin, asyncHandler(async(req, res) => {
    const {title, brief} = req.body
    const video = await Video.findById(req.params.id);
    if(video){
        video.title = title;
        video.brief = brief;
        await video.save();
        res.json({message:"Video is edited"});
    } else {
        res.status(404);
        throw new Error("Video is not found");
    }
}))

module.exports = router;