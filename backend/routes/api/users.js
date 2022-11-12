const express = require('express');
const router = express.Router();
const bcrypt =require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const {loginUser, restoreUser} = require('../../config/passport');
const {isProduction} = require('../../config/keys');
const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');


router.post('/likes', async (req, res, next) => {
  const liker = await User.findById(req.body.liker).exec();
  const likee = await User.findById(req.body.likee).exec();
  const previouslyLiked = liker.likes.includes(req.body.likee);

  const updatedLiker = await User.findOneAndUpdate({_id: liker},
    {likes: previouslyLiked ? liker.likes : liker.likes.concat(req.body.likee)}, 
    {new: true}

  ).exec();
  const updatedLikee = await User.findOneAndUpdate({_id: likee},
    {likers: previouslyLiked ? likee.likers : likee.likers.concat(req.body.liker)}, 
    {new: true}
  ).exec();

  res.json({
    liker: updatedLiker,
    likee: updatedLikee
  });
});

router.post('/unlikes', async (req, res, next) => {
  const liker = await User.findById(req.body.liker).exec();
  const likee = await User.findById(req.body.likee).exec();

  const updatedLiker = await User.findOneAndUpdate({_id: liker},
    {likes: liker.likes.filter(item => item !== req.body.likee) }, 
    {new: true}

  ).exec();
  const updatedLikee = await User.findOneAndUpdate({_id: likee},
    {likers: likee.likers.filter(item => item !== req.body.liker)}, 
    {new: true}
  ).exec();

  res.json({
    liker: updatedLiker,
    likee: updatedLikee
  });
});

router.post('/register', validateRegisterInput, async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email
  });

  if(user) {
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors={};
    if (user.email === req.body.email) {
      errors.email = "A user has already registered with this email";
    }
    err.errors = errors;
    return next(err);
  }
  let profilePic;       

  switch(req.body.horoscope.sun.Sign.key) {
    case "aquarius":
      profilePic = "https://mern-rising-sign-profile-pics.s3.amazonaws.com/aquarius_default.png";
      break;
    case "aries":
      profilePic = "https://mern-rising-sign-profile-pics.s3.amazonaws.com/aries_default.png";
      break;
    case "cancer":
      profilePic = "https://mern-rising-sign-profile-pics.s3.amazonaws.com/cancer_default.png";
      break;
    case "capricorn":
      profilePic = "https://mern-rising-sign-profile-pics.s3.amazonaws.com/capricorn_default.png";
      break;
    case "gemini":
      profilePic = "https://mern-rising-sign-profile-pics.s3.amazonaws.com/gemini_default.png";
      break;
    case "leo":
      profilePic = "https://mern-rising-sign-profile-pics.s3.amazonaws.com/leo_default.png";
      break;
    case "libra":
      profilePic = "https://mern-rising-sign-profile-pics.s3.amazonaws.com/libra_default.png";
      break;
    case "pisces":
      profilePic = "https://mern-rising-sign-profile-pics.s3.amazonaws.com/pisces_default.png";
      break;
    case "sagittarius":
      profilePic = "https://mern-rising-sign-profile-pics.s3.amazonaws.com/sagittarius_default.png";
      break;
    case "scorpio":
      profilePic = "https://mern-rising-sign-profile-pics.s3.amazonaws.com/scorpio_default.png";
      break;
    case "taurus":
      profilePic = "https://mern-rising-sign-profile-pics.s3.amazonaws.com/taurus_default.png";
      break;
    case "virgo":
      profilePic = "https://mern-rising-sign-profile-pics.s3.amazonaws.com/virgo_default.png";
      break;
  }

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    bio: '',
    // birthLocation: req.body.birthLocation,
    birthDateTime: req.body.birthDateTime,
    // lat: req.body.lat,
    // lng: req.body.lng,
    horoscope: req.body.horoscope,
    likes: [],
    likers: [],
    imageURLs: [],
    profileImageURL: profilePic,
    status: 'online',
    newMessages: {}
    
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        return res.json(await loginUser(user));
      }
      catch(err) {
        next(err);
      }
    })
  });
});

router.post('/login', validateLoginInput, async (req, res, next) => {
  passport.authenticate('local', async function(err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error('Invalid credentials');
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" };
      return next(err);
    }
    return res.json(await loginUser(user));
  })(req, res, next);
});

router.get('/current', restoreUser, (req, res) => {
  if (!isProduction) {
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    bio: req.user.bio,
    likers: req.user.likers,
    birthDateTime: req.user.birthDateTime,
    // birthLocation: req.user.birthLocation,
    horoscope: req.user.horoscope,
    likes: req.user.likes,
    profileImageURL: req.user.profileImageURL,
    imageURLs: req.user.imageURLs,
    status: 'online',
    newMessages: {}
  });
});

router.get('/index', async function(req, res, next) {

  const options = {skip: parseInt(req.query.skip), limit: parseInt(req.query.limit)}
  let query;
  if(req.query.likes) {
    query = {_id: {$nin: req.query.likes.split(",")}}
  } else if (req.query.matches) {
    query = {_id: {$in: req.query.matches.split(",")}}
  } else {
    query = {};
  }
  const users = await User.find(query, null, options);
  const users_clean = users.map((user) => {
    return ({
      _id: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      birthDateTime: user.birthDateTime,
      horoscope: user.horoscope,
      likes: user.likes,
      profileImageURL: user.profileImageURL,
      imageURLs: user.imageURLs,
      status: 'online',
      newMessages: {}
    })
  })
  res.json(users_clean);
});

router.patch('/:userId', async (req, res, next) => {
  const userId = req.params.userId;
  const bio = req.body.bio;

  const updatedUser = await User.findOneAndUpdate({_id: userId},
    {bio}, 
    {new: true}
  ).exec();

  res.json(updatedUser);
});

router.get('/:userId', async function(req, res, next) {
  const userId = req.params.userId;
  const user = await User.findById(userId).exec();
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    bio: user.bio,
    birthDateTime: user.birthDateTime,
    // birthLocation: user.birthLocation,
    horoscope: user.horoscope,
    likes: user.likes,
    profileImageURL: user.profileImageURL,
    imageURLs: user.imageURLs,
    status: 'online',
    newMessages: {}
  });
});


module.exports = router;