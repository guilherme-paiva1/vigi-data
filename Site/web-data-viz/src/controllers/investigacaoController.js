var investigacaoModel = require("../models/investigacaoModel");

function cadastrar(req, res) {

    var titulo = req.body.tituloServer
    var descricao = req.body.descricaoServer
    var localidade = req.body.localidadeServer
    var dt_investigacao = req.body.dt_investigacaoServer
    var status_atual = req.body.status_atualServer
    var incidencia = req.body.incidenciaServer
    var qtdPoliciais = req.body.qtdPoliciaisServer
    var fkDelegado = req.body.fkDelegadoServer // não tenho certeza

    if (titulo == undefined) {
        res.status(400).send("Erro. Tente novamente mais tarde.");
    } else if (descricao == undefined) {
        res.status(400).send("Erro. Tente novamente mais tarde.");
    } else if (localidade == undefined) {
        res.status(400).send("Erro. Tente novamente mais tarde.");
    } else if (dt_investigacao == undefined) {
        res.status(400).send("Erro. Tente novamente mais tarde.");
    } else if (status_atual == undefined) {
        res.status(400).send("Erro. Tente novamente mais tarde.");
    } else if (incidencia == undefined) {
        res.status(400).send("Erro. Tente novamente mais tarde.");
    } else if (qtdPoliciais == undefined) {
        res.status(400).send("Erro. Tente novamente mais tarde.");
    } else if (fkDelegado == undefined) {
        res.status(400).send("Erro. Tente novamente mais tarde.");
    } else {
        investigacaoModel.cadastrar(titulo, descricao, localidade, dt_investigacao, status_atual, incidencia, qtdPoliciais, fkDelegado)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao criar a investigação! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    cadastrar
}