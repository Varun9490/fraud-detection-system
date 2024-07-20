const winston = require("winston");

// Define the log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// Create the logger instance
const logger = winston.createLogger({
  level: "info", // Default log level
  format: logFormat,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      format: logFormat,
    }),
    new winston.transports.File({
      filename: "logs/combined.log",
      format: logFormat,
    }),
  ],
});

// Export the logger instance
module.exports = logger;
