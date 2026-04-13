'use strict'

var express = require('express');
var HistoryController = require('../controllers/history');

var router = express.Router();

router.get('/history', HistoryController.getHistory); //TODAS
router.get('/history/user/:userId', HistoryController.getHistoryByUser); // PORID
router.post('/history', HistoryController.createHistory); //CREATE 
router.put('/history/:id', HistoryController.updateHistory); // UPDATE
router.delete('/history/:id', HistoryController.deleteHistory);// DELETE


module.exports = router;