const express = require("express");
const asyncHandler = require("express-async-handler");
const Article = require("../models/articlesModel");

const router = express.Router();

router.get("/", asyncHandler(async (req, res) => {
    const articles = await Article.find({});
    res.json({articles});
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