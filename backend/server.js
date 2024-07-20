require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("./utils/logger");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// Routes
const authRoutes = require("./routes/authRoutes");
const fraudDetectionRoutes = require("./routes/fraudDetectionRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const userRoutes = require("./routes/userRoutes");

// Create the Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/fraud", fraudDetectionRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/users", userRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => logger.info("MongoDB connected"))
  .catch((err) => logger.error("MongoDB connection error: " + err.message));

// Start the server
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
