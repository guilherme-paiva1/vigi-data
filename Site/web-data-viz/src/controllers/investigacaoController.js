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

function visualizarInvestigacoes(req, res){
    var fkUsuario = req.body.fkUsuarioServer

    investigacaoModel.visualizarInvestigacoes(fkUsuario)
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
    cadastrar,
    visualizarInvestigacoes,
    exibir,
    excluirInvestigacao
}