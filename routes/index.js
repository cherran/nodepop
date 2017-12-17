var express = require('express');
var router = express.Router();

const i18n = require('i18n');

/* GET home page. */
router.get('/', function(req, res, next) {
    i18n.init(req, res);
    res.end(res.__('WELCOME'));
    // res.render('index', { title: 'Express' });
});

module.exports = router;
