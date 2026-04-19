'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var router = express.Router();

router.get('/users', UserController.getUsers);          //LISTARTODOS
router.get('/user/:id', UserController.getUser);        //LISTARID
router.put('/user/:id', UserController.updateUser);     // UPDATE
router.delete('/user/:id', UserController.deleteUser);  // DELETE
router.post('/register', UserController.createUser);       // CREATE
router.post('/login', UserController.loginUser);        //Login

module.exports = router;