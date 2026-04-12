'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var router = express.Router();

router.get('/users', UserController.getUsers);
router.get('/user/:id', UserController.getUser);

module.exports = router;