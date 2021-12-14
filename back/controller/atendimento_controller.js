const atendimentoRepository = require('../repository/atendimento_repository');


exports.listar = (req, res) => {
    atendimentoRepository.listar((err, listaAtendimento) => {
        if (err) {
            res.status(500).json({ msg: err.msg })
        } else {
            res.json(listaAtendimento);
        }
    })
}


exports.buscarPorId = (req, res) => {
    const id = req.params.id;
    atendimentoRepository.buscarPorId(id, (err, atendimentoEncontrado) => {
        if (err) {
            res.status(500).json({ msg: err })
        } else if (atendimentoEncontrado) {
            res.json(atendimentoEncontrado);
        } else {
            res.status(404).json({ msg: "Atendimento não encontrado" });
        }
    });
}

exports.inserir = (req, res) => {
    let atendimento = req.body;
    if (atendimento && atendimento.pessoaid && atendimento.medicoid) {
        atendimentoRepository.inserir(atendimento, (err, atendimentoInserido) => {
            if (err) {
                res.status(500).json({ msg: err.msg })
            } else {
                res.status(201).send(atendimentoInserido);
            }
        });
    } else {
        //Bad Request
        res.status(400).json({ msg: "Entrada de dados invalida" });
    }
}

exports.atualizar = (req, res) => {
    const id = req.params.id;
    const atendimentoAtualizar = req.body;

    atendimentoRepository.atualizar(id, atendimentoAtualizar, (err, atendimentoAtualizado) => {
        if (err) {
            res.status(500).json({ msg: err })
        } else {
            res.json(atendimentoAtualizado);
        }
    })
}

exports.deletar = (req, res) => {
    const id = req.params.id;

    atendimentoRepository.deletar(id, (err, atendimentoAtualizado) => {
        if (err) {
            res.status(500).json({ msg: err.msg })
        } else {
            res.json(atendimentoAtualizado);
        }
    })
}