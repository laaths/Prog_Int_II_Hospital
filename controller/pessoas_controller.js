const pessoasRepository = require('../repository/pessoas_repository');


exports.listar = (req, res) => {
    pessoasRepository.listar((err, listaPessoas) => {
        if (err) {
            res.status(500).json({ msg: err.msg })
        } else {
            res.json(listaPessoas);
        }
    })
}


exports.buscarPorId = (req, res) => {
    const id = req.params.id;
    pessoasRepository.buscarPorId(id, (err, pessoaEncontrado) => {
        if (err) {
            res.status(500).json({ msg: err })
        } else if (pessoaEncontrado) {
            res.json(pessoaEncontrado);
        } else {
            res.status(404).json({ msg: "Pessoa nao encontrada" });
        }
    });
}

exports.inserir = (req, res) => {
    let pessoa = req.body;
    if (pessoa && pessoa.nome && pessoa.idade) {
        pessoasRepository.inserir(pessoa, (err, pessoaInserido) => {
            if (err) {
                res.status(500).json({ msg: err.msg })
            } else {
                res.status(201).send(pessoa);
            }
        });
    } else {
        //Bad Request
        res.status(400).json({ msg: "Entrada de dados invalida" });
    }
}
exports.atualizar = (req, res) => {
    const id = req.params.id;
    const pessoaAtualizar = req.body;

    pessoasRepository.atualizar(id, pessoaAtualizar, (err, pessoaAtualizado) => {
        if (err) {
            res.status(500).json({ msg: err })
        } else {
            res.json(pessoaAtualizado);
        }
    })
}

exports.deletar = (req, res) => {
    const id = req.params.id;

    pessoasRepository.deletar(id, (err, pessoaAtualizado) => {
        if (err) {
            res.status(500).json({ msg: err.msg })
        } else {
            res.json(pessoaAtualizado);
        }
    })
}