'use strict';

const mongoose = require('mongoose');

const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: { type: [{ type: String, enum: ['work', 'lifestyle', 'motor', 'mobile'] }] }
});



anuncioSchema.statics.list = (filters) => {
    const query = Anuncio.find(filters); // Not executing query yet

    return query.exec(); // Executing query and returning it as a Promise
};

anuncioSchema.statics.getTags = () => {
    return anuncioSchema.path('tags').caster.enumValues;
};

// Creating the model
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

// Exporting the model
module.exports = Anuncio;
