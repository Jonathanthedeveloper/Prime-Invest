const express = require('express');
const router = express.Router();
const {registerUser} = require('../controllers/user.controller')



router.route('/')
    .get(function (req, res) {
        res.render('create');
    })
    .post(registerUser)



module.exports = router;