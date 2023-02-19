const express = require('express');
const router = express.Router();



 //Importing routes
const aboutRoute = require('./about.route');
const contactRoute = require('./contact.route');
const dashboardRoute = require('./dashboard.route');
const loginRoute = require('./login.route');
const faqRoute = require('./faq.route');
const forgotPasswordRoute = require('./forgot-password.route');
const servicesRoute = require('./service.route');
const indexRoute = require('./index.route');
const policyRoute = require('./policy.route');
const registerRoute = require('./register.route');
const notFoundRoute = require('./notfound.route');


// configuring routes
router.use('/', indexRoute);
router.use('/aboutUs', aboutRoute);
router.use('/contact', contactRoute);
router.use('/dashboard', dashboardRoute);
router.use('/login', loginRoute);
router.use('/faq', faqRoute);
router.use('/forgot-password', forgotPasswordRoute);
router.use('/services', servicesRoute);
router.use('/policy', policyRoute);
router.use('/create', registerRoute);
router.use('/notfound', notFoundRoute);


// exporting router middleware
module.exports = router;