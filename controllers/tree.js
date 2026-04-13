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

// CREATE – Crear árbol
var createTree = (req, res) => {
    var tree = new Tree(req.body);

    tree.save()
        .then(treeStored => {
            res.status(201).send({ tree: treeStored });
        })
        .catch(err => {
            res.status(500).send({ message: 'Error al crear árbol' });
        });
};


// UPDATE – Actualizar árbol
var updateTree = (req, res) => {
    var treeId = req.params.id;
    var update = req.body;

    Tree.findByIdAndUpdate(treeId, update, { new: true })
        .then(treeUpdated => {
            if (!treeUpdated) {
                return res.status(404).send({ message: 'Árbol no encontrado' });
            }
            res.status(200).send({ tree: treeUpdated });
        })
        .catch(err => {
            res.status(500).send({ message: 'Error al actualizar árbol' });
        });
};

// DELETE – Eliminar árbol 
var deleteTree = (req, res) => {
    var treeId = req.params.id;

    Tree.findByIdAndDelete(treeId)
        .then(treeRemoved => {
            if (!treeRemoved) {
                return res.status(404).send({ message: 'Árbol no encontrado' });
            }
            res.status(200).send({ message: 'Árbol eliminado correctamente' });
        })
        .catch(err => {
            res.status(500).send({ message: 'Error al eliminar árbol' });
        });
};


module.exports = { 
    getTrees,
    getVisibleTrees,
    getTreesByUser,
    createTree,
    updateTree,
    deleteTree

};