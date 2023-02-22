const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.render('invest');
});


module.exports = router;