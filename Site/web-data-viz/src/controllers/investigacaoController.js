var investigacaoModel = require("../models/investigacaoModel");

function cadastrar(req, res) {

    var titulo = req.body.tituloServer
    var descricao = req.body.descricaoServer
    var localidade = req.body.localidadeServer
    var dt_investigacao = req.body.dt_investigacaoServer
    var incidencia = req.body.incidenciaServer
    var fkDelegado = req.body.fkDelegadoServer

    if (titulo == undefined) {
        res.status(400).send("Erro. Tente novamente mais tarde.");
    } else if (descricao == undefined) {
        res.status(400).send("Erro. Tente novamente mais tarde.");
    } else if (localidade == undefined) {
        res.status(400).send("Erro. Tente novamente mais tarde.");
    } else if (dt_investigacao == undefined) {
        res.status(400).send("Erro. Tente novamente mais tarde.");
    } else if (incidencia == undefined) {
        res.status(400).send("Erro. Tente novamente mais tarde.");
    } else {
        investigacaoModel.cadastrar(titulo, descricao, localidade, dt_investigacao, incidencia)
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

        investigacaoModel.registrarHistoricoDoDelegado(fkDelegado, titulo, descricao, localidade, dt_investigacao)
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

function visualizarRequisicoes(req, res){
    var fkUsuario = req.body.fkUsuarioServer

    investigacaoModel.visualizarRequisicoes(fkUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao visualizar as investigações! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
}

module.exports = {
    cadastrar,
    visualizarRequisicoes
}