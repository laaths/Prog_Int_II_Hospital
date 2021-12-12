const express = require('express');
const rota = express.Router();

const atendimentoController = require('../controller/atendimento_controller');

rota.get('/listar', atendimentoController.listar);
rota.post('/inserir', atendimentoController.inserir);
rota.get('/:id', atendimentoController.buscarPorId);
rota.put('/:id', atendimentoController.atualizar);
rota.delete('/:id', atendimentoController.deletar);

module.exports = rota;