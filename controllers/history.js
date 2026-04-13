'use strict'

var History = require('../models/history');

// READ – Obtener todo el historial
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

// CREATE – Crear historial
var createHistory = (req, res) => {
    var history = new History(req.body);

    history.save()
        .then(historyStored => {
            res.status(201).send({ history: historyStored });
        })
        .catch(err => {
            res.status(500).send({ message: 'Error al crear historial' });
        });
};

// UPDATE – Actualizar historial
var updateHistory = (req, res) => {
    var historyId = req.params.id;
    var update = req.body;

    History.findByIdAndUpdate(historyId, update, { new: true })
        .then(historyUpdated => {
            if (!historyUpdated) {
                return res.status(404).send({ message: 'Historial no encontrado' });
            }
            res.status(200).send({ history: historyUpdated });
        })
        .catch(err => {
            res.status(500).send({ message: 'Error al actualizar historial' });
        });
};

// DELETE – Eliminar historial
var deleteHistory = (req, res) => {
    var historyId = req.params.id;

    History.findByIdAndDelete(historyId)
        .then(historyRemoved => {
            if (!historyRemoved) {
                return res.status(404).send({ message: 'Historial no encontrado' });
            }
            res.status(200).send({ message: 'Historial eliminado correctamente' });
        })
        .catch(err => {
            res.status(500).send({ message: 'Error al eliminar historial' });
        });
};

module.exports = {
    getHistory,
    getHistoryByUser,
    createHistory,
    updateHistory,
    deleteHistory
};