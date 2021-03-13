'use strict';

const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const Usuario = require('../models/usuario.model');

router.post('/registro-usuario', (req, res) => {
    let usuario = JSON.parse(req.body.usuario)

    let nuevo_usuario = new Usuario({
        'nombre': usuario.nombre,
        'nacimiento': usuario.nacimiento,
        'correo': usuario.correo,
        'genero': usuario.genero,
        'contrasenna': usuario.contrasenna,
        'confirmar': usuario.confirmar,
        'tipo_usuario': usuario.tipo_usuario
    });
    usuario.listas.forEach(lista => {
        nuevo_usuario.listas.push(lista._id)
    });
    nuevo_usuario.save((err, usuario_bd) => {
        if (err) {
            res.json({
                success: false,
                msj: 'El usuario no se pudo registrar.',
                err
            })
        } else {
            res.json({
                msj: 'Usuario registrado con éxito',
                usuario_bd
            })
        }
    });
});
// path: 'lista_canciones',
//         populate: {
//             path: 'artistas',
//             model: 'Artista'
//         }

router.get('/listar-usuarios', (req, res) => {
    Usuario.find().populate({
        path: 'listas',
        populate: {
            path: 'listas',
            model: 'Cancion',
        }
    }).exec((err, lista_usuarios) => {
        if (err) {
            res.json({
                msj: 'No se encontraron usuarios',
                err
            });
        } else {
            res.json({
                lista_usuarios
            });
        }
    });

    // Usuario.find().populate('listas').exec((err, listas_reproduccion) => {
    //     if (err) {
    //         res.json({
    //             msj: 'No se encontraron ejercicios',
    //             err
    //         });
    //     } else {
    //         res.json({
    //             listas_reproduccion
    //         });
    //     }
    // });

    // ('listas').exec((err, lista_usuarios) => {
    //     if (err) {
    //         res.json({
    //             msj: 'No se encontraron usuarios',
    //             err
    //         });
    //     } else {
    //         res.json({
    //             lista_usuarios
    //         });
    //     }
    // });
});

router.get('/buscar-usuario', (req, res) => {
    Usuario.findOne({ correo: req.query.correo }, (err, usuario) => {
        if (err) {
            res.json({
                msj: 'No se encontro el usuario',
                err
            });
        } else {
            res.json({
                usuario
            });
        }
    })
});

router.put('/modificar-usuario', (req, res) => {
    let obj_usuario = JSON.parse(req.body.usuario);

    // obj_usuario.listas.forEach(lista => {
    //     Usuario.listas.push(lista._id);
    // });

    Usuario.updateOne({ _id: obj_usuario._id }, {
        $set: {
            nombre: obj_usuario.nombre,
            nacimiento: obj_usuario.nacimiento,
            correo: obj_usuario.correo,
            genero: obj_usuario.genero,
            contrasenna: obj_usuario.contrasenna,
            confirmar: obj_usuario.confirmar,
            tipo_usuario: obj_usuario.tipo_usuario,
            listas: obj_usuario.listas
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
});

router.post('/eliminar-usuario', (req, res) => {
    Usuario.findOneAndDelete({ _id: req.body._id }, (err, usuario) => {
        if (err) {
            res.json({
                msj: 'No se encontro el cantante',
                err
            });
        } else {
            res.json({
                msj: 'Cantante eliminado',
                usuario
            });
        }
    });
})

module.exports = router;