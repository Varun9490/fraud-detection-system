const mongoose = require("mongoose");

const BlacklistIPSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("BlacklistIP", BlacklistIPSchema);
