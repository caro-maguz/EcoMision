'use strict'

var express = require('express');
var HistoryController = require('../controllers/history');

var router = express.Router();

router.get('/history', HistoryController.getHistory);
router.get('/history/user/:userId', HistoryController.getHistoryByUser);

module.exports = router;