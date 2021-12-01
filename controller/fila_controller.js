const filaRepository = require('./repository/fila_repository');
const pessoasRepository = require("./repository/pessoas_repository");


exports.listar = (req, res) => {
    filaRepository.listar((err, listaFila) => {
        if (err) {
            res.status(500).json({ msg: err.msg })
        } else {
            res.json(listaFila);
        }
    })
}

exports.inserir = (req, res) => {
    let fila = req.body;
    if (fila) {
        filaRepository.inserir(fila, (err, filaInserida) => {
            if (err) {
                res.status(500).json({ msg: err.msg })
            } else {
                res.status(201).send(fila);
            }
        });
    } else {
        //Bad Request
        res.status(400).json({ msg: "Entrada de dados invalida" });
    }
}

/*
exports.inserir = (req, res) => {
    let fila = req.body;
    if (fila && fila.pessoaid && fila.classificacao && fila.nfila) {
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
*/