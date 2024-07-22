const express = require("express");
const router = express.Router();
const fraudDetectionService = require("../services/fraudDetectionService");

router.post("/check", async (req, res) => {
  try {
    const result = await fraudDetectionService.processTransaction(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
