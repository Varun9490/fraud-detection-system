const Transaction = require("../models/Transaction");
const logger = require("../utils/logger");

// Create a new transaction
const createTransaction = async (transactionData) => {
  try {
    const newTransaction = new Transaction(transactionData);
    await newTransaction.save();
    return newTransaction;
  } catch (error) {
    logger.error("Error creating transaction: " + error.message);
    throw new Error("Error creating transaction: " + error.message);
  }
};

// Get a transaction by ID
const getTransactionById = async (transactionId) => {
  try {
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) throw new Error("Transaction not found");
    return transaction;
  } catch (error) {
    logger.error("Error retrieving transaction: " + error.message);
    throw new Error("Error retrieving transaction: " + error.message);
  }
};

// Get all transactions for a user
const getUserTransactions = async (userId) => {
  try {
    const transactions = await Transaction.find({ userId });
    return transactions;
  } catch (error) {
    logger.error("Error retrieving user transactions: " + error.message);
    throw new Error("Error retrieving user transactions: " + error.message);
  }
};

module.exports = {
  createTransaction,
  getTransactionById,
  getUserTransactions,
};
