var investigacoesModel = require("../models/investigacoesModel");

function exibir(req, res) {
    var id = req.body.idServer;

    if (id == undefined) {
        res.status(400).send("id inválido.");
    } else {

        investigacoesModel.exibir(id)
            .then(
                function (resultadoInvestigacoes) {
                    if (resultadoInvestigacoes.length >= 1) {
                        res.json({
                            id_usuario: resultadoInvestigacoes[0].id_usuario,
                            nome: resultadoInvestigacoes[0].nome,
                            email: resultadoInvestigacoes[0].email,
                            id: resultadoInvestigacoes[0].id,
                            perfil: resultadoInvestigacoes[0].perfil,
                            superior: resultadoInvestigacoes[0].superior,
                        });
                    } else if (resultadoInvestigacoes.length == 0) {
                        res.status(403).send("id inválido.");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao exibir as investigações! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function excluirInvestigacao(req, res) {
    var id = req.body.idServer;

    if (id == undefined) {
        res.status(400).send("id inválido.");
    } else {

        investigacoesModel.excluirInvestigacao(id)
            .then(
                function (resultadoInvestigacoes) {
                    if (resultadoInvestigacoes.length >= 1) {
                        res.json({
                            id_usuario: resultadoInvestigacoes[0].id_usuario,
                            nome: resultadoInvestigacoes[0].nome,
                            email: resultadoInvestigacoes[0].email,
                            id: resultadoInvestigacoes[0].id,
                            perfil: resultadoInvestigacoes[0].perfil,
                            superior: resultadoInvestigacoes[0].superior,
                        });
                    } else if (resultadoInvestigacoes.length == 0) {
                        res.status(403).send("id inválido.");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro excluir a investigação! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

module.exports = {
    exibir,
    excluirInvestigacao
}