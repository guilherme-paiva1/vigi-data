var ocorrenciaModel = require('../models/ocorrenciaModel');

function listar() {
    let rubrica = req.body.rubrica;
    let dataFiltro = req.body.dataFiltro;
    
    ocorrenciaModel.listar(rubrica, dataFiltro)
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