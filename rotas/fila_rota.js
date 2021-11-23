//Rota: /pessoas (localhost:3000/pessoas)

const express = require('express');
const rota = express.Router();

const filaController = require('../controller/fila_controller');

rota.get('/listar', filaController.listar);
rota.get('/inserir', filaController.inserir);

module.exports = rota;