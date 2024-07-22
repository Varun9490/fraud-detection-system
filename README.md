# Fraud Detection System

## Overview

The Fraud Detection System is a backend application designed to manage user authentication and transaction records. It uses JWT for secure authentication, bcrypt for password hashing, and incorporates middleware for security and input validation. This project also features rate limiting and logging to handle and monitor authentication attempts.

## Features

- User Registration with password strength validation and email domain checking
- User Login with JWT-based authentication
- Secure API endpoints with token-based authorization
- Middleware for input sanitization to prevent security vulnerabilities
- Rate limiting and logging for monitoring login attempts

## Prerequisites

- Node.js and npm installed
- MongoDB installed and running
- Postman or similar tool for API testing

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/fraud-detection-system.git
   cd fraud-detection-system
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory and add your configuration settings. Example:

   ```env
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRATION=1h
   MONGO_URI=your_mongodb_uri
   ```

4. **Start the server:**

   ```bash
   npm start
   ```

## API Endpoints

### 1. Register User

- **Endpoint:** `/api/auth/register`
- **Method:** `POST`
- **Body:**

  ```json
  {
    "name": "John Doe",
    "email": "john.doe@gmail.com",
    "password": "StrongPassword123!"
  }
  ```

- **Responses:**

  - `200 OK` on successful registration with a JWT token.
  - `400 Bad Request` for invalid input or email already in use.
  - `500 Internal Server Error` for server issues.

### 2. Login User

- **Endpoint:** `/api/auth/login`
- **Method:** `POST`
- **Body:**

  ```json
  {
    "email": "john.doe@gmail.com",
    "password": "StrongPassword123!"
  }
  ```

- **Responses:**

  - `200 OK` with a JWT token on successful login.
  - `400 Bad Request` for invalid credentials.
  - `500 Internal Server Error` for server issues.

### 3. Get Transactions

- **Endpoint:** `/api/transactions`
- **Method:** `GET`
- **Headers:**

  ```http
  Authorization: Bearer <your_jwt_token>
  ```

- **Responses:**

  - `200 OK` with a list of transactions.
  - `401 Unauthorized` if the token is missing or invalid.
  - `500 Internal Server Error` for server issues.

## Middleware

### 1. Input Sanitization

- **Purpose:** Sanitizes input fields to prevent HTML injection, XSS, and SQL injection.

### 2. Authorization

- **Purpose:** Validates JWT tokens to secure endpoints and ensure proper authorization.

### 3. Rate Limiting

- **Purpose:** Limits the number of login attempts to prevent abuse.

### 4. Logging

- **Purpose:** Logs failed login attempts for monitoring and analysis.

## Testing

1. **Use Postman** or a similar tool to test the API endpoints.
2. **Include the JWT token** in the `Authorization` header for secured endpoints.

## Troubleshooting

- **Token Errors:** Ensure that you provide a valid token in the `Authorization` header.
- **Database Issues:** Check MongoDB connection and configuration settings.
- **Dependency Errors:** Ensure all dependencies are installed and up-to-date.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with any changes or improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
