const express = require('express');
const app = express();
const cors = require('cors');
const porta = 3000;
app.use(cors());
app.options('*', cors());
const usuarioController = require('./back/controller/usuario_controller');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


// Valida o Token JWT
const loginRota = require('./back/rotas/login_rota');

app.use('/login', loginRota);
// Necessita do Token JWT Validado para poder acessar
const usuarioRota = require('./back/rotas/usuario_rota');

app.use('/usuarios', usuarioController.validarToken, usuarioRota);

const pessoasRota = require('./back/rotas/pessoas_rota');
app.use('/pessoas', pessoasRota);

const filaRota = require('./back/rotas/fila_rota');
app.use('/fila', filaRota);

const atendimentoRota = require('./back/rotas/atendimento_rota');
app.use('/atendimento', atendimentoRota);

app.listen(porta, () =>
    console.log(`Iniciando o servidor na porta ${porta}`)
);