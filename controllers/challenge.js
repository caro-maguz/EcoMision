'use strict'

var Challenge = require('../models/challenge');

// Obtener todos los desafíos
var getChallenges = (req, res) => {
    Challenge.find()
        .then(challenges => {
            res.status(200).send({ challenges });
        })
        .catch(err => {
            res.status(500).send({ message: 'Error al obtener desafíos' });
        });
};

// Obtener solo desafíos activos
var getActiveChallenges = (req, res) => {
    Challenge.find({ active: true })
        .then(challenges => {
            res.status(200).send({ challenges });
        })
        .catch(err => {
            res.status(500).send({ message: 'Error al obtener desafíos activos' });
        });
};

// Obtener desafíos por categoría
var getChallengesByCategory = (req, res) => {
    var category = req.params.category;

    Challenge.find({ category: category, active: true })
        .then(challenges => {
            res.status(200).send({ challenges });
        })
        .catch(err => {
            res.status(500).send({ message: 'Error al buscar desafíos' });
        });
};

module.exports = {
    getChallenges,
    getActiveChallenges,
    getChallengesByCategory
};