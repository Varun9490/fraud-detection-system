const express = require("express");
const router = express.Router();
const FraudDetectionService = require("../services/fraudDetectionService");

// Example route for fraud detection
router.post("/check", async (req, res) => {
  try {
    const result = await FraudDetectionService.checkFraud(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
