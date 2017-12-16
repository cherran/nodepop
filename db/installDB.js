'use strict';

let debug = require('debug')('nodepop:installDB');

// Connecting to the mongoDB database
require('../lib/mongooseConnect');

const Anuncio = require('../models/Anuncio');

// Loading data from anuncios.json
const json = require('./anuncios.json');


const loadData = async (model, data) => {
    try {
        for(const item of data) {
            const itemModel = new model(item);
            const itemSaved = await itemModel.save();
            debug(`New ${model.modelName} saved in ${model.modelName}s database`);
        }
    } catch (err) {
        debug(`Error saving ${model.modelName} from json to the database`, err); 
    }
};


const installDataBase = async (model, data) => {
    const removed = await model.remove({});
    debug(`${removed.result.n} elements removed from ${model.modelName}s collection`)
    await loadData(model, data);
};


installDataBase(Anuncio, json.anuncios)
.then(() => {
    debug('Sample DB installed');
    process.exit(0);
})
.catch(err => {
    debug('There was an error', err)
});
