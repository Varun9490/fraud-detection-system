module.exports = {
  jwtSecret: process.env.JWT_SECRET || "your_jwt_secret",
  jwtExpiration: process.env.JWT_EXPIRATION || "1h",
};
