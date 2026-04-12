'use strict'

var Tree = require('../models/tree');

// Obtener todos los árboles
var getTrees = (req, res) => {
    Tree.find()
        .then(trees => {
            res.status(200).send({ trees });
        })
        .catch(err => {
            res.status(500).send({ message: 'Error al obtener árboles' });
        });
};

// Obtener árboles visibles en el mapa
var getVisibleTrees = (req, res) => {
    Tree.find({ visible_on_map: true })
        .then(trees => {
            res.status(200).send({ trees });
        })
        .catch(err => {
            res.status(500).send({ message: 'Error al obtener árboles visibles' });
        });
};

// Obtener árboles por usuario
var getTreesByUser = (req, res) => {
    var userId = req.params.userId;

    Tree.find({ user_id: userId })
        .then(trees => {
            res.status(200).send({ trees });
        })
        .catch(err => {
            res.status(500).send({ message: 'Error al obtener árboles del usuario' });
        });
};

module.exports = {
    getTrees,
    getVisibleTrees,
    getTreesByUser
};