const express = require("express");
const { check, validationResult } = require('express-validator');
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken")
const { isAdmin } = require("../middlewares/authMiddleware")
const jwt = require("jsonwebtoken")
const SecretWord = require("../models/secretWordModel")
const router = express.Router();
const sgMail = require('@sendgrid/mail')
const sendgridApiKey = "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"
sgMail.setApiKey(sendgridApiKey)

// router.post("/login", asyncHandler(async (req, res, next) => {
//     const { email , password } = req.body;
//     const user = await User.findOne({email});
//     if (user && await user.matchPassword(password)){
//         res.json({
//             name:user.name,
//             isAdmin:user.isAdmin,
//             token:generateToken(user._id)
//         })
//     } else {
//         res.status(401);
//         throw new Error("invaild email or password")
//     }
// }))

router.post("/login",[
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter your password").not().isEmpty()
  ] ,asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error(errors.array()[0].msg);
    }
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

router.post("/signup",[
    check("name", "Please enter a name").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Your password must have at least 6 characters").isLength({min: 6}),
    check("confirmPassword", "Please confirm your password").not().isEmpty(),
    check("secretWord", "Please enter the secret word").not().isEmpty()
  ], asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error(errors.array()[0].msg);
    } 
  const {name, email, password,confirmPassword, secretWord} = req.body
  const nameExists = await User.findOne({name})
  const emailExists = await User.findOne({email})
  const word = await SecretWord.findOne({});
  if (nameExists){
    res.status(400);
    throw new Error("Username already exists");
  }
  if (emailExists){
      res.status(400);
      throw new Error("Email already exists");
  }
  if(password !== confirmPassword){
    res.status(400);
    throw new Error("Passwords don't match"); 
  }
  if (word && await word.matchSecretWords(secretWord)){
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
  } else {
    res.status(400);
    throw new Error("Secret word is wrong");
  }
  
}))

router.get("/admin/:id", isAdmin, asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id).populate("articles", "title brief date author").populate("videos");
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
            user.password = password;
            await user.save();
            res.json(payload);
        }catch(error){
            throw new Error("Server Error");
        }
})

router.post("/secretWord", isAdmin, asyncHandler(async(req, res) => {
    console.log("working...");
   const secretWord = await SecretWord.findOne({});
   console.log(secretWord);
   if(secretWord){
       secretWord.word = req.body.secretWord;
       await secretWord.save()
       res.json({message:"Secret word changed successfully"})
   }
   else {
    const createdSecretWord = await SecretWord.create({
        word:req.body.secretWord
    })
    if(createdSecretWord){
        res.status(201).json({
            message:"Secret word is created successfully"
        })
    } else {
        res.status(400);
        throw new Error("Invalid data");
    }
   }
}))

module.exports =  router;
