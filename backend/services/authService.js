const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { hashPassword, comparePassword } = require("../utils/encrypt");
const logger = require("../utils/logger");

// Generate a JWT token
const generateToken = (user) => {
  const payload = { id: user._id, email: user.email };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register a new user
const registerUser = async (email, password) => {
  try {
    const hashedPassword = await hashPassword(password);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    return generateToken(newUser);
  } catch (error) {
    logger.error("Error registering user: " + error.message);
    throw new Error("Error registering user: " + error.message);
  }
};

// Login an existing user
const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    return generateToken(user);
  } catch (error) {
    logger.error("Error logging in user: " + error.message);
    throw new Error("Error logging in user: " + error.message);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
