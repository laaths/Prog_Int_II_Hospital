const { Client } = require('pg');
require('dotenv').config();

const conexao = {
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    ssl: {
        rejectUnauthorized: false,
    }
};

//Conexao com banco de dados
exports.listar = (callback) => {

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query('SELECT * FROM fila', (err, res) => {
        callback(err, res.rows);
        cliente.end();
    });
}

exports.inserir = (fila, callback) => {
    const sql = "INSERT INTO usuario(id, pessoaid, classificacao, nfila) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [fila.id, fila.pessoaid, fila.classificacao, fila.nfila];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => {
        callback(err, res.rows[0]);
        cliente.end();
    });
}

/*
exports.inserir = (pessoaid, classifica, numerofila, callback) => {
    const verificaidade = "SELECT idade FROM pessoas where id=pessoaid"
    if (verificaidade >= 80) {
        const priorClassifica = classifica
        const pessoaid = pessoaid
        const nfila = numerofila
        const sql = "INSERT INTO fila(pessoaid, classificacao, nfila) VALUES ($1, $2, $3) RETURNING *";
        const values = [pessoaid, priorClassifica, nfila];

        const cliente = new Client(conexao);
        cliente.connect();
        cliente.query(sql, values, (err, res) => {
            callback(err, res.rows[0]);
            cliente.end();
        });
    } else {
        const sql = "INSERT INTO fila(pessoaid, classificacao) VALUES ($1, $2) RETURNING *";
        const values = [pessoaid, classifica];

        const cliente = new Client(conexao);
        cliente.connect();
        cliente.query(sql, values, (err, res) => {
            callback(err, res.rows[0]);
            cliente.end();
        });
    }
}
*/