const express = require('express');
const app = express();
const porta = 3000;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const pessoasRota = require('./rotas/pessoas_rota');
app.use('/pessoas', pessoasRota);


app.listen(porta, () =>
    console.log(`Iniciando o servidor na porta ${porta}`)
);