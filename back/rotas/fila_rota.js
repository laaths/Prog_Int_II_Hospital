//Rota: /pessoas (localhost:3000/pessoas)

const express = require('express');
const rota = express.Router();

const filaController = require('../controller/fila_controller');

rota.get('/listar', filaController.listar);
rota.get('/:classificacao', filaController.buscarPorClassificacao);
rota.post('/inserir', filaController.inserir);
rota.delete('/deletar', filaController.deletarFila);

module.exports = rota;