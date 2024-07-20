const mongoose = require("mongoose");

const FraudPatternSchema = new mongoose.Schema({
  pattern: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("FraudPattern", FraudPatternSchema);
