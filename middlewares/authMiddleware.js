const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token , process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select("-password")
            next();
        } catch(error) {
            console.log(error);
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }

    if(!token){
        res.status(401);
        throw new Error("Not authorized, no token")
    }
})

const isAdmin = asyncHandler(async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{ 
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token , process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select("-password")
            if(!req.user.isAdmin){
                console.log("Error");
                throw new Error("Not authorized");
            } else {
                console.log("Next");
                next();
            }
        } catch(error) {
            console.log(error);
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }
    console.log("No Token");
    if(!token){
        res.status(401);
        throw new Error("Not authorized, no token")
    }
})

module.exports = {
    isAdmin,
    protect
};