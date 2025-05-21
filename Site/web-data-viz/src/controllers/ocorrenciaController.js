var ocorrenciaModel = require('../models/ocorrenciaModel');

function listar(req, res) {
    let rubrica = req.body.rubricaServer;
    let dataDe = req.body.dataDeServer;
    let dataAte = req.body.dataAteServer;

    ocorrenciaModel.listar(rubrica, dataDe, dataAte)
    .then(
        function (resultado) {
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao listar as ocorrências! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
}

module.exports = {
    listar
}