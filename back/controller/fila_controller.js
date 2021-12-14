const filaRepository = require('../repository/fila_repository');

exports.listar = (req, res) => {
    filaRepository.listar((err, listaFila) => {
        if (err) {
            res.status(500).json({ msg: err.msg })
        } else {
            res.json(listaFila);
        }
    })
}

exports.listarAllOriginal = (req, res) => {
    filaRepository.listar((err, listaFila) => {
        if (err) {
            res.status(500).json({ msg: err.msg })
        } else {
            res.json(listaFila);
        }
    })
}

exports.buscarPorClassificacao = (req, res) => {
    const classificacao = req.params.classificacao;
    filaRepository.buscarPorClassificacao(classificacao, (err, filaEncontrada) => {
        if (err) {
            res.status(500).json({ msg: err })
        } else if (filaEncontrada) {
            res.json(filaEncontrada);
        } else {
            res.status(404).json({ msg: "Nenhum usuário com a classificação seleciada encontrado" });
        }
    });
}

exports.inserir = (req, res) => {
    let fila = req.body;
    if (fila) {
        filaRepository.inserir(fila, (err, filaInserida) => {
            if (err) {
                res.status(500).json({ msg: err.msg })
            } else {
                res.status(201).send(filaInserida);
            }
        });
    } else {
        //Bad Request
        res.status(400).json({ msg: "Entrada de dados invalida" });
    }
}

exports.deletar = (req, res) => {
    const id = req.params.id;

    filaRepository.deletar(id, (err, pessoaAtualizado) => {
        if (err) {
            res.status(500).json({ msg: err.msg })
        } else {
            res.json(pessoaAtualizado);
        }
    })
}


exports.deletarFila = (req, res) => {

    filaRepository.deletarFila((err, deletaFila) => {
        if (err) {
            res.status(500).json({ msg: err.msg })
        } else {
            res.json(deletaFila);
        }
    })

    filaRepository.resetafila((err, resetaFila) => {
        if (err) {
            res.status(500).json({ msg: err.msg })
        } else {
            res.json(resetaFila);
        }
    })
}