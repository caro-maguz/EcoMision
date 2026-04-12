'use strict'

var express = require('express');
var QuizResultController = require('../controllers/quiz_result');

var router = express.Router();

router.get('/quiz-results', QuizResultController.getQuizResults);
router.get('/quiz-results/user/:userId', QuizResultController.getQuizResultsByUser);

module.exports = router;