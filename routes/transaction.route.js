const express = require("express");
const router = express.Router();

//Importing routes
const notFoundRoute = require("./notfound.route");
const depositRoute = require("./deposit.route");
const checkout = require("./checkout.route");
const invest = require("./invest.route");
const withdraw = require("./withdraw.route");
const history = require("./history.route");

// configuring routes
router.use("/notfound", notFoundRoute);
router.use("/deposit", depositRoute);
router.use("/checkout", checkout);
router.use("/invest", invest);
router.use("/withdraw", withdraw);
router.use("/history", history);

// exporting router middleware
module.exports = router;