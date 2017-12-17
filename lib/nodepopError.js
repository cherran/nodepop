'use strict';

function NodepopError (code, status) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    
    this.code = code;
    this.status = status;
}

module.exports = NodepopError;