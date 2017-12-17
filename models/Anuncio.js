'use strict';

const mongoose = require('mongoose');

const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: { type: [{ type: String, enum: ['work', 'lifestyle', 'motor', 'mobile'] }] }
});



anuncioSchema.statics.list = (filters, start, limit, sort) => {
    const query = Anuncio.find(filters); // Not executing query yet
    
    query.limit(limit);
    query.skip(start);
    query.sort(sort);

    return query.exec(); // Executing query and returning it as a Promise
};

// Get the posible tags defined in the model (enum)
anuncioSchema.statics.getTags = () => {
    return anuncioSchema.path('tags').caster.enumValues;
};

// Get the property names of this model
anuncioSchema.statics.getProps = () => {
    const props = [];
    for( let prop in anuncioSchema.paths) {
        props.push(prop);
    }
    return props;
};

// Creating the model
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

// Exporting the model
module.exports = Anuncio;
