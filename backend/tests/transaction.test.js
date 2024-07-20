const chai = require("chai");
const sinon = require("sinon");
const { expect } = chai;
const transactionService = require("../services/transactionService");
const Transaction = require("../models/Transaction");
const User = require("../models/User");

describe("Transaction Service Tests", function () {
  let user, transaction;

  before(async function () {
    // Set up the test user
    user = new User({
      name: "Test User",
      email: "testuser@example.com",
      password: "Test1234!",
    });
    await user.save();
  });

  after(async function () {
    // Clean up the database
    await User.deleteMany({});
    await Transaction.deleteMany({});
  });

  describe("createTransaction", function () {
    it("should create a transaction successfully", async function () {
      const transactionData = {
        user: user._id,
        amount: 50,
        currency: "USD",
        ip: "192.168.1.1",
        cardInfo: "4111111111111111",
      };

      const createdTransaction = await transactionService.createTransaction(
        transactionData
      );

      expect(createdTransaction).to.have.property("_id");
      expect(createdTransaction.amount).to.equal(transactionData.amount);
      expect(createdTransaction.currency).to.equal(transactionData.currency);
      expect(createdTransaction.ip).to.equal(transactionData.ip);
    });

    it("should throw an error for missing required fields", async function () {
      const incompleteTransactionData = {
        user: user._id,
        amount: 50,
        // Missing currency, ip, cardInfo
      };

      try {
        await transactionService.createTransaction(incompleteTransactionData);
      } catch (error) {
        expect(error.message).to.include("Validation failed");
      }
    });
  });

  describe("getTransactionById", function () {
    beforeEach(async function () {
      // Create a test transaction
      transaction = new Transaction({
        user: user._id,
        amount: 100,
        currency: "USD",
        ip: "192.168.1.1",
        cardInfo: "4111111111111111",
        status: "Pending",
      });
      await transaction.save();
    });

    it("should retrieve a transaction by ID", async function () {
      const retrievedTransaction = await transactionService.getTransactionById(
        transaction._id
      );

      expect(retrievedTransaction).to.have.property("_id");
      expect(retrievedTransaction._id.toString()).to.equal(
        transaction._id.toString()
      );
    });

    it("should throw an error if transaction not found", async function () {
      try {
        await transactionService.getTransactionById("invalidtransactionid");
      } catch (error) {
        expect(error.message).to.equal("Transaction not found");
      }
    });
  });

  describe("updateTransactionStatus", function () {
    beforeEach(async function () {
      // Create a test transaction
      transaction = new Transaction({
        user: user._id,
        amount: 100,
        currency: "USD",
        ip: "192.168.1.1",
        cardInfo: "4111111111111111",
        status: "Pending",
      });
      await transaction.save();
    });

    it("should update the transaction status successfully", async function () {
      const updatedTransaction =
        await transactionService.updateTransactionStatus(
          transaction._id,
          "Completed"
        );

      expect(updatedTransaction.status).to.equal("Completed");
    });

    it("should throw an error if transaction not found", async function () {
      try {
        await transactionService.updateTransactionStatus(
          "invalidtransactionid",
          "Completed"
        );
      } catch (error) {
        expect(error.message).to.equal("Transaction not found");
      }
    });
  });
});
