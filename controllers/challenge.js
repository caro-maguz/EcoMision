'use strict'

var Challenge = require('../models/challenge');
var History = require('../models/history');
var User = require('../models/user');
var mongoose = require('mongoose');

//    READ – Todos los desafíos
var getChallenges = (req, res) => {
    Challenge.find()
        .then(challenges => {
            res.status(200).send({ challenges });
        })
        .catch(() => {
            res.status(500).send({ message: 'Error al obtener desafíos' });
        });
};

  // READ – Desafíos activos
var getActiveChallenges = (req, res) => {
    Challenge.find({ active: true })
        .then(challenges => {
            res.status(200).send({ challenges });
        })
        .catch(() => {
            res.status(500).send({ message: 'Error al obtener desafíos activos' });
        });
};

//    READ – Desafíos por categoría
var getChallengesByCategory = (req, res) => {
    var category = req.params.category;

    Challenge.find({ category: category, active: true })
        .then(challenges => {
            res.status(200).send({ challenges });
        })
        .catch(() => {
            res.status(500).send({ message: 'Error al buscar desafíos' });
        });
};

//  CREATE – Crear desafío
var createChallenge = (req, res) => {
    var challenge = new Challenge(req.body);

    challenge.save()
        .then(challengeStored => {
            res.status(201).send({ challenge: challengeStored });
        })
        .catch(() => {
            res.status(500).send({ message: 'Error al crear desafío' });
        });
};

// UPDATE – Actualizar desafío
var updateChallenge = (req, res) => {
    var challengeId = req.params.id;

    Challenge.findOneAndUpdate(
        { _id: challengeId },
        req.body,
        { new: true }
    )
    .then(challengeUpdated => {
        if (!challengeUpdated) {
            return res.status(404).send({ message: 'Desafío no encontrado' });
        }
        res.status(200).send({ challenge: challengeUpdated });
    })
    .catch(() => {
        res.status(500).send({ message: 'Error al actualizar desafío' });
    });
};

//    DELETE – Eliminar desafío
var deleteChallenge = (req, res) => {
    var challengeId = req.params.id;

    Challenge.findOneAndDelete({ _id: challengeId })
        .then(challengeRemoved => {
            if (!challengeRemoved) {
                return res.status(404).send({ message: 'Desafío no encontrado' });
            }
            res.status(200).send({ message: 'Desafío eliminado correctamente' });
        })
        .catch(() => {
            res.status(500).send({ message: 'Error al eliminar desafío' });
        });
};

//   RETO DIARIO
var getDailyChallenge = async (req, res) => {
    try {
        var userId = req.params.userId;

        var today = new Date();
        today.setHours(0, 0, 0, 0);

        var historyToday = await History.findOne({
            user_id: userId,
            completed_at: { $gte: today }
        });

        if (historyToday) {
            return res.status(200).send({
                challenge: historyToday.challenge_snapshot,
                message: 'Reto del día ya completado'
            });
        }

        var challenges = await Challenge.find({ active: true });

        if (!challenges.length) {
            return res.status(404).send({ message: 'No hay retos activos' });
        }

        var randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];

        res.status(200).send({ challenge: randomChallenge });

    } catch (err) {
        res.status(500).send({ message: 'Error al obtener el reto diario' });
    }
};

// COMPLETAR RETO (ROBUSTO – FINAL)
var completeChallenge = async (req, res) => {
    try {
        const { userId, challenge } = req.body;

        if (!userId || !challenge) {
            return res.status(400).send({
                message: 'userId y challenge son obligatorios'
            });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Verificar si ya completó hoy
        const alreadyCompleted = await History.findOne({
            user_id: userId,
            completed_at: { $gte: today }
        });

        if (alreadyCompleted) {
            return res.status(409).send({
                message: 'Ya completaste un reto hoy'
            });
        }

        // Crear historial usando el reto recibido
        await History.create({
            user_id: userId,
            challenge_id: challenge._id,
            completed_at: new Date(),
            impact_registered: challenge.impact,
            challenge_snapshot: {
                title: challenge.title,
                description: challenge.description,   // ✅ agregar descripción
                category: challenge.category,
                icon: challenge.icon
            }
        });

        // Inicializar perfil si no existe
        await User.findOneAndUpdate(
            { _id: userId },
            {
                $setOnInsert: {
                    profile: {
                        challenges_completed: 0,
                        water_saved_liters: 0,
                        energy_saved_kwh: 0,
                        ecological_score: 0
                    }
                }
            },
            { upsert: true }
        );

        // Actualizar impacto
        await User.findOneAndUpdate(
            { _id: userId },
            {
                $inc: {
                    'profile.challenges_completed': 1,
                    'profile.water_saved_liters': challenge.impact.water_liters || 0,
                    'profile.energy_saved_kwh': challenge.impact.energy_kwh || 0
                }
            }
        );

        res.status(200).send({
            message: 'Reto completado correctamente'
        });

    } catch (err) {
        console.error('ERROR REAL:', err);
        res.status(500).send({
            message: 'Error al completar el reto'
        });
    }
};

module.exports = {
    getChallenges,
    getActiveChallenges,
    getChallengesByCategory,
    createChallenge,
    updateChallenge,
    deleteChallenge,
    getDailyChallenge,
    completeChallenge
};
