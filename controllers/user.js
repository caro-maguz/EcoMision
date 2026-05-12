'use strict'

var User = require('../models/user');
var bcrypt = require('bcryptjs');  // Encriptación
var jwt = require('jsonwebtoken'); // Inicio de sesion

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


// REGISTER – Crear usuario con contraseña segura
var createUser = (req, res) => {
    var data = req.body;

    // Validación fuerte
    if (
        !data.email ||
        !data.password ||
        data.email.trim() === '' ||
        data.password.trim() === ''
    ) {
        return res.status(400).send({
            message: 'Correo y contraseña son obligatorios'
        });
    }

    // Validar formato del correo
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return res.status(400).send({
            message: 'El correo no tiene un formato válido'
        });
    }

    User.findOne({ email: data.email })
        .then(userFound => {
            if (userFound) {
                return res.status(409).send({
                    message: 'El correo ya está registrado'
                });
            }

            var user = new User({
                name: data.name,
                email: data.email.trim().toLowerCase(),
                password_hash: bcrypt.hashSync(data.password, 10),
                first_quiz_completed: false
            });

            return user.save();
        })
        .then(() => {
            res.status(201).send({
                message: 'Usuario registrado correctamente'
            });
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error al crear usuario'
            });
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

// LOGIN – Iniciar sesión
var loginUser = (req, res) => {
    var data = req.body;

    // Validar campos
    if (!data.email || !data.password) {
        return res.status(400).send({
            message: 'Correo y contraseña son obligatorios'
        });
    }

    User.findOne({ email: data.email })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: 'Usuario no encontrado'
                });
            }

            // Comparar contraseña ingresada con el hash guardado
            var passwordValid = bcrypt.compareSync(
                data.password,
                user.password_hash
            );

            if (!passwordValid) {
                return res.status(401).send({
                    message: 'Contraseña incorrecta'
                });
            }

            // Crear token JWT
            var token = jwt.sign(
                {
                    id: user._id,
                    email: user.email
                },
                'SECRET_KEY_ECOMISION',
                { expiresIn: '1d' }
            );

            // Respuesta correcta
            res.status(200).send({
                token
            });
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error en el login'
            });
        });
};


module.exports = {
    createUser,
    getUsers,
    loginUser,
    getUser,
    updateUser,
    deleteUser
};
