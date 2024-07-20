const express = require("express");
const connectDB = require("./config/db");
const passport = require("passport");
const security = require("./config/security");
const errorHandler = require("./middleware/errorHandler");
const csrfProtection = require("./middleware/csrfProtection");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json"); // You need to create this file

const app = express();

// Connect to the database
connectDB();

// Initialize middleware
app.use(express.json());
app.use(cookieParser());

// Security middleware
security(app);

// Passport middleware
app.use(passport.initialize());
require("./config/passport")(passport);

// CSRF Protection
app.use(csrfProtection);

// Define routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));
app.use("/api/fraud-detection", require("./routes/fraudDetectionRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
