const express = require("express");
const asyncHandler = require("express-async-handler");
const Video = require("../models/videoModel");
const User = require("../models/userModel");
const {isAdmin, protect } = require("../middlewares/authMiddleware")
const multer  = require('multer');
const path = require("path");
const {storage, cloudinary} = require("../cloudinary")
const upload = multer({ fileFilter, storage });
const router = express.Router();
const { check, validationResult } = require('express-validator');
var validator = require('youtube-validator')

function fileFilter (req, file, cb) {
    const {title, brief} = req.body;
    if(!title){
        console.log("no title");
        cb(new Error('قم بكتابة عنوان الفيديو'))
    }
    if (!brief){
        console.log("no brief");
        cb(new Error('قم بكتابة مقدمة الفيديو'))
    }
    cb(null, true);
  }
  
router.post("/", protect, upload.single("video"), asyncHandler(async(req, res) => {
    if(!req.file){
        throw new Error("لا يوجد ملف فيديو للتحميل")
    }
    const user = await User.findById(req.user._id);
    const {title, brief} = req.body;
    const video = new Video({
       title,
       brief,
       url:req.file.path,
       filename:req.file.filename
    })
    const createdVideo = await video.save();
    user.videos.push(createdVideo._id);
    await user.save();
    res.json({
        "message":"Uploaded successfully"
    })
}))

router.post("/youtube",[
    check("title", "قم بكتابة عنوان الفيديو").not().isEmpty(),
    check("brief", "قم بكتابة مقدمة الفيديو").not().isEmpty(),
    check("url", "قم بكتابة رابط الفيديو").not().isEmpty(),
  ], protect, asyncHandler(async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error(errors.array()[0].msg);
    }
    const user = await User.findById(req.user._id);
    const {title, brief, url} = req.body;
    const urlWithoutProtocol = url.replace(/^https?\:\/\//i, "");
    console.log(urlWithoutProtocol);
    validator.validateUrl(urlWithoutProtocol, (response, err) => {
        if(err) {
            throw new Error("رابط فيديو اليوتيوب غير صحيح")
        }
        else{
            const uploadVideo = async() => {
                try{
                    const video = new Video({
                        title,
                        brief,
                        url:url
                     })
                     const createdVideo = await video.save();
                     user.videos.push(createdVideo._id);
                     await user.save();
                     res.json({
                         "message":"Uploaded successfully"
                     })
                }
                catch(error){
                    throw new Error("Server Error");
                }
            }
            uploadVideo();
            
        }  
      })
}))

router.get("/", asyncHandler(async (req, res) => {
    const pageSize = 5;
    const page = req.query.pageNumber || 1;
    let count
    let videos
    if(req.query.keyword){
        count = await Video.aggregate().
        search({
          text: {
            query: req.query.keyword,
            path: ["title", "brief"]
          }
        }).count("count");
        count = count.length > 0 ? count[0].count:0
        videos = await Video.aggregate().
        search({
          text: {
            query: req.query.keyword,
            path: ["title", "brief"]
          }
        }).sort({_id:-1}).limit(pageSize).skip(pageSize * (page - 1));
    } else {
        count = await Video.countDocuments({});
        videos = await Video.find({}, "title brief author url date").sort({_id:-1}).limit(pageSize).skip(pageSize * (page - 1));
    }
    res.json({videos,count,page:parseInt(page)});
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