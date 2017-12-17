'use strict';

const debug = require('debug')('nodepop:apiv1/anuncios');

const express = require('express');
const router = express.Router();

// Load Anuncios model
const Anuncio = require('../../models/Anuncio');

const NodepopError = require('../../lib/nodepopError');


/**
 * GET /anuncios
 * Get a list of Anuncios
 */
router.get('/', async (req, res, next) => {
    try {
        
        const listResult = await Anuncio.list(filter);
        res.json(listResult);
    } catch (err) {
        debug(err);
        err = new NodepopError('ANUNCIOS_GET_ERROR', 500);
        next(err)
    }
});

module.exports = router;