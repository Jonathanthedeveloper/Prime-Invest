const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate.middleware');
const { renderDashboard } = require('../controllers/user.controller')

router.route('/')
    .get(authenticate, renderDashboard)


module.exports = router;