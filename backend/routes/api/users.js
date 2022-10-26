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

/* GET users listing. */
// router.get('/', async function(req, res, next) {
//   // res.send('respond with a resource');
//   const users = await User.find({}).exec();

//   res.json({
//     users: users
//   });
// });

router.post('/likes', async (req, res, next) => {
  const liker = await User.findById(req.body.liker);
  const likee = await User.findById(req.body.likee);
  const previouslyLiked = liker.likes.includes(req.body.likee);

  await User.updateOne({_id: liker},
    {likes: previouslyLiked ? liker.likes.filter((likee) => {likee != req.body.likee}) : liker.likes.concat(req.body.likee)}
  )

  liker = await User.findById(req.body.liker);

  res.json(liker);
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
  
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    birthLocation: req.body.birthLocation,
    birthDateTime: req.body.birthDateTime,
    lat: req.body.lat,
    lng: req.body.lng,
    horoscope: req.body.horoscope ,
    likes: [],
    profileImageURL: "https://ecsphilly.org/app/uploads/2017/01/blank-profile-picture-973460_960_720-300x300.jpg"

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
    // In development, allow React server to gain access to the CSRF token
    // whenever the current user information is first loaded into the
    // React application
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    birthDateTime: req.user.birthDateTime,
    birthLocation: req.user.birthLocation,
    horoscope: req.user.horoscope,
    likes: req.user.likes,
    profileImageURL: req.user.profileImageURL
  });
});

router.get('/index', async function(req, res, next) {
  const users = await User.find({});
  const users_clean = users.map((user) => {
    return ({
      _id: user._id,
      name: user.name,
      email: user.email,
      birthDateTime: user.birthDateTime,
      birthLocation: user.birthLocation,
      horoscope: user.horoscope,
      likes: user.likes,
      profileImageURL: user.profileImageURL
    })
  })
  res.json(users_clean);
});

router.get('/:userId', async function(req, res, next) {
  const userId = req.params.userId;
  const user = await User.findById(userId).exec();
  // _id": "6357ea1f4c12fe6ec8efcfb3"
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    birthDateTime: user.birthDateTime,
    birthLocation: user.birthLocation,
    horoscope: user.horoscope,
    likes: user.likes,
    profileImageURL: user.profileImageURL
  });
});


module.exports = router;