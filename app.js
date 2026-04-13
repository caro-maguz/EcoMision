'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();


   //CARGAR RUTAS 
var userRoutes = require('./routers/user');
var treeRoutes = require('./routers/tree');
var historyRoutes = require('./routers/history');
var quizResultRoutes = require('./routers/quiz_result');
var challengeRoutes = require('./routers/challenge');


   // MIDDLEWARES

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


   // CORS

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Allow', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});


   //RUTAS BASE
app.use('/api', userRoutes);
app.use('/api', treeRoutes);
app.use('/api', historyRoutes);
app.use('/api', quizResultRoutes);
app.use('/api', challengeRoutes);


  // RUTA DE PRUEBA

app.get('/test', (req, res) => {
    res.status(200).send({
        message: 'EcoMision API funcionando correctamente ✅'
    });
});


   // EXPORTAR APP
module.exports = app;