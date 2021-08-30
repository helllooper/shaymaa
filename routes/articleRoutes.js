const express = require("express");
const asyncHandler = require("express-async-handler");
const Article = require("../models/articlesModel");
const { isAdmin, protect } = require("../middlewares/authMiddleware")
const User = require("../models/userModel");
const { check, validationResult } = require('express-validator');

const router = express.Router();

router.get("/", asyncHandler(async (req, res) => {
    const pageSize = 5;
    const page = req.query.pageNumber || 1;
    const keyword = req.query.keyword ? {
        title:{
            $regex:req.query.keyword,
            $options: "i"
        },
        brief:{
            $regex:req.query.keyword,
            $options: "i" 
        }
    }:{}
    const count = await Article.countDocuments({...keyword});
    const articles = await Article.find({...keyword}, "title brief author date").sort({_id:-1}).limit(pageSize).skip(pageSize * (page - 1));
    res.json({articles,count,page:parseInt(page)});
}))

router.post("/", [
    check("title", "قم بكتابة عنوان المقالة").not().isEmpty(),
    check("brief", "قم بكتابة مقدمة المقالة").not().isEmpty(),
    check("text", "قم بكتابة محتوى المقالة").not().isEmpty(),
    check("author", "قم بكتابة كاتب المقالة").not().isEmpty(),
  ], protect ,asyncHandler(async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error(errors.array()[0].msg);
    }
    const user = await User.findById(req.user._id);
    const {title, brief, text, author} = req.body
    const article = new Article({
       title,
       brief,
       text,
       author
    })
    const createdArticle = await article.save();
    user.articles.push(createdArticle._id);
    await user.save();
    res.json(createdArticle);
}))

router.get("/latest" , asyncHandler(async(req, res) => {
    const latestArticles = await Article.find({}, "title").sort({ _id: -1 }).limit(2)
    if(latestArticles){
        res.json(latestArticles);
    }else {
        res.status(404)
        throw new Error("Server error");
    }
}))

router.get("/:id" , asyncHandler(async(req, res) => {
    const article = await Article.findById(req.params.id)
    if(article){
        res.json(article);
    }else {
        res.status(404)
        throw new Error("Article is not found")
    }
}))

router.delete("/:id", isAdmin, asyncHandler(async(req, res) => {
    const article = await Article.findById(req.params.id);
    if(article){
        await article.remove();
        res.json({message : "Article is removed"})
    } else {
        res.status(404);
        throw new Error("Article is not found")
    }
}))

router.put("/:id",[
    check("title", "قم بكتابة عنوان المقالة").not().isEmpty(),
    check("brief", "قم بكتابة مقدمة المقالة").not().isEmpty(),
    check("text", "قم بكتابة محتوى المقالة").not().isEmpty(),
    check("author", "قم بكتابة كاتب المقالة").not().isEmpty(),
  ], isAdmin, asyncHandler(async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error(errors.array()[0].msg);
    }
    const {title, brief, text, author} = req.body
    const article = await Article.findById(req.params.id);
    if(article){
        article.title = title;
        article.brief = brief;
        article.text = text;
        article.author = author;
        const updatedArticle = await article.save();
        res.json(updatedArticle);
    } else {
        res.status(404);
        throw new Error("Article is not found");
    }
}))

module.exports = router;