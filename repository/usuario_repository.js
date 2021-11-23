const { Client } = require('pg');

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
    cliente.query('SELECT * FROM usuario', (err, res) => {
        callback(err, res.rows);
        cliente.end();
    });
}

exports.inserir = (usuario, callback) => {
    const sql = "INSERT INTO usuario(nome, email, username, senha) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [usuario.nome, usuario.email, usuario.username, usuario.senha];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => {
        callback(err, res.rows[0]);
        cliente.end();
    });
}

exports.deletar = (req, res) => {
    const id = req.params.id;

    usuarioRepository.deletar(id, (err, usuarioAtualizado) => {
        if (err) {
            res.status(500).json({ msg: err.msg })
        } else {
            res.json(usuarioAtualizado);
        }
    })
}

exports.buscarPorusername = (username, callback) => {
    const sql = "SELECT * FROM usuario WHERE username=$1";
    const values = [username];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res.rows && res.rows.length > 0) {
            callback(null, res.rows[0]);
        } else {
            const error = "Usuario nao encontrado";
            callback(error, null);
        }
        cliente.end();
    });
}

exports.buscarPorId = (id, callback) => {
    const sql = "SELECT * FROM usuario WHERE id=$1";
    const values = [id];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res.rows && res.rows.length > 0) {
            callback(null, res.rows[0]);
        } else {
            const error = "Usuario nao encontrado";
            callback(error, null);
        }
        cliente.end();
    });
}

exports.atualizar = (id, usuario, callback) => {
    const sql = "UPDATE usuario SET nome=$1, email=$2, username=$3, senha=$4 WHERE id=$5 RETURNING *";
    const values = [usuario.nome, usuario.email, usuario.username, usuario.senha, id];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res.rows && res.rows.length > 0) {
            callback(null, res.rows[0]);
        } else {
            const error = "Usuario nao encontrado";
            callback(error, null);
        }
        cliente.end();
    });
}

exports.deletar = (id, callback) => {
    const sql = "DELETE FROM usuario WHERE id=$1 RETURNING *";
    const values = [id];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res.rowCount > 0) {
            callback(null, res.rows[0]);
        } else {
            const error = "Usuario nao encontrado";
            callback(error, null);
        }
        cliente.end();
    });
}