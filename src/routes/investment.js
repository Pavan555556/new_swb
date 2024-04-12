const express = require("express");
const router = express.Router();
const investment = require("../controllers/investment");

// router.get("/:id", investment.getInvestmentByUserId);
const Investment = require('../models/investments');
const User = require('../models/users');

// Route to retrieve investments by user ID
router.get('/:userId', investment.getInvestmentByUserId);

module.exports = router;