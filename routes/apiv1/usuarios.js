'use strict';

const debug = require('debug')('nodepop:apiv1/usuarios');

const express = require('express');
const router = express.Router();

// express-validator
const { check, validationResult } = require('express-validator/check');

const NodepopError = require('../../lib/nodepopError');

// Load Anuncios model
const Usuario = require('../../models/Usuario');

const sha256 = require('sha256');
const jwt = require('jsonwebtoken');


/**
 * POST /usuarios
 * Crea un usuario (registro)
 */
router.post('/',
// Email validator    
    check('email').isEmail().withMessage('EMAIL_ERROR'),    
    (req, res, next) => {

        try {
            const errors = validationResult(req)
            // validationResult(req).throw();
            if (!errors.isEmpty()) {
                debug('There are validation errors:', errors.array());
            }
            else {
                debug('Validation succeeded'); // Data from form is valid.
                
                let userData = req.body;
                userData.clave = sha256(userData.clave); // Not storing clave, only its sha256 hash
                
                const usuario = new Usuario(req.body);

                usuario.save((err) => {
                    if (err){
                        if (err.name === 'MongoError' && err.code === 11000) { // Email already stored in database
                            next(new NodepopError('USER_POST_ERROR', 422, [{msg: 'EMAIL_DUPLICATED_ERROR'}]));
                        } else {
                            next(err);
                        }
                        next(err);
                        return;
                    }
                    res.json({ success: true });
                });
            }            
            errors.throw();
        } catch (errors) {
            let err = (errors.array) ? 
                new NodepopError('USER_POST_ERROR', 422, errors.array()) :
                new NodepopError('USER_POST_ERROR', 500);
            next(err);
        }
    });


router.post('/authenticate', async (req, res, next) => {
    
    const email = req.body.email;
    const clave = sha256(req.body.clave);
    
    const user = await Usuario.find({email})
    
    try {
        if (user[0].email != email || user[0].clave != clave) {
            let err =  new NodepopError('LOGIN_ERROR', 401);
            next(err);
        }
        else {
            const userToSign = { _id: user[0]._id};
            jwt.sign(userToSign, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            }, (err, token) => {
            if (err) {
            next(err);
            return;
        }
    
        // y lo devolvemos (el token)
        res.json({token: token});
      });
        }
    }
    catch (err) {
        err =  new NodepopError('LOGIN_NOUSER_ERROR', 401);
        next(err);
    }

});

module.exports = router;