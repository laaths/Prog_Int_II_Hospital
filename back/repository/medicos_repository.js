const { Client } = require('pg');

const conexao = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
};

//Conexao com banco de dados
exports.listar = (callback) => {

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query('SELECT * FROM medicos', (err, res) => {
        callback(err, res.rows);
        cliente.end();
    });
}

exports.inserir = (medicos, callback) => {
    const sql = "INSERT INTO medicos(crm,nome, especialidade) VALUES ($1, $2, $3) RETURNING *";
    const values = [medicos.crm, medicos.nome, medicos.especialidade];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => {
        callback(err, res.rows[0]);
        cliente.end();
    });
}

exports.buscarPorId = (id, callback) => {
    const sql = "SELECT * FROM medicos WHERE id=$1";
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

exports.atualizar = (id, medicos, callback) => {
    const sql = "UPDATE medicos SET crm=$1, nome=$2, especialidade=$3 WHERE id=$4 RETURNING *";
    const values = [medicos.crm, medicos.nome, medicos.especialidade, id];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res.rows && res.rows.length > 0) {
            callback(null, res.rows[0]);
        } else {
            const error = "Mdico nao encontrado";
            callback(error, null);
        }
        cliente.end();
    });
}

exports.deletar = (id, callback) => {
    const sql = "DELETE FROM medicos WHERE id=$1 RETURNING *";
    const values = [id];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res.rowCount > 0) {
            callback(null, res.rows[0]);
        } else {
            const error = "Médico nao encontrado";
            callback(error, null);
        }
        cliente.end();
    });
}
