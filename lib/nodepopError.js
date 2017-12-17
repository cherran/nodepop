'use strict';

function NodepopError (code, status, validationErrors) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    
    this.code = code;
    this.status = status;
    this.validationErrors = validationErrors;
}

module.exports = NodepopError;