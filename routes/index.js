var express = require('express');
var router = express.Router();

const i18n = require('i18n');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.end(res.__('WELCOME'));
});

module.exports = router;
