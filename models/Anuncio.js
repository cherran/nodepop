'use strict';

const mongoose = require('mongoose');

const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

// Creating the model
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

// Exporting the model
module.exports = Anuncio;