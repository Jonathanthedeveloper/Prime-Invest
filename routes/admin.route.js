const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate.middleware');

//Importing Routes
// const adminDashboard = require("./adminDashboard.route");

// configuring routes
// router.use("/adminDashboard", authenticate, adminDashboard);

router.get('/', function(req, res){
    res.render('adminDashboard')
})

module.exports = router