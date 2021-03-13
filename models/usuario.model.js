'use strict';

const mongoose = require('mongoose');

const schema_usuario = mongoose.Schema({
    nombre: { type: String, required: true, unique: false },
    nacimiento: { type: Date, required: true, unique: false },
    correo: { type: String, required: true, unique: true },
    genero: { type: String, required: true, unique: false },
    contrasenna: { type: String, required: true, unique: true },
    confirmar: { type: String, required: true, unique: true },
    tipo_usuario: { type: String, required: true, unique: false },
    listas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lista'
    }]
});

module.exports = mongoose.model('Usuario', schema_usuario, 'usuarios');