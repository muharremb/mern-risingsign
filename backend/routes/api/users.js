const express = require('express');
const router = express.Router();
const bcrypt =require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');


/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.json({
    message: "GET /users"
  });
});

router.post('/register', async (req, res, next) => {
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
    birthTime: req.body.birthTime
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        return res.json({user});
      }
      catch(err) {
        next(err);
      }
    })
  });
});

router.post('/login', async (req, res, next) => {
  passport.authenticate('local', async function(err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error('Invalid credentials');
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" };
      return next(err);
    }
    return res.json({ user });
  })(req, res, next);
});

module.exports = router;