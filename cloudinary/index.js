const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require("dotenv").config();
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_KEY,
    api_secret : process.env.CLOUDINARY_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"Shaymaa",
        resource_type:"video",
        allowedFormats:["mp4", "mov", "wmv", "flv", "avi", "avchd", "webm", "mkv"]
    }
})

const authorsPicsStorage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"Shaymaa",
        allowedFormats:["jpg", "jpeg", "png"]
    }
})

module.exports = {cloudinary, storage, authorsPicsStorage}