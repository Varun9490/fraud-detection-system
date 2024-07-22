const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const keys = require("../config/keys");
const zxcvbn = require("zxcvbn");
const validator = require("validator");
const { pwnedPassword } = require("hibp");
const rateLimit = require("express-rate-limit"); // Middleware for rate limiting
const winston = require("winston"); // Logger for failed attempts

// Define valid email providers
const validEmailProviders = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  // Add more valid email providers as needed
];

// Rate limiter middleware
const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: "Too many login attempts from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Logger setup
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: "loginAttempts.log" })],
});

// Middleware function to validate email format
const validateEmail = (email) => {
  return validator.isEmail(email);
};

// Register function
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  // Check email validity
  if (!validateEmail(email)) {
    return res.status(400).json({ msg: "Invalid email format" });
  }

  // Check if email is from a valid provider
  const emailDomain = email.split("@")[1];
  if (!validEmailProviders.includes(emailDomain)) {
    return res.status(400).json({ msg: "Email provider is not allowed" });
  }

  // Check password strength
  const passwordStrength = zxcvbn(password);
  if (passwordStrength.score < 3) {
    return res.status(400).json({ msg: "Password is too weak" });
  }

  // Check if password is in the list of leaked passwords
  const isLeaked = await pwnedPassword(password);
  if (isLeaked) {
    return res
      .status(400)
      .json({ msg: "Password has been leaked in a data breach" });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      keys.jwtSecret,
      { expiresIn: keys.jwtExpiration },
      (err, token) => {
        if (err) {
          console.error("Token generation error:", err);
          return res.status(500).send("Server error");
        }
        res.json({ token });
      }
    );
  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).send("Server error");
  }
};

// Login function
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validate email format
  if (!validateEmail(email)) {
    return res.status(400).json({ msg: "Invalid email format" });
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      // Log failed attempt
      logger.info({ email, message: "Invalid credentials attempt" });
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Log failed attempt
      logger.info({ email, message: "Invalid credentials attempt" });
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      keys.jwtSecret,
      { expiresIn: keys.jwtExpiration },
      (err, token) => {
        if (err) {
          console.error("Token generation error:", err);
          return res.status(500).send("Server error");
        }
        res.json({ token });
      }
    );
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).send("Server error");
  }
};

// Export the rate limiter for use in other files
module.exports = {
  loginRateLimiter,
};
