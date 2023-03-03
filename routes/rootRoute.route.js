const express = require("express");
const router = express.Router();

const userRoute = require('./user.route')
// const adminRoute = require('./admin.route')

//Importing routes
// const aDashboard = require('./adminDashboard.route')
const aboutRoute = require("./about.route");
const contactRoute = require("./contact.route");
const faqRoute = require("./faq.route");
const servicesRoute = require("./service.route");
const indexRoute = require("./index.route");
const policyRoute = require("./policy.route");
const help = require("./help.route");
// const adminDeposit = require("./adminDeposit.route");
// const adminWithdraw = require("./adminWithdraw.route");
// const adminUsers = require("./adminUsers.route");
// const adminRefer = require("./adminRefer.route");
// const adminPersonalProfile = require("./adminPersonalProfile.route");

// const loginRoute = require("./login.route");
// const forgotPasswordRoute = require("./forgot-password.route");
// const registerRoute = require("./register.route");
// const notFoundRoute = require("./notfound.route");
// const depositRoute = require("./deposit.route");
// const checkout = require("./checkout.route");
// const invest = require("./invest.route");
// const withdraw = require("./withdraw.route");
// const referral = require("./referral.route");
// const profile = require("./profile.route");
// const history = require("./history.route");
// const dashboardRoute = require("./dashboard.route");

// configuring routes

// router.use("/adminDashboard", aDashboard);
// router.use("/admin", adminRoute);
router.use("/user", userRoute)
router.use("/", indexRoute);
router.use("/index", indexRoute);
router.use("/aboutUs", aboutRoute);
router.use("/contact", contactRoute);
router.use("/faq", faqRoute);
router.use("/services", servicesRoute);
router.use("/policy", policyRoute);
router.use("/help", help);
// router.use("/adminDeposit", adminDeposit);
// router.use("/adminWithdraw", adminWithdraw);
// router.use("/adminUsers", adminUsers);
// router.use("/adminRefer", adminRefer);
// router.use("/adminPersonalProfile", adminPersonalProfile);
// router.use("/notfound", notFoundRoute);
// router.use("/create", registerRoute);
// router.use("/forgot-password", forgotPasswordRoute);
// router.use("/deposit", depositRoute);
// router.use("/checkout", checkout);
// router.use("/dashboard", dashboardRoute);
// router.use("/login", loginRoute);
// router.use("/invest", invest);
// router.use("/withdraw", withdraw);
// router.use("/history", history);
// router.use("/profile", profile);
// router.use("/referral", referral);

// exporting router middleware
module.exports = router;
