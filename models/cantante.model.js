'use strict';

const mongoose = require('mongoose');

const schema_cantante = mongoose.Schema({
    nombre_artista: { type: String, required: true, unique: true },
    fecha_nacimiento: { type: Date, required: true, unique: false },
    casa_disquera: { type: String, required: true, unique: false },
    lista_album: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    }]
});

module.exports = mongoose.model('Cantante', schema_cantante, 'cantantes');