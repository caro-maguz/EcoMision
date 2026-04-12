'use strict'

var express = require('express');
var TreeController = require('../controllers/tree');

var router = express.Router();

router.get('/trees', TreeController.getTrees);
router.get('/trees/visible', TreeController.getVisibleTrees);
router.get('/trees/user/:userId', TreeController.getTreesByUser);

module.exports = router;