'use strict'

var express = require('express');
var TreeController = require('../controllers/tree');

var router = express.Router();

router.get('/trees', TreeController.getTrees); // TODOSTREE
router.get('/trees/visible', TreeController.getVisibleTrees); // TREEVISIBLES
router.get('/trees/user/:userId', TreeController.getTreesByUser);
router.post('/tree', TreeController.createTree); // CREATE
router.put('/tree/:id', TreeController.updateTree); // UPDATE
router.delete('/tree/:id', TreeController.deleteTree); // DELETE


module.exports = router;