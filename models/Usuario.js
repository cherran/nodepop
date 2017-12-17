'use strict';

const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
    nombre: String,
    email: { type: String, index: true, unique: true },
    clave: String
});


// Creating the model
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Exporting the model
module.exports = Usuario;