//Rota: /login (localhost:3000/login)
const usuarioController = require('../controller/usuario_controller');

const express = require('express');
const rota = express.Router();




rota.post('/valida', usuarioController.validarUsuario);
rota.get('/token', usuarioController.validarToken);

module.exports = rota;