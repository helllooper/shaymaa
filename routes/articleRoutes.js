const express = require("express");
const asyncHandler = require("express-async-handler");
const Article = require("../models/articlesModel");

const router = express.Router();

router.get("/", asyncHandler(async (req, res) => {
    const pageSize = 5;
    const page = req.query.pageNumber || 1;
    console.log(page);
    const count = await Article.countDocuments();
    const articles = await Article.find({}, "title brief author date").limit(pageSize).skip(pageSize * (page - 1));
    res.json({articles, page, pages:Math.ceil(count / pageSize)});
}))

router.post("/", asyncHandler(async(req, res) => {
    const {title, brief, text, author} = req.body
    const article = new Article({
       title,
       brief,
       text,
       author
    })
    const createdArticle = await article.save();
    res.json(createdArticle);
}))


module.exports = router;