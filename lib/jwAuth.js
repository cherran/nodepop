'use strict';

const jwt = require('jsonwebtoken');
const NodepopError = require('../lib/nodepopError');

// exportamos un creador de middlewares de autentificación

module.exports = () => {
    return function(req, res, next) {
    // leer token
        const token = req.body.token || req.query.token || req.get('x-access-token');
        
        if (!token) {
            const err = new NodepopError('NO_TOKEN_ERROR', 401);
            next(err);
            return;
        }
      
        // comprobar credenciales
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                const error = new NodepopError('INVALID_TOKEN_ERROR', 401);
                next(error);
                return;
            }

            // el token es válido, continuar
            // lo guardamos en el request para los siguientes middlewares
            req.userId = decoded._id;
            next();
        });
    };
};