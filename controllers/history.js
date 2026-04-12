'use strict'

var History = require('../models/history');

// Obtener todo el historial
var getHistory = (req, res) => {
    History.find()
        .then(history => {
            res.status(200).send({ history });
        })
        .catch(err => {
            res.status(500).send({ message: 'Error al obtener el historial' });
        });
};

// Obtener historial por usuario
var getHistoryByUser = (req, res) => {
    var userId = req.params.userId;

    History.find({ user_id: userId })
        .then(history => {
            res.status(200).send({ history });
        })
        .catch(err => {
            res.status(500).send({ message: 'Error al obtener historial del usuario' });
        });
};

module.exports = {
    getHistory,
    getHistoryByUser
};