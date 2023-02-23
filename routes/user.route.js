const express = require("express");
const router = express.Router();


//Importing routes
const transactionRoute = require('./transaction.route');
const dashboardRoute = require("./dashboard.route");
const loginRoute = require("./login.route");
const forgotPasswordRoute = require("./forgot-password.route");
const registerRoute = require("./register.route");
const notFoundRoute = require("./notfound.route");
const depositRoute = require("./deposit.route")
const checkoutRoute = require("./checkout.route")
const investRoute = require("./invest.route");
const withdrawRoute = require("./withdraw.route")
const profileRoute = require("./profile.route");
const referralRoute = require("./referral.route");


// configuring routes
router.use("/transactions", transactionRoute)
router.use("/dashboard", dashboardRoute);
router.use("/login", loginRoute);
router.use("/forgot-password", forgotPasswordRoute);
router.use("/create", registerRoute);
router.use("/notfound", notFoundRoute);

router.use("/checkout", checkoutRoute);
router.use("/invest", investRoute);
router.use("/deposit", depositRoute);
router.use("/withdraw", withdrawRoute);
router.use("/profile", profileRoute);
router.use("/referral", referralRoute);

// exporting router middleware
module.exports = router;