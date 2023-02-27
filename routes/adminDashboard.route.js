const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.render('adminDashboard');
});


module.exports = router;