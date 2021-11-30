const { Client } = require('pg');

const conexao = {
    host: 'localhost',
    port: 5432,
    database: 'crud_hospital',
    user: 'postgres',
    password: 'dorgas784'
};

//Conexao com banco de dados
exports.listar = (callback) => {

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query('SELECT * FROM pessoas', (err, res) => {
        callback(err, res.rows);
        cliente.end();
    });
}

exports.inserir = (pessoas, callback) => {
    const sql = "INSERT INTO pessoas(nome, idade) VALUES ($1, $2) RETURNING *";
    const values = [pessoas.nome, pessoas.idade];

    console.log("@@@@@@@@@@@@@@@@");
    console.log(values)
    console.log(pessoas)

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => {
        callback(err, res.rows[0]);
        cliente.end();
    });
}

exports.buscarPorId = (id, callback) => {
    const sql = "SELECT * FROM pessoas WHERE id=$1";
    const values = [id];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res.rows && res.rows.length > 0) {
            callback(null, res.rows[0]);
        } else {
            const error = "Pessoa nao encontrada";
            callback(error, null);
        }
        cliente.end();
    });
}

exports.atualizar = (id, pessoas, callback) => {
    const sql = "UPDATE pessoas SET nome=$1, idade=$2 WHERE id=$3 RETURNING *";
    const values = [pessoas.nome, pessoas.idade, id];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res.rows && res.rows.length > 0) {
            callback(null, res.rows[0]);
        } else {
            const error = "pessoas nao encontrado";
            callback(error, null);
        }
        cliente.end();
    });
}

exports.deletar = (id, callback) => {
    const sql = "DELETE FROM pessoas WHERE id=$1 RETURNING *";
    const values = [id];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res.rowCount > 0) {
            callback(null, res.rows[0]);
        } else {
            const error = "Pessoa nao encontrado";
            callback(error, null);
        }
        cliente.end();
    });
}