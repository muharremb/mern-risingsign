const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

// validateRegisterInput is a combination Express middleware that uses the 
// `check` middleware to validate the keys in the body of a request to 
// register a user
const validateRegisterInput = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Email is invalid'),
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ min: 2, max: 30 })
    .withMessage('Name must be between 2 and 30 characters'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6, max: 30 })
    .withMessage('Password must be between 6 and 30 characters'),
  check('birthLocation')
    .exists({ checkFalsy: true })
    .withMessage('Birth location should be provided'),
  check('birthTime')
    .exists({ checkFalsy: true })
    .withMessage('Birth time should be provided in "HH:MM AM/PM" format'),
    check('birthDate')
    .exists({ checkFalsy: true })
    .withMessage('Birth Date should be provided in "MM-DD-YYYY" format'),
    handleValidationErrors
];

module.exports = validateRegisterInput;