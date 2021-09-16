const express = require("express");
const asyncHandler = require("express-async-handler");
const Author = require("../models/authorModel");
const Article = require("../models/articlesModel");
const { isAdmin  } = require("../middlewares/authMiddleware")
const User = require("../models/userModel");
const multer  = require('multer');
const {authorsPicsStorage, cloudinary} = require("../cloudinary")
const upload = multer({ fileFilter, storage:authorsPicsStorage });


function fileFilter (req, file, cb) {
    const {name, cv} = req.body;
    if(!name){
        console.log("no title");
        cb(new Error('قم بكتابة اسم الكاتب'))
    }
    if (!cv){
        console.log("no brief");
        cb(new Error('قم بكتابة تعريف عن الكاتب '))
    }
    cb(null, true);
  }

const router = express.Router();

router.get("/", asyncHandler(async (req, res) => {
    console.log("Authors list")
    const authors = await Author.find({}, "name")
    res.json({authors});
}))

router.post("/", isAdmin, upload.single("image"), asyncHandler(async(req, res) => {
    if(!req.file){
        throw new Error("قم بتحميل صورة للكاتب")
    }
    const {name, cv} = req.body;
    const author = new Author({
       name,
       cv,
       url:req.file.path,
       filename:req.file.filename
    })
    await author.save();
    res.json({
        "message":"Uploaded successfully"
    })
}))

router.delete("/:id", isAdmin, asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    if(!author){
        res.status(404);
        throw new Error("Author is not found")
    }
    await cloudinary.uploader.destroy(author.filename);
    if(author.articles && author.articles.length > 0){
        for (article of author.articles) {
            const authorsArticle = await Article.findById(article._id);
            await authorsArticle.remove();
          }
    }
    await author.remove();
    res.json({message : "Author is removed"})
}))

router.get("/:id", asyncHandler(async(req, res) => {
    const author = await Author.findById(req.params.id, "name cv url")
    if(!author) {
        throw new Error("Author not found");
    }
    res.json({author})
}))

router.get("/:id/articles", asyncHandler(async(req, res) => {
    const pageSize = 5;
    const page = req.query.pageNumber || 1;
    const author = await Author.findById(req.params.id);
    const count = author.articles ? author.articles.length : 0
    const articles = await Author.findById(req.params.id).populate({path:"articles", select:"-text", options: { sort: {_id:-1}, limit:pageSize, skip:pageSize * (page - 1)}})
    console.log(page);
    res.json({name:author.name, articles:articles.articles,count, page:parseInt(page)});
}))

router.get("/:id/latestArticle" , asyncHandler(async(req, res) => {
    const latestArticle = await Author.findById(req.params.id).populate({path:"articles", select:"-text", options: { sort: {_id:-1}, limit:1}})
    console.log(latestArticle.articles);
    if(latestArticle.articles.length !== 0){
        res.json({article:latestArticle.articles[0]});
    }else {
        res.json({"message":"لا يوجد مقالات للكاتب بعد"})
    }
}))

router.put("/:id", isAdmin, upload.single("image"), asyncHandler(async(req, res) => {
    const {name, cv} = req.body
    const author = await Author.findById(req.params.id);
    if(author){
        author.name = name;
        author.cv = cv;
        author.url = req.file ? req.file.path:author.url
        author.filename = req.file ? req.file.filename:author.filename
        await author.save();
        res.json({message:"Author is edited"});
    } else {
        res.status(404);
        throw new Error("Author is not found");
    }
}))

module.exports = router;