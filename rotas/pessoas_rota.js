//Rota: /pessoas (localhost:3000/pessoas)

const express = require('express');
const rota = express.Router();

const pessoaController = require('../controller/pessoas_controller');

rota.get('/listar', pessoaController.listar);
rota.post('/inserir', pessoaController.inserir);
rota.get('/:id', pessoaController.buscarPorId);
rota.put('/:id', pessoaController.atualizar);
rota.delete('/:id', pessoaController.deletar);

module.exports = rota;