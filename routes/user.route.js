const express = require("express");
const router = express.Router();


//Importing routes
const transactionRoute = require('./transaction.route');
const dashboardRoute = require("./dashboard.route");
const loginRoute = require("./login.route");
const forgotPasswordRoute = require("./forgot-password.route");
const registerRoute = require("./register.route");
const notFoundRoute = require("./notfound.route");

// configuring routes
router.use("/transaction", transactionRoute)
router.use("/dashboard", dashboardRoute);
router.use("/login", loginRoute);
router.use("/forgot-password", forgotPasswordRoute);
router.use("/create", registerRoute);
router.use("/notfound", notFoundRoute);

// exporting router middleware
module.exports = router;