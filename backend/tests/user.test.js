const chai = require("chai");
const sinon = require("sinon");
const { expect } = chai;
const userService = require("../services/userService");
const User = require("../models/User");
const bcrypt = require("bcrypt");

describe("User Service Tests", function () {
  let user;

  before(async function () {
    // Set up the test user
    user = new User({
      name: "Test User",
      email: "testuser@example.com",
      password: "Test1234!",
    });
    user.password = await bcrypt.hash(user.password, 10); // Hash the password
    await user.save();
  });

  after(async function () {
    // Clean up the database
    await User.deleteMany({});
  });

  describe("createUser", function () {
    it("should create a user successfully", async function () {
      const newUser = {
        name: "New User",
        email: "newuser@example.com",
        password: "NewUser123!",
      };

      const createdUser = await userService.createUser(newUser);

      expect(createdUser).to.have.property("_id");
      expect(createdUser.email).to.equal(newUser.email);
      expect(createdUser.name).to.equal(newUser.name);
    });

    it("should throw an error for missing required fields", async function () {
      const incompleteUserData = {
        name: "Incomplete User",
        // Missing email and password
      };

      try {
        await userService.createUser(incompleteUserData);
      } catch (error) {
        expect(error.message).to.include("Validation failed");
      }
    });
  });

  describe("getUserByEmail", function () {
    it("should retrieve a user by email", async function () {
      const retrievedUser = await userService.getUserByEmail(user.email);

      expect(retrievedUser).to.have.property("_id");
      expect(retrievedUser.email).to.equal(user.email);
    });

    it("should throw an error if user not found", async function () {
      try {
        await userService.getUserByEmail("nonexistent@example.com");
      } catch (error) {
        expect(error.message).to.equal("User not found");
      }
    });
  });

  describe("authenticateUser", function () {
    it("should authenticate a user with correct credentials", async function () {
      const isAuthenticated = await userService.authenticateUser(
        user.email,
        "Test1234!"
      );

      expect(isAuthenticated).to.be.true;
    });

    it("should not authenticate a user with incorrect credentials", async function () {
      const isAuthenticated = await userService.authenticateUser(
        user.email,
        "WrongPassword"
      );

      expect(isAuthenticated).to.be.false;
    });
  });
});
