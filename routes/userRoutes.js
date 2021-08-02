const express = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken")
const { isAdmin } = require("../middlewares/authMiddleware")
const router = express.Router();

router.post("/login", asyncHandler(async (req, res) => {
    const { email , password } = req.body;
    const user = await User.findOne({email});
    if (user && await user.matchPassword(password)){
        res.json({
            name:user.name,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })
    } else {
        res.status(401);
        throw new Error("invaild email or password")
    }
}))

router.post("/signup", asyncHandler(async (req, res) => {
  const {name, email, password} = req.body
  const nameExists = await User.findOne({name})
  const emailExists = await User.findOne({email})
  if (nameExists){
    res.status(400);
    throw new Error("Username already exists");
  }
  if (emailExists){
      res.status(400);
      throw new Error("Email already exists");
  }
  const user = await User.create({
      name,
      email,
      password
  })
  if(user){
      res.status(201).json({
        token:generateToken(user._id)
      })
  } else {
      res.status(400);
      throw new Error("Invalid user data")
  }
}))

router.get("/admin/:id", isAdmin, asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id).populate("articles", "title brief date author");
    if(user){
        res.status(201).json(user)
    } else {
        res.status(404);
        throw new Error("User is not found")
    }
}))

router.get("/" ,isAdmin , asyncHandler(async (req, res) => {
        const users = await User.find({},"name isAdmin");
        res.json(users);  
}))

router.delete("/delete/:id", isAdmin, asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);
    if(user){
        await user.remove();
        res.json({message:"User is removed"});
    } else {
        res.status(404);
        throw new Error("User is not found");
    }
}))

module.exports =  router;
