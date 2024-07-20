const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const csurf = require("csurf");

module.exports = (app) => {
  app.use(helmet());

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });
  app.use(limiter);

  app.use(csurf());
};
