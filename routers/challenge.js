'use strict'

var express = require('express');
var ChallengeController = require('../controllers/challenge');

var router = express.Router();

router.get('/challenges', ChallengeController.getChallenges);
router.get('/challenges/active', ChallengeController.getActiveChallenges);
router.get('/challenges/category/:category', ChallengeController.getChallengesByCategory);

module.exports = router;