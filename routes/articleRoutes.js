const express = require("express");
const asyncHandler = require("express-async-handler");
const Article = require("../models/articlesModel");
const { isAdmin, protect } = require("../middlewares/authMiddleware")
const User = require("../models/userModel");

const router = express.Router();

router.get("/", asyncHandler(async (req, res) => {
    const pageSize = 5;
    const page = req.query.pageNumber || 1;
    console.log(page);
    const count = await Article.countDocuments();
    const articles = await Article.find({}, "title brief author date").limit(pageSize).skip(pageSize * (page - 1));
    res.json({articles, page, pages:Math.ceil(count / pageSize)});
}))

router.post("/",protect ,asyncHandler(async(req, res) => {
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


module.exports = router;