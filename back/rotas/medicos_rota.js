const express = require('express');
const rota = express.Router();

const medicoController = require('../controller/medicos_controller');

rota.get('/listar', medicoController.listar);
rota.post('/inserir', medicoController.inserir);
rota.get('/:id', medicoController.buscarPorId);
rota.put('/:id', medicoController.atualizar);
rota.delete('/:id', medicoController.deletar);

module.exports = rota;