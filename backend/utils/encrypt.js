const bcrypt = require("bcrypt");
const crypto = require("crypto");

// Hashes a plain text password
const hashPassword = async (plainTextPassword) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password: " + error.message);
  }
};

// Compares a plain text password with a hashed password
const comparePassword = async (plainTextPassword, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error("Error comparing password: " + error.message);
  }
};

// Encrypts plain text using AES-256
const encryptText = (plainText, secretKey) => {
  try {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      "aes-256-cbc",
      Buffer.from(secretKey),
      iv
    );
    let encrypted = cipher.update(plainText);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
  } catch (error) {
    throw new Error("Error encrypting text: " + error.message);
  }
};

// Decrypts AES-256 encrypted text
const decryptText = (encryptedText, secretKey) => {
  try {
    const textParts = encryptedText.split(":");
    const iv = Buffer.from(textParts.shift(), "hex");
    const encryptedTextBuffer = Buffer.from(textParts.join(":"), "hex");
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(secretKey),
      iv
    );
    let decrypted = decipher.update(encryptedTextBuffer);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (error) {
    throw new Error("Error decrypting text: " + error.message);
  }
};

module.exports = {
  hashPassword,
  comparePassword,
  encryptText,
  decryptText,
};
