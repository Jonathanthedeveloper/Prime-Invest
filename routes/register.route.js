const express = require('express');
const router = express.Router();
const {registerUser, renderLoginPage} = require('../controllers/user.controller');




router.route('/')
    .get(renderLoginPage)
    .post(registerUser)



module.exports = router;