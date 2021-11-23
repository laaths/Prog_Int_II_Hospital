//Rota: /login (localhost:3000/login)

const express = require('express');
const rota = express.Router();

const usuarioController = require('../controller/usuario_controller');

rota.post('/', usuarioController.validarUsuario);


const { requiresAuth } = require('express-openid-connect');

rota.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

module.exports = rota;