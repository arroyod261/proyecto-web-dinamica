'use strict'

const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario.model');

router.post('/inicar-sesion', (req, res) => {
    Usuario.findOne({ correo: req.body.correo }, (err, usuario) => {
        if (usuario) {
            if (usuario.contrasenna == req.body.contrasenna) {
                res.json({
                    success: true,
                    usuario: usuario
                })
                sessionStorage.setItem('usuario_actual', JSON.stringify(usuario));
                window.location.href = 'crear-lista.html'
            } else {
                res.json({
                    success: false
                })
            }
        } else {
            res.json({
                msj: 'El usuario no existe.',
                err
            })
        }
    })
});

// router.post('/inicar-sesion', (req, res) => {
//     let correo = req.body.correo;
//     let contrasenna = req.body.contrasenna;
//     Usuario.findOne({ correo: correo }, (err, usuario) => {
//         if (usuario) {
//             if (usuario.contrasenna == contrasenna) {
//                 res.json({
//                     succes: true,
//                     usuario: usuario
//                 })
//             } else {
//                 res.json({
//                     msj: 'No se encontro el usuario.',
//                     err
//                 })
//             }
//         } else {
//             res.json({
//                 succes: false,
//                 msj: 'El usuario no existe.'
//             })
//         }
//     })
// });

module.exports = router;