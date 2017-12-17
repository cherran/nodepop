'use strict';

function NodepopError (code, status) {
    this.code = code;
    this.status = status;
    this.message = null;
}

module.exports = NodepopError;