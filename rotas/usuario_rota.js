//Rota: /usuarios (localhost:3000/usuarios)

const express = require('express');
const rota = express.Router();

const usuarioController = require('../controller/usuario_controller');

rota.get('/listar', usuarioController.listar);
rota.post('/inserir', usuarioController.inserir);
//busca deve vir antes, senão a variavel id interpreta como id=busca
rota.get('/buscar/:username', usuarioController.buscarPorusername);
rota.put('/:id', usuarioController.atualizar)
rota.get('/:id', usuarioController.buscarPorId);

module.exports = rota;