'use strict';

const mongoose = require('mongoose');
const connection = mongoose.connection;
var debug = require('debug')('nodepop:mongooseConnect');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect('mongodb://localhost/nodepop', {
    useMongoClient: true
});

connection.once('open', () => {
    debug(`Conectado a MongoDB en ${mongoose.connection.name}`)
});

// Connection error
connection.on('error', err => {
    debug('Error connecting to the database:', err);
    process.exit(1);
});
