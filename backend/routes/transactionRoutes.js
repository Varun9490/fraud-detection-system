const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const auth = require("../middleware/auth");

// @route    POST api/transactions
// @desc     Create a transaction
// @access   Private
router.post("/", auth, transactionController.createTransaction);

// @route    GET api/transactions
// @desc     Get all transactions of user
// @access   Private
router.get("/", auth, transactionController.getTransactions);

module.exports = router;
