const express = require("express");
const router = express.Router();

//Importing routes
const notFoundRoute = require("./notfound.route");
const historyRoute = require("./history.route")

// configuring routes
router.use("/", historyRoute);
router.use("/notfound", notFoundRoute);

// exporting router middleware
module.exports = router;