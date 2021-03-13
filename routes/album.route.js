'use strict';

const express = require('express');
const router = express.Router();
const Album = require('../models/album.model');

router.post('/registro-album', (req, res) => {
    let album = JSON.parse(req.body.album)

    let nuevo_album = new Album({
        'codigo': album.codigo,
        'nombre_album': album.nombre_album,
        'cant_canciones': album.cant_canciones,
        'duracion': album.duracion
    });
    nuevo_album.save((err, album_bd) => {
        if (err) {
            res.json({
                msj: 'El album no se pudo registrar',
                err
            })
        } else {
            res.json({
                msj: 'EL album se registró correctamente',
                album_bd
            })
        }
    });
});

router.get('/listar-album', (req, res) => {
    Album.find((err, listar_album) => {
        if (err) {
            res.json({
                msj: 'No se encontraron ejercicios',
                err
            });
        } else {
            res.json({
                listar_album
            });
        }
    });
});

router.get('/buscar-album', (req, res) => {
    Album.findOne({ codigo: req.query.codigo }, (err, album) => {
        if (err) {
            res.json({
                msj: 'No se encontraro ejercicio',
                err
            });
        } else {
            res.json({
                album
            });
        }
    })
});

router.put('/modificar-album', (req, res) => {
    let obj_album = JSON.parse(req.body.album);

    Album.updateOne({ _id: obj_album._id }, {
        $set: {
            codigo: obj_album.codigo,
            nombre_album: obj_album.nombre_album
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: 'No se pudo modificar el album',
                err
            });
        } else {
            res.json({
                info
            });
        }
    })
});

router.post('/eliminar-album', (req, res) => {
    Album.findOneAndDelete({ _id: req.body._id }, (err, album) => {
        if (err) {
            res.json({
                msj: 'No se encontro el cantante',
                err
            });
        } else {
            res.json({
                msj: 'Cantante eliminado',
                album
            });
        }
    });
})

module.exports = router;