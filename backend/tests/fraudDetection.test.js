const chai = require("chai");
const sinon = require("sinon");
const { expect } = chai;
const fraudDetectionService = require("../services/fraudDetectionService");
const Transaction = require("../models/Transaction");
const User = require("../models/User");

describe("Fraud Detection Service Tests", function () {
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

  describe("runFraudDetection", function () {
    beforeEach(async function () {
      // Set up a test transaction
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

    it("should flag high-value transactions as fraudulent", async function () {
      const highValueTransaction = {
        userId: user._id,
        amount: 10000, // High value amount
        currency: "USD",
        ip: "192.168.1.1",
        cardInfo: "4111111111111111",
      };

      // Mock fraud detection criteria
      sinon.stub(fraudDetectionService, "isHighValueTransaction").returns(true);

      const isFraud = await fraudDetectionService.runFraudDetection(
        user,
        highValueTransaction
      );

      expect(isFraud).to.be.true;

      // Restore the stub
      fraudDetectionService.isHighValueTransaction.restore();
    });

    it("should flag transactions from blacklisted IPs as fraudulent", async function () {
      const blacklistedIpTransaction = {
        userId: user._id,
        amount: 50,
        currency: "USD",
        ip: "203.0.113.1", // Blacklisted IP
        cardInfo: "4111111111111111",
      };

      // Mock fraud detection criteria
      sinon.stub(fraudDetectionService, "isBlacklistedIp").returns(true);

      const isFraud = await fraudDetectionService.runFraudDetection(
        user,
        blacklistedIpTransaction
      );

      expect(isFraud).to.be.true;

      // Restore the stub
      fraudDetectionService.isBlacklistedIp.restore();
    });

    it("should not flag valid transactions as fraudulent", async function () {
      const validTransaction = {
        userId: user._id,
        amount: 50,
        currency: "USD",
        ip: "192.168.1.1",
        cardInfo: "4111111111111111",
      };

      // Mock fraud detection criteria
      sinon
        .stub(fraudDetectionService, "isHighValueTransaction")
        .returns(false);
      sinon.stub(fraudDetectionService, "isBlacklistedIp").returns(false);

      const isFraud = await fraudDetectionService.runFraudDetection(
        user,
        validTransaction
      );

      expect(isFraud).to.be.false;

      // Restore the stubs
      fraudDetectionService.isHighValueTransaction.restore();
      fraudDetectionService.isBlacklistedIp.restore();
    });
  });
});
