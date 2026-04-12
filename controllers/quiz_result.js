'use strict'

var QuizResult = require('../models/quiz_result');

// Obtener todos los resultados
var getQuizResults = (req, res) => {
    QuizResult.find()
        .then(results => {
            res.status(200).send({ results });
        })
        .catch(err => {
            res.status(500).send({ message: 'Error al obtener resultados' });
        });
};

// Obtener resultados por usuario
var getQuizResultsByUser = (req, res) => {
    var userId = req.params.userId;

    QuizResult.find({ user_id: userId })
        .then(results => {
            res.status(200).send({ results });
        })
        .catch(err => {
            res.status(500).send({ message: 'Error al obtener resultados del usuario' });
        });
};

module.exports = {
    getQuizResults,
    getQuizResultsByUser
};