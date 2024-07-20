const User = require("../models/User");
const logger = require("../utils/logger");

// Get a user by ID
const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    logger.error("Error retrieving user: " + error.message);
    throw new Error("Error retrieving user: " + error.message);
  }
};

// Update user information
const updateUser = async (userId, updateData) => {
  try {
    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    logger.error("Error updating user: " + error.message);
    throw new Error("Error updating user: " + error.message);
  }
};

// Delete a user
const deleteUser = async (userId) => {
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    logger.error("Error deleting user: " + error.message);
    throw new Error("Error deleting user: " + error.message);
  }
};

module.exports = {
  getUserById,
  updateUser,
  deleteUser,
};
