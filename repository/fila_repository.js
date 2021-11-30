const { Client } = require('pg');
const {callback} = require("pg/lib/native/query");

const conexao = {
    host: 'localhost',
    port: 5432,
    database: 'crud_hospital',
    user: 'teste',
    password: 'dorgas784'
};

//Conexao com banco de dados
exports.listar = (callback) => {

    let teste;
    teste = verificaClassificacao(4);
    console.log(teste)

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query('SELECT * FROM fila', (err, res) => {
        callback(err, res.rows);
        cliente.end();
    });

}

/*
exports.inserir = (fila, callback) => {
    const sql = "INSERT INTO fila(id, pessoaid, classificacao, nfila) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [fila[0].id, fila[0].pessoaid, fila[0].classificacao, fila[0].nfila];


    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => {

        callback(err, res.rows[0]);
        cliente.end();
    });
}
*/

exports.inserir = (fila, callback) => {
    const sql = "INSERT INTO fila( pessoaid, classificacao, nfila) VALUES ($1, $2, $3) RETURNING *";
    const values = [fila.pessoaid, fila.classificacao, fila.nfila];
    const sql2 = "SELECT idade FROM pessoas where id=$1";
    const values2 = [fila.pessoaid];
    let idade = null

    const cliente = new Client(conexao);
    cliente.connect();

    // PART VERIFICA CLASSIFICACAO
    cliente.query(sql2, values2, (err, res) => {
        idade = res.rows[0].idade
        callback(null, idade)
        cliente.end();
        console.log(idade);
    })

    console.log("idade: " + idade)
    //PART INSERT
    cliente.query(sql, values, (err, res) => {
        callback(err, res.rows);
        cliente.end();
    });
}

function verificaClassificacao(pessoaid) {
    const sql = "SELECT idade FROM pessoas where id=$1";
    const values = [pessoaid];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => {
        console.log(res)
        console.log(err)
        if (res.rows[0].idade >= 80) {
            return "Vermelho"
        } else {
            return false
        }
        cliente.end()
    });
}



/*
exports.inserir2 = (pessoaid, classifica, numerofila, callback) => {
    const verificaidade = "SELECT idade FROM pessoas where id=$pessoaid"
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