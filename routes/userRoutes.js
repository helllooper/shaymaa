const express = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken")

const router = express.Router();

router.post("/login", asyncHandler(async (req, res) => {
    const { email , password } = req.body;
    const user = await User.findOne({email});
    if (user && await user.matchPassword(password)){
        res.json({
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

router.get("/" , asyncHandler(async (req, res) => {
        const users = await User.find({},"name");
        res.json(users);  
}))

module.exports =  router;
