const express = require('express');
const router = express.Router();
const User = mongoose.model('User');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-S3');

const s3 = new aws.S3({
   accessKeyId: process.env.S3_ACCESS_KEY,
   secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
   region: process.env.S3_BUCKET_REGION
})

export const getUserPics = async (req, res, next) => {
   const userId = req.params.userId;
   const user = await User.findById(userId).exec();
   if (user) {
     const pics = user.imageURLS;
     if (!pics) return res.json(null)
     res.json({
       pics
     })
   } else {
     const err = new Error('Unable to find that user');
     err.statusCode = 404;
     err.errors = { user: 'Unable to find that user'};
     return next(err);
   }
};

const upload = (bucketName) => {
   multer({
      storage: multerS3({
         s3,
         bucket: bucketName,
         metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
         },
         key: (req, file, cb) => {
            cb(null, "image.jpeg")
         }
      })
   })
}

export const setProfilePic = (req, res, next) => {
   const uploadSingle = upload('mern-rising-sign-profile-pics').single('image-upload');

   uploadSingle(req, res, err => {
      if (err) return res.status(400).json({ success: false, message: err.message})

      console.log(req.files);
      res.status(200).json({ data: req.files })
   })
}

