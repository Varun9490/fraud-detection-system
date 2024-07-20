const validator = require("validator");

/**
 * Validates an email address.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - True if the email is valid, false otherwise.
 */
const validateEmail = (email) => {
  return validator.isEmail(email);
};

/**
 * Validates a password.
 * Passwords must be at least 8 characters long and contain at least one letter and one number.
 * @param {string} password - The password to validate.
 * @returns {boolean} - True if the password is valid, false otherwise.
 */
const validatePassword = (password) => {
  const minLength = 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  return password.length >= minLength && hasLetter && hasNumber;
};

/**
 * Validates a phone number.
 * @param {string} phoneNumber - The phone number to validate.
 * @returns {boolean} - True if the phone number is valid, false otherwise.
 */
const validatePhoneNumber = (phoneNumber) => {
  return validator.isMobilePhone(phoneNumber, "any");
};

/**
 * Validates a URL.
 * @param {string} url - The URL to validate.
 * @returns {boolean} - True if the URL is valid, false otherwise.
 */
const validateURL = (url) => {
  return validator.isURL(url);
};

/**
 * Sanitizes input by trimming and escaping potentially unsafe characters.
 * @param {string} input - The input to sanitize.
 * @returns {string} - The sanitized input.
 */
const sanitizeInput = (input) => {
  return validator.escape(validator.trim(input));
};

module.exports = {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateURL,
  sanitizeInput,
};
