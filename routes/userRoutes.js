const express = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken")
const { isAdmin } = require("../middlewares/authMiddleware")
const jwt = require("jsonwebtoken")
const router = express.Router();
const sgMail = require('@sendgrid/mail')
const sendgridApiKey = "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"
sgMail.setApiKey(sendgridApiKey)

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

router.post("/forgot-password", async(req, res) => {
    const { email } = req.body;
    const user = await User.findOne({email});
    if(!user){
        res.status(404);
        throw new Error("User is not found");
    } else {
        const secret = process.env.JWT_SECRET + user.password;
        const token = jwt.sign({id:user._id}, secret, {
            expiresIn:"15m"
        })
        const msg = {
            to: user.email, // Change to your recipient
            from: 'helllooper@gmail.com', // Change to your verified sender
            subject: 'Our children and diabetes/Password reset from admin account',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
              'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
              'http://localhost:3000/api/users/reset-password/' + user._id + '/' + token + '\n\n' +
              'Note:The link above will not be valid after 15 minutes\n\n' +
              'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            
          }
          sgMail
            .send(msg)
            .then(() => {
              console.log('Email sent')
            })
            .catch((error) => {
              console.error(error)
            })
    }
})

router.get("/reset-password/:id/:token", async(req, res) => {
    const {id, token} = req.params;
    const user = await User.findById(id);
    if(!user){
        res.status(404);
        throw new Error("User is not found");
    } else {
        const secret = process.env.JWT_SECRET + user.password;
        try{
            const payload = jwt.verify(token, secret);
            console.log(payload);
            res.json(payload);
        }catch(error){
            throw new Error("Server Error");
        }
    }
})

router.post("/reset-password/:id/:token", async(req, res) => {
    const {id, token} = req.params;
    const password = req.body.password;
    const user = await User.findById(id);
    if(!user){
        res.status(404);
        throw new Error("User is not found");
    }
    const secret = process.env.JWT_SECRET + user.password;
        try{
            const payload = jwt.verify(token, secret);
            console.log(payload);
            user.password = password;
            await user.save();
            res.json(payload);
        }catch(error){
            throw new Error("Server Error");
        }
})

module.exports =  router;
