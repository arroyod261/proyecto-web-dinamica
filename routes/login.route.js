'use strict';

var express = require("express");
var router = express.Router();
const Usuario = require('../models/usuario.model');

router.post('/login', function(req, res) {

    var correo = req.body.correo;

    Usuario.find({ correo: correo }).exec()
        .then(function(resultado) {
            res.json(resultado);
        })
        .catch(function(error) {
            console.log(error)
        })
})

module.exports = router;