const { body, validationResult } = require("express-validator");
const xssClean = require("xss-clean");

const sanitizeInput = [
  xssClean(),

  // Name validation and sanitization
  body("name")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Name is required")
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),

  // Email validation and sanitization
  body("email").normalizeEmail().isEmail().withMessage("Invalid email address"),

  // Password validation and sanitization
  body("password")
    .trim()
    .escape()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/\d/)
    .withMessage("Password must contain a number"),

  // Custom middleware to handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = sanitizeInput;
