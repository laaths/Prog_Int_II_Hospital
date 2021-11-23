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
    cliente.query('SELECT * FROM fila', (err, res) => {
        callback(err, res.rows);
        cliente.end();
    });
}

exports.inserir = (pessoaid, classifica, callback) => {
    if (fila.idade >= 80) {
        const priorClassifica = 'Amarelo'
        const sql = "INSERT INTO fila(pessoaid, classificacao) VALUES ($1, $2) RETURNING *";
        const values = [pessoaid, priorClassifica];

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