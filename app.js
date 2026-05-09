'use strict';

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// =====================
// MIDDLEWARES
// =====================
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// =====================
// RUTAS
// =====================
const userRoutes = require('./routers/user');
const treeRoutes = require('./routers/tree');
const historyRoutes = require('./routers/history');
const quizResultRoutes = require('./routers/quiz_result');
const challengeRoutes = require('./routers/challenge');

app.use('/api', userRoutes);
app.use('/api', treeRoutes);
app.use('/api', historyRoutes);
app.use('/api', quizResultRoutes);
app.use('/api', challengeRoutes);

// =====================
// RUTA DE PRUEBA
// =====================
app.get('/test', (req, res) => {
  res.status(200).send({
    message: 'EcoMision API funcionando correctamente ✅'
  });
});

// =====================
// EXPORTAR APP
// =====================
module.exports = app;