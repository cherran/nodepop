'use strict';

// Validates precio and formats it for the find() query
const validatePrecio = (precio) => {
    if(!precio) return true;

    const precioArray = precio.split('-');
   
    if (precioArray.length == 1 && isNumberAndPositive(precio)) { // 'price' pattern
        return true;
    } else if (precioArray.length == 2) {
        if (precioArray[0] == '' && isNumberAndPositive(precioArray[1])) { // '-price' pattern
            return true;
        } else if (precioArray[1] == '' && isNumberAndPositive(precioArray[0])) { // 'price-' pattern
            return true;
        } else if (isNumberAndPositive(precioArray[0]) && isNumberAndPositive(precioArray[1])) { // 'price-price' pattern
            return true;
        }
    } else {
        return false;
    }
};

const convertPrecioToQueryFormat = (precio) => {
    if(!precio) return;
    const precioArray = precio.split('-');
    
    if (precioArray.length == 1) { // 'price' pattern
        return precio;
    } else if (precioArray.length == 2) {
        if (precioArray[0] == '') { // '-price' pattern
            return { '$lte' : precioArray[1] };
        } else if (precioArray[1] == '') { // 'price-' pattern
            return { '$gte' : precioArray[0] };
        } else { // 'price-price' pattern
            return { '$gte': precioArray[0],'$lte' : precioArray[1] };
        }
    } else {
        // Unreachable, because validations were passed before
        return;
    }
};

const isNumberAndPositive = (number) => {
    return (!isNaN(number) && parseInt(number) >= 0);
};

module.exports = { validatePrecio: validatePrecio,
    convertPrecioToQueryFormat: convertPrecioToQueryFormat };