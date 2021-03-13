'use strict';

const mongoose = require('mongoose');

const schema_cancion = mongoose.Schema({
    nombre_cancion: { type: String, required: true, unique: false },
    duracion_cancion: { type: String, required: true, unique: false },
    artista: { type: String, required: true, unique: false },
    nom_album: { type: String, required: false, unique: false }
});

module.exports = mongoose.model('Cancion', schema_cancion, 'canciones');