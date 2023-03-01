const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate.middleware');
const { renderAdminDashboard } = require('../controllers/admin.controller')

//Importing Routes
// const adminDashboard = require("./adminDashboard.route");

// configuring routes
// router.use("/adminDashboard", authenticate, adminDashboard);

const adminDepositRoute = require('./adminDeposit.route')
const adminWithdrawRoute = require('./adminWithdraw.route')


router.use('/deposit', adminDepositRoute)
router.use('/withdraw', adminWithdrawRoute)

router.get('/', renderAdminDashboard)

module.exports = router