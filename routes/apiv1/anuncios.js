'use strict';

const debug = require('debug')('nodepop:apiv1/anuncios');

const express = require('express');
const router = express.Router();

// express-validator
const { query, validationResult } = require('express-validator/check');

// Load Anuncios model
const Anuncio = require('../../models/Anuncio');

const NodepopError = require('../../lib/nodepopError');
const validatePrecio = require('../../lib/precioUtils').validatePrecio;
const convertPrecioToQueryFormat = require('../../lib/precioUtils').convertPrecioToQueryFormat;

/**
 * GET /anuncios
 * Get a list of Anuncios
 */
router.get('/',
    query('venta').isBoolean().withMessage('VENTA_ERROR').optional(),
    query('tag').isIn(Anuncio.getTags()).withMessage('TAG_ERROR').optional(),
    query('nombre'),
    query('sort').isIn(Anuncio.getProps()).withMessage('SORT_ERROR').optional(),
    query('precio').custom(validatePrecio).withMessage('PRECIO_ERROR'),

    async (req, res, next) => {
        debug('Query params:', req.query);
        try {
            const errors = validationResult(req)
            // validationResult(req).throw();
            if (!errors.isEmpty()) {
                debug('There are validation errors:', errors.array());
            }
            else {
                debug('Validation succeeded'); // Data from form is valid.
                const tag = req.query.tag;
                const venta = req.query.venta;
                const nombre = req.query.nombre;
                const precio = convertPrecioToQueryFormat(req.query.precio);
                const start = parseInt(req.query.start);
                const limit = parseInt(req.query.limit);
                const sort = req.query.sort;
                
                const filters = {};
                if (venta) filters.venta = venta;
                if (tag) filters.tags = tag;
                // RegEx to check if the property to check starts with nombre String
                if (nombre) {
                    filters.nombre = new RegExp('^' + nombre, 'i');
                }

                if (precio) {
                    filters.precio = precio;
                }

                const listResult = await Anuncio.list(filters, start, limit, sort);
                res.json(listResult);
            }            
            errors.throw();
        } catch (errors) {
            let err = (errors.array) ? 
                new NodepopError('ANUNCIOS_GET_ERROR', 422, errors.array()) :
                new NodepopError('ANUNCIOS_GET_ERROR', 500);
            next(err)
        }
});

/**
 * GET /anuncios/tags
 * Get a list of possible tags for Anuncios
 */
router.get('/tags', (req, res, next) => {
    res.json(Anuncio.getTags());
});

module.exports = router;