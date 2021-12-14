const { Client } = require('pg');

/*
const conexao = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
};*/

const conexao = {
    host: 'localhost',
    port: 5432,
    database: 'crud_hospital',
    user: 'teste',
    password: 'dorgas784'
};

//Conexao com banco de dados
exports.listar = (callback) => {

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query('SELECT pessoas.nome AS pessoaNome, medicos.nome AS medicoNome FROM atendimento, pessoas, medicos WHERE atendimento.pessoaid = pessoas.id AND atendimento.medicoid = medicos.id', (err, res) => {
        callback(err, res.rows);
        cliente.end();
    });
}

exports.inserir = (atendimento, callback) => {
    const sql = "INSERT INTO atendimento(pessoaid, medicoid) VALUES ($1, $2) RETURNING *";
    const values = [atendimento.pessoaid, atendimento.medicoid];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => {
        callback(err, res.rows[0]);
        cliente.end();
    });
}

exports.buscarPorId = (id, callback) => {
    const sql = "SELECT * FROM atendimento WHERE id=$1";
    const values = [id];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res.rows && res.rows.length > 0) {
            callback(null, res.rows[0]);
        } else {
            const error = "Atendimento não encontrado";
            callback(error, null);
        }
        cliente.end();
    });
}

exports.atualizar = (id, atendimento, callback) => {
    const sql = "UPDATE atendimento SET pessoaid=$1, medicoid=$2 WHERE id=$3 RETURNING *";
    const values = [atendimento.pessoaid, atendimento.medicoid, id];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res.rows && res.rows.length > 0) {
            callback(null, res.rows[0]);
        } else {
            const error = "Atendimento nao encontrado";
            callback(error, null);
        }
        cliente.end();
    });
}

exports.deletar = (id, callback) => {
    const sql = "DELETE FROM atendimento WHERE id=$1 RETURNING *";
    const values = [id];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res.rowCount > 0) {
            callback(null, res.rows[0]);
        } else {
            const error = "Atendimento nao encontrado";
            callback(error, null);
        }
        cliente.end();
    });
}
