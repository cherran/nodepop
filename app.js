var express = require('express');
var path = require('path');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
const anuncios = require('./routes/apiv1/anuncios');
const usuarios = require('./routes/usuarios');

var app = express();
require('dotenv').config(); // Require and configure dotenv


// Languages locales
const i18n = require('i18n');
const NodepopError = require('./lib/nodepopError');

i18n.configure({
    // setup some locales - other locales default to en silently
    locales:['en', 'es'],

    // you may alter a site wide default locale
    defaultLocale: 'es',

    // query parameter to switch locale (ie. /home?lang=ch) - defaults to NULL
    queryParameter: 'lang',

    // where to store json files - defaults to './locales' relative to modules directory
    directory: './locales',
  
    // setting prefix of json files name - default to none '' (in case you use different locale files naming scheme (webapp-en.json), rather then just en.json)
    prefix: 'nodepop-',
  
    // Downcase locale when passed on queryParam; e.g. lang=en-US becomes
    // en-us.  When set to false, the queryParam value will be used as passed;
    // e.g. lang=en-US remains en-US.
    preserveLegacyCase: true
});

// Connect to the mongoDB database
require('./lib/mongooseConnect');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(i18n.init);

app.use('/', index);
app.use('/apiv1/anuncios', anuncios);
app.use('/usuarios', usuarios);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new NodepopError('NOT_FOUND', 404);
    next(err);
});

// error handler
app.use(function(err, req, res, next) {

    // Translating the error code to a error message with i18n depending on the language
    err.message = res.__(err.code);
    
    let errorResponse = { error : { status: err.status, message: err.message } };   
    
    if (err.validationErrors) {
        errorResponse.reasons = [];
        for (let i = 0; i < err.validationErrors.length; i++) {
            errorResponse.reasons.push(res.__(err.validationErrors[i].msg));
        }   
    }

    
    res.status(err.status || 500);
    res.json(errorResponse);
});


module.exports = app;
