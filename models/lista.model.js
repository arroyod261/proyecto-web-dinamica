'use strict';

const mongoose = require('mongoose');

const schema_lista = mongoose.Schema({
    nombre_lista: { type: String, required: true, unique: false },
    listas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cancion'
    }]
});

module.exports = mongoose.model('Lista', schema_lista, 'listas');