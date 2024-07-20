const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

// @route    GET api/user
// @desc     Get user details
// @access   Private
router.get("/", auth, userController.getUser);

module.exports = router;
