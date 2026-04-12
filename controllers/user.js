'use strict'

var User = require('../models/user');

// Obtener todos los usuarios
var getUsers = (req, res) => {
    User.find()
        .then(users => {
            res.status(200).send({ users });
        })
        .catch(err => {
            res.status(500).send({ message: 'Error al obtener usuarios' });
        });
};

// Obtener un usuario por ID
var getUser = (req, res) => {
    var userId = req.params.id;

    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: 'Usuario no encontrado' });
            }
            res.status(200).send({ user });
        })
        .catch(err => {
            res.status(500).send({ message: 'Error en la petición' });
        });
};

module.exports = {
    getUsers,
    getUser
};
