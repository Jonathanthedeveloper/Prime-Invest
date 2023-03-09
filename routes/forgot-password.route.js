const express = require('express');
const { handleForgotPassword } = require('../controllers/user.controller');
const router = express.Router();

router.get('/', function (req, res) {
    res.render('forgotPassword');
});

router.post('/', handleForgotPassword)


module.exports = router;