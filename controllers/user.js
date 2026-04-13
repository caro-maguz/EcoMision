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


//CREATE – Crear usuario 
var createUser = (req, res) => {
    var user = new User(req.body);

    user.save()
        .then(userStored => {
            res.status(201).send({ user: userStored });
        })
        .catch(err => {
            res.status(500).send({ message: 'Error al crear usuario' });
        });
};


// UPDATE – Actualizar usuario 
var updateUser = (req, res) => {
    var userId = req.params.id;
    var update = req.body;

    User.findByIdAndUpdate(userId, update, { new: true })
        .then(userUpdated => {
            if (!userUpdated) {
                return res.status(404).send({ message: 'Usuario no encontrado' });
            }
            res.status(200).send({ user: userUpdated });
        })
        .catch(err => {
            res.status(500).send({ message: 'Error al actualizar usuario' });
        });
};

// DELETE – Eliminar usuario
var deleteUser = (req, res) => {
    var userId = req.params.id;

    User.findByIdAndDelete(userId)
        .then(userRemoved => {
            if (!userRemoved) {
                return res.status(404).send({ message: 'Usuario no encontrado' });
            }
            res.status(200).send({ message: 'Usuario eliminado correctamente' });
        })
        .catch(err => {
            res.status(500).send({ message: 'Error al eliminar usuario' });
        });
};

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
};
