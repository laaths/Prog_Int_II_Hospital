const medicoRepository = require('../repository/medicos_repository');


exports.listar = (req, res) => {
    medicoRepository.listar((err, listaMedicos) => {
        if (err) {
            res.status(500).json({ msg: err.msg })
        } else {
            res.json(listaMedicos);
        }
    })
}

exports.buscarPorId = (req, res) => {
    const id = req.params.id;
    medicoRepository.buscarPorId(id, (err, medicoEncontrado) => {
        if (err) {
            res.status(500).json({ msg: err })
        } else if (medicoEncontrado) {
            res.json(medicoEncontrado);
        } else {
            res.status(404).json({ msg: "Médico nao encontrado" });
        }
    });
}

exports.inserir = (req, res) => {
    let medico = req.body;
    if (medico && medico.crm && medico.nome && medico.especialidade) {
        medicoRepository.inserir(medico, (err, medicoInserido) => {
            if (err) {
                res.status(500).json({ msg: err.msg })
            } else {
                res.status(201).send(medicoInserido);
            }
        });
    } else {
        //Bad Request
        res.status(400).json({ msg: "Entrada de dados invalida" });
    }
}

exports.atualizar = (req, res) => {
    const id = req.params.id;
    const medicoAtualizar = req.body;

    medicoRepository.atualizar(id, medicoAtualizar, (err, medicoAtualizado) => {
        if (err) {
            res.status(500).json({ msg: err })
        } else {
            res.json(medicoAtualizado);
        }
    })
}

exports.deletar = (req, res) => {
    const id = req.params.id;

    medicoRepository.deletar(id, (err, medicoAtualizado) => {
        if (err) {
            res.status(500).json({ msg: err.msg })
        } else {
            res.json(medicoAtualizado);
        }
    })
}