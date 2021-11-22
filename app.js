const express = require('express');
const app = express();
const porta = 3000;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const loginRota = require('./rotas/login_rota');
app.use('/login', loginRota);

// Valida o Token JWT
//app.use('/usuarios', usuarioController.validarToken, pessoasRota);

const usuarioRota = require('./rotas/usuario_rota');
app.use('/usuarios', usuarioRota);

const pessoasRota = require('./rotas/pessoas_rota');
app.use('/pessoas', pessoasRota);

app.listen(porta, () =>
    console.log(`Iniciando o servidor na porta ${porta}`)
);