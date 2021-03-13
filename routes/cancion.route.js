'use strict';

const express = require('express');
const router = express.Router();
const Cancion = require('../models/cancion.model');

router.post('/registro-cancion', (req, res) => {
    let cancion = JSON.parse(req.body.cancion)

    let nueva_cancion = new Cancion({
        'nombre_cancion': cancion.nombre_cancion,
        'duracion_cancion': cancion.duracion_cancion,
        'artista': cancion.artista,
        'nom_album': cancion.nom_album
    });

    nueva_cancion.save((err, cancion_bd) => {
        if (err) {
            res.json({
                msj: 'La canción no se pudo registrar',
                err
            })
        } else {
            res.json({
                msj: 'La canción se registró correctamente',
                cancion_bd
            })
        }
    })
});

router.get('/listar-canciones', (req, res) => {
    Cancion.find((err, lista_canciones) => {
        if (err) {
            res.json({
                msj: 'No se encontraron ejercicios',
                err
            });
        } else {
            res.json({
                lista_canciones
            });
        }
    });
});

router.get('/buscar-cancion', (req, res) => {
    Cancion.findOne({ nombre_cancion: req.query.nombre_cancion }, (err, cancion) => {
        if (err) {
            res.json({
                msj: 'No se encontraro ejercicio',
                err
            });
        } else {
            res.json({
                cancion
            });
        }
    });
});

router.put('/modificar-cancion', (req, res) => {
    let obj_cancion = JSON.parse(req.body.cancion);

    Cancion.updateOne({ _id: obj_cancion._id }, {
        $set: {
            nombre_cancion: obj_cancion.nombre_cancion,
            duracion_cancion: obj_cancion.duracion_cancion,
            nom_album: obj_cancion.nom_album,
            artista: obj_cancion.artista
        }

    }, (err, info) => {
        if (err) {
            res.json({
                msj: 'No se pudo modificar el usuario',
                err
            });
        } else {
            res.json({
                info
            });
        }
    });

})

router.post('/eliminar-cancion', (req, res) => {

    Cancion.findOneAndDelete({ _id: req.body._id }, (err, cancion) => {
        if (err) {
            res.json({
                msj: 'No se encontro el cantante',
                err
            });
        } else {
            res.json({
                msj: 'Cantante eliminado',
                cancion
            });
        }
    });
})

module.exports = router;