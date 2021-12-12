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
    user: 'postgres',
    password: 'dorgas784'
};

//Conexao com banco de dados
exports.listar = (callback) => {

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query('SELECT nome, classificacao, nfila FROM fila, pessoas WHERE fila.pessoaid = pessoas.id', (err, res) => {
        if (res.rowCount = 0) {
            const error = "Não há nenhum dado para listar"
            callback(error, null);
        } else {
            callback(err, res.rows);
        }
        cliente.end();
    });
}

exports.buscarPorClassificacao = (classificacao, callback) => {
    const sql = "SELECT * FROM fila WHERE classificacao=$1";
    const values = [classificacao];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res.rows && res.rows.length > 0) {
            callback(null, res.rows);
        } else {
            const error = "Nenhuma pessoa com a classificação selecionada";
            callback(error, null);
        }
        cliente.end();
    });
}


exports.inserir = (fila, callback) => {
    const sql = "INSERT INTO fila(pessoaid, classificacao) VALUES ($1, $2) RETURNING *";
    const values = [fila.pessoaid, fila.classificacao];

    // cliente.query('SELECT MAX(nfila) FROM fila WHERE classificacao = "test"');

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => {
        callback(err, res.rows[0]);
        cliente.end();
    });
}

exports.deletar = (id, callback) => {
    const sql = "DELETE FROM fila WHERE id=$1 RETURNING *";
    const values = [id];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res.rowCount > 0) {
            callback(null, res.rows[0]);
        } else {
            const error = "Pessoa nao encontrado na fila";
            callback(error, null);
        }
        cliente.end();
    });
}

// funcionalidade de negócio 1 - Deleta Fila e Reseta nº da fila para 1
exports.deletarFila = (callback) => {
    const sql = "DELETE FROM fila";

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res.rowCount > 0) {
            callback(null, res.rows[0]);
        } else {
            const error = "Não existe uma Fila para deletar";
            callback(error, null);
        }
        cliente.end();
    });
}

exports.resetafila = (callback) => {
    const cliente = new Client(conexao);
    const sql = "ALTER SEQUENCE fila_nfila_seq RESTART WITH 1";

    cliente.connect();
    cliente.query(sql, (err, res) => {
        callback(err, res.rows);
        cliente.end();
    });
}

exports.deletaeresetafila = (callback) => {
    deletarFila();
    resetafila();
}