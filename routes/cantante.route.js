'use strict';

const express = require('express');
const router = express.Router();
const Cantante = require('../models/cantante.model');

router.post('/registro-cantante', (req, res) => {
    let cantante = JSON.parse(req.body.cantante)

    let nuevo_cantante = new Cantante({
        'nombre_artista': cantante.nombre_artista,
        'fecha_nacimiento': cantante.fecha_nacimiento,
        'casa_disquera': cantante.casa_disquera
    });

    nuevo_cantante.save((err, cantante_bd) => {
        if (err) {
            res.json({
                msj: 'El cantante no se pudo registrar',
                err
            })
        } else {
            res.json({
                msj: 'EL cantante se registró correctamente',
                cantante_bd
            })
        }
    });
});

router.get('/listar-cantantes', (req, res) => {
    // Cantante.find().populate('lista_album').exec((err, lista_album) => {
    //     if (err) {
    //         res.json({
    //             msj: 'No se encontraron ejercicios',
    //             err
    //         });
    //     } else {
    //         res.json({
    //             lista_album
    //         });
    //     }
    // });

    Cantante.find().populate('lista_album').exec((err, lista_cantantes) => {
        if (err) {
            res.json({
                msj: 'No se encontraron ejercicios',
                err
            });
        } else {
            res.json({
                lista_cantantes
            });
        }
    });
});

router.get('/buscar-cantante', (req, res) => {
    Cantante.findOne({ nombre_artista: req.query.nombre_artista }, (err, cantante) => {
        if (err) {
            res.json({
                msj: 'No se encontro el cantante',
                err
            });
        } else {
            res.json({
                cantante
            });
        }
    });
});

router.put('/modificar-cantante', (req, res) => {
    let obj_cantante = JSON.parse(req.body.cantante);

    Cantante.updateOne({ _id: obj_cantante._id }, {
        $set: {
            nombre_artista: obj_cantante.nombre_artista,
            fecha_nacimiento: obj_cantante.fecha_nacimiento,
            casa_disquera: obj_cantante.casa_disquera,
            lista_album: obj_cantante.lista_album
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
    })
});

router.post('/eliminar-cantante', (req, res) => {
    Cantante.findOneAndDelete({ _id: req.body._id }, (err, cantante) => {
        if (err) {
            res.json({
                msj: 'No se encontro el cantante',
                err
            });
        } else {
            res.json({
                msj: 'Cantante eliminado',
                cantante
            });
        }
    });
})


module.exports = router;