const express = require('express');
const router = express.Router();
const fetchUserData = require('../middlewares/fetchUserData.middleware');

const { handleInvestment } = require('../controllers/user.controller')

router.get('/', function (req, res) {
    res.render('invest', { status: req.flash('status') });
})
// router.post('/', fetchUserData)

router.post('/', fetchUserData, handleInvestment)


module.exports = router;