const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const sanitizeInput = require("../middleware/sanitize");

// @route    POST api/auth/register
// @desc     Register user
// @access   Public
router.post("/register", sanitizeInput, authController.register);

// @route    POST api/auth/login
// @desc     Authenticate user & get token
// @access   Public
router.post("/login", sanitizeInput, authController.login);

module.exports = router;
