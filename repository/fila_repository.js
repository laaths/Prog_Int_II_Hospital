const { Client } = require('pg');

const conexao = {
    host: 'ec2-100-24-247-156.compute-1.amazonaws.com',
    port: '5432',
    database: 'd54pml8qp33mj2',
    user: 'aashdibljielux',
    password: 'dcf53396c1fe05bd1572074028307631fc37da6028dcb8c0cc7aa8c19c9e550f'
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

exports.inserir = (usuario, callback) => {
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
