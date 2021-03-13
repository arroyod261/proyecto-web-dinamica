'use strict';

const mongoose = require('mongoose');

const schema_album = mongoose.Schema({
    codigo: { type: String, required: true, unique: true },
    nombre_album: { type: String, required: true, unique: false },
    cant_canciones: { type: Number, required: false, unique: false },
    duracion: { type: String, required: false, unique: false },
});

module.exports = mongoose.model('Album', schema_album, 'album');