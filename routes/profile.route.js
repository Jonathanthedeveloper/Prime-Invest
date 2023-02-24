const express = require('express');
const router = express.Router();
const {renderProfile} = require("../controllers/user.controller");
const fetchUserData = require('../middlewares/fetchUserData.middleware')

router.get('/',fetchUserData, renderProfile);


module.exports = router;