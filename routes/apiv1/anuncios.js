'use strict';

const debug = require('debug')('nodepop:apiv1/anuncios');

const express = require('express');
const router = express.Router();

// express-validator
const { query, validationResult } = require('express-validator/check');

// Load Anuncios model
const Anuncio = require('../../models/Anuncio');

const NodepopError = require('../../lib/nodepopError');


/**
 * GET /anuncios
 * Get a list of Anuncios
 */
router.get('/',
    query('venta').isBoolean().withMessage('must be a boolean'),
    query('tag').isIn(Anuncio.getTags()).withMessage('No está en el enum'),
    async (req, res, next) => {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()) {
                debug('There are validation errors:', errors.array());
            }
            else {
                debug('Validation succeeded'); // Data from form is valid.
                const filter = {};
                const listResult = await Anuncio.list(filter);
                res.json(listResult);
            }            
            errors.throw();
        } catch (errors) {
            let err = new NodepopError('ANUNCIOS_GET_ERROR', 500, errors.array());
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