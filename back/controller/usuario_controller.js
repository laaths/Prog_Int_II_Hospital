const usuarioRepository = require('../repository/usuario_repository');

const jwt = require('jsonwebtoken');

exports.listar = (req, res) => {
    usuarioRepository.listar((err, listaUsuarios) => {
        if (err) {
            res.status(500).json({ msg: err.msg })
        } else {
            res.json(listaUsuarios);
        }
    })
}

exports.buscarPorId = (req, res) => {
    const id = req.params.id;
    usuarioRepository.buscarPorId(id, (err, usuarioEncontrado) => {
        if (err) {
            res.status(500).json({ msg: err })
        } else if (usuarioEncontrado) {
            res.json(usuarioEncontrado);
        } else {
            res.status(404).json({ msg: "Usuario nao encontrado" });
        }
    });
}

exports.buscarPorusername = (req, res) => {
    const query = req.query;
    if (query && query.username) {
        usuarioRepository.buscarPorusername(query.username, (err, usuarioEncontrado) => {
            if (err) {
                res.status(500).json({ msg: err })
            } else if (usuarioEncontrado) {
                res.json(usuarioEncontrado);
            } else {
                res.status(404).json({ msg: "Usuario nao encontrado" });
            }
        });
    } else {
        //Bad Request
        res.status(400).json({ msg: "Faltou a query username" });
    }
}

exports.inserir = (req, res) => {
    let usuario = req.body;
    if (usuario && usuario.nome && usuario.username && usuario.senha) {
        usuarioRepository.inserir(usuario, (err, usuarioInserido) => {
            if (err) {
                res.status(500).json({ msg: err.msg })
            } else {
                res.status(201).send(usuarioInserido);
            }
        });
    } else {
        //Bad Request
        res.status(400).json({ msg: "Entrada de dados invalida" });
    }
}

exports.atualizar = (req, res) => {
    const id = req.params.id;
    const usuarioAtualizar = req.body;

    usuarioRepository.atualizar(id, usuarioAtualizar, (err, usuarioAtualizado) => {
        if (err) {
            res.status(500).json({ msg: err })
        } else {
            res.json(usuarioAtualizado);
        }
    })
}

exports.validarUsuario = (req, res) => {
    const userLogin = req.body;
    if (userLogin && userLogin.username && userLogin.senha) {
        usuarioRepository.buscarPorusername(userLogin.username, (err, usuario) => {
            if (err) {
                res.status(401).json({ msg: "Usuario invalido" })
            } else if (usuario) {
                if (usuario.senha == userLogin.senha) {
                    const token = jwt.sign({
                        id: usuario.id,
                        nome: usuario.nome
                    }, "Sen@ac2021", { expiresIn: '1h' });
                    res.status(201).json({ "Usuario Validado - token": token });
                } else {
                    res.status(401).json({ msg: "Senha invalida" });
                }
            } else {
                res.status(401).json({ msg: "Usuario invalido" });
            }
        })
    } else {
        res.status(401).json("Usuario ou senha invalidos");
    }
}

exports.validarToken = (req, res, next) => {
    const token = req.get('Authorization');
    if (token) {
        jwt.verify(token, "Sen@ac2021", (err, payload) => {
            if (err) {
                res.status(403).json({ erro: "Nao tem token de acesso" });
            } else {
                /* res.status(404).json({ msg: "Usuário autenticado " }); */
                console.log("ID do usuario: " + payload.id);
                next();
            }
        })

    } else {
        res.status(403).json({ erro: "Nao tem token de acesso" });
    }
}