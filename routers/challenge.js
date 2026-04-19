'use strict'

var express = require('express');
var ChallengeController = require('../controllers/challenge');

var router = express.Router();

/* READ */
router.get('/challenges', ChallengeController.getChallenges);
router.get('/challenges/active', ChallengeController.getActiveChallenges);
router.get('/challenges/category/:category', ChallengeController.getChallengesByCategory);

/* CREATE */
router.post('/challenge', ChallengeController.createChallenge);

/* UPDATE */
router.put('/challenge/:id', ChallengeController.updateChallenge);

/* DELETE */
router.delete('/challenge/:id', ChallengeController.deleteChallenge);
// Asignar Reto
router.get('/challenge/daily/:userId', ChallengeController.getDailyChallenge);
// Completar Reto
router.post('/challenge/complete', ChallengeController.completeChallenge);


module.exports = router;