'use strict';

const { error } = require('console');
const express = require('express');
const router = express.Router();
const Lista = require('../models/lista.model');

router.post('/crear-lista', (req, res) => {
    let lista = JSON.parse(req.body.lista)

    let nueva_lista = new Lista({
        'nombre_lista': lista.nombre_lista
    });

    lista.listas.forEach(cancion => {
        nueva_lista.listas.push(cancion._id)
    });

    nueva_lista.save((err, lista_bd) => {
        if (err) {
            res.json({
                msj: 'La lista no se pudo crear',
                err
            })
        } else {
            res.json({
                msj: 'Lista creada correctamente',
                lista_bd
            })
        }
    });
});

router.get('/listas-reproduccion', (req, res) => {
    Lista.find().populate('listas').exec((err, listas_reproduccion) => {
        if (err) {
            res.json({
                msj: 'No se encontraron ejercicios',
                err
            });
        } else {
            res.json({
                listas_reproduccion
            });
        }
    });
});

router.get('/buscar-lista', (req, res) => {
    Lista.findOne({ nombre_lista: req.query.nombre_lista }, (err, lista) => {
        if (err) {
            res.json({
                msj: 'No se encontro el usuario',
                err
            });
        } else {
            res.json({
                lista
            });
        }
    })
});


router.put('/modificar-lista', (req, res) => {
    let lista = JSON.parse(req.body.lista)

    Lista.updateOne({ _id: lista._id }, {
        $set: {
            nombre_lista: lista.nombre_lista,
            listas: lista.listas
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
})

router.post('/registrar-lista', (req, res) => {
    let lista = JSON.parse(req.body.lista)
    let nueva_lista = new Lista({
        'nombre_lista': lista.nombre_lista,
    });
    lista.listas.forEach(cancion => {
        nueva_lista.listas.push(cancion._id)
    });

    Usuario.update({ _id: lista._id }, {
            $push: {
                'listas': {
                    nueva_lista
                }
            }
        }),
        (err) => {
            if (err) {
                return err;
            }
        }
    if (err) {
        return res.json({
            success: false,
            msj: 'Invalido'
        })
    } else {
        return res.json({
            success: true,
            msj: 'Exito'
        })
    }

});

router.post('/eliminar-lista', (req, res) => {
    Lista.findOneAndDelete({ _id: req.body._id }, (err, lista) => {
        if (err) {
            res.json({
                msj: 'No se encontro el cantante',
                err
            });
        } else {
            res.json({
                msj: 'Lista eliminado',
                lista
            });
        }
    });
})

module.exports = router;