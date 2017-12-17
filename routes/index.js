var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
    res.end(res.__('WELCOME'));
});

module.exports = router;
