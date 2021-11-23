const express = require('express');
const app = express();
const porta = 3000;
const usuarioController = require('./controller/usuario_controller');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


const loginRota = require('./rotas/login_rota');
app.use('/login', loginRota);

// Valida o Token JWT
const pessoasRota = require('./rotas/pessoas_rota');
app.use('/usuarios', usuarioController.validarToken, pessoasRota);

const usuarioRota = require('./rotas/usuario_rota');
app.use('/usuarios', usuarioRota);

//const pessoasRota = require('./rotas/pessoas_rota');
app.use('/pessoas', pessoasRota);

const filaRota = require('./rotas/fila_rota');
app.use('/fila', filaRota);

app.listen(porta, () =>
    console.log(`Iniciando o servidor na porta ${porta}`)
);

/*
// Configuração do auth0

const { auth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tZSI6InNlbmFjIiwiaWF0IjoxNjM3NjI0Mjg3LCJleHAiOjE2Mzc2Mjc4ODd9.dJBD__zt7yj5h9btEK63u1NI0qv1tlJmvnMz45mq68M',
    baseURL: 'http://localhost:3000',
    clientID: 'OIKe1aA3r0UTLPpgEvixLopLXhIjJxfg',
    issuerBaseURL: 'https://dev-igcui6kh.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});*/