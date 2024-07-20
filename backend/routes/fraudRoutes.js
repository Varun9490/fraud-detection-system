const express = require("express");
const router = express.Router();
const fraudDetectionController = require("../controllers/fraudDetectionController");
const auth = require("../middleware/auth");

// @route    POST api/fraud-detection
// @desc     Run fraud detection
// @access   Private
router.post("/", auth, fraudDetectionController.runFraudDetection);

module.exports = router;
