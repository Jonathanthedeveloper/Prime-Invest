const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate.middleware')

router.route('/')
    .get(authenticate, function (req, res) {
        res.render('dashboard');
    })


module.exports = router;