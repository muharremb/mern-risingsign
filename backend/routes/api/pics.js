const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3 = new S3Client({
   region: process.env.S3_BUCKET_REGION,
   credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
   }
})

const upload = multer({
   storage: multerS3({
      s3,
      bucket: 'mern-rising-sign-profile-pics',
      metadata: function (req, file, cb) {
         cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
         cb(null, "image" + Date.now().toString() + ".jpeg");
      }
   })
})

router.post('/upload', upload.single('image-upload'), async (req, res) => {
   console.log(req);
   console.log(req.file.location);
   const possibleDouble = req.file.location.substr(8, 29);
   let goodUrl;
   const urlBeginning = req.file.location.substr(0, 8);
   const urlEnding = req.file.location.substr(38, (req.file.location.length - 1)) 

   if (possibleDouble === urlEnding.substr(0, 29)) {
      goodUrl = urlBeginning + urlEnding;
   } else {
      goodUrl = req.file.location;
   }
   console.log(urlEnding.substr(0, 30))
   console.log(possibleDouble)
   console.log(goodUrl)
         // url is being doubled somewhere in multer for some reason

   const user = await User.findById(req.body.uploaderId);
   const isProfile = req.body.isProfile;
   
   try {
      if (isProfile === "true") {
         user.profileImageURL = goodUrl;
      } else {
         user.imageURLs.push(goodUrl);
      }

      user.save();

      return res.json(user);

   } catch(err) {
      throw res.json(err);
   }
 
})

module.exports = router;



// export const getUserPics = async (req, res, next) => {
   //    const userId = req.params.userId;
   //    const user = await User.findById(userId).exec();
   //    if (user) {
   //      const pics = user.imageURLS;
   //      if (!pics) return res.json(null)
   //      res.json({
   //        pics
   //      })
   //    } else {
   //      const err = new Error('Unable to find that user');
   //      err.statusCode = 404;
   //      err.errors = { user: 'Unable to find that user'};
   //      return next(err);
   //    }
   // };