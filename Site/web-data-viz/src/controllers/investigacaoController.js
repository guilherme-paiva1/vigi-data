var investigacaoModel = require("../models/investigacaoModel");

function cadastrar(req, res) {

    var titulo = req.body.tituloServer
    var descricao = req.body.descricaoServer
    var localidade = req.body.localidadeServer
    var dt_investigacao = req.body.dt_investigacaoServer
    // var incidencia = req.body.incidenciaServer
    var fkDelegado = req.body.fkDelegadoServer

    if (titulo == undefined) {
        res.status(400).send("Erro. Tente novamente mais tarde.");
    } else if (descricao == undefined) {
        res.status(400).send("Erro. Tente novamente mais tarde.");
    } else if (localidade == undefined) {
        res.status(400).send("Erro. Tente novamente mais tarde.");
    } else if (dt_investigacao == undefined) {
        res.status(400).send("Erro. Tente novamente mais tarde.");
    } else {
        investigacaoModel.cadastrar(titulo, descricao, localidade, dt_investigacao)
            .then(
                function (resultado) {
                    res.json(resultado);

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

function visualizarInvestigacoes(req, res) {
    var fkUsuario = req.body.fkUsuarioServer;

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

function visualizarInvestigacaoPolicial(req, res) {
    var fkUsuario = req.body.fkUsuarioServer

    investigacaoModel.visualizarInvestigacaoPolicial(fkUsuario)
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

function visualizarInvestigacaoPorId(req, res) {
    var idInvestigacao = req.body.idInvestigacaoServer

    investigacaoModel.visualizarInvestigacaoPorId(idInvestigacao)
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

function excluirInvestigacao(req, res) {
    var id = req.body.idServer;

    if (id == undefined) {
        res.status(400).send("id inválido.");
    } else {

        investigacaoModel.excluirInvestigacao(id)
            .then(
                function (resultado) {
                    res.json(resultado);
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

function editarInvestigacao(req, res) {
    var id = req.body.idServer;
    var titulo = req.body.tituloServer;
    var descricao = req.body.descricaoServer;
    var localidade = req.body.localidadeServer;
    var dt_investigacao = req.body.dt_investigacaoServer;
    var status_atual = req.body.status_atualServer;

    if (id == undefined) {
        res.status(400).send("id inválido.");
    } else if (titulo == undefined) {
        res.status(400).send("titulo inválido.");
    } else if (descricao == undefined) {
        res.status(400).send("descricao inválida.");
    } else if (localidade == undefined) {
        res.status(400).send("localidade inválida.");
    } else if (dt_investigacao == undefined) {
        res.status(400).send("dt_investigacao inválida.");
    } else if (status_atual == undefined) {
        res.status(400).send("status_atual inválido.");
    } else {
        investigacaoModel.editarInvestigacao(id, titulo, descricao, localidade, dt_investigacao, status_atual)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao editar a investigação! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function visualizarHistoricoPorMes (req, res){
    var id = req.body.idServer;

    if (id == undefined) {
        res.status(400).send("id inválido.");
    } else {

        investigacaoModel.visualizarHistoricoPorMes(id)
            .then(
                function (resultadoInvestigacoesPorMes) {
                    if (resultadoInvestigacoesPorMes.length >= 1) {
                        res.json({
                            qtdPorMes: resultadoInvestigacoesPorMes[0].qtdPorMes
                        });
                    } else if (resultadoInvestigacoesPorMes.length == 0) {
                        res.status(403).send("id inválido ou não há investigações nesse mês.");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao exibir as investigações por mês! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function visualizarDesempenhoPolicial (req, res){
    var id_usuario = req.params.idUsuario;

    if (id_usuario == undefined) {
        res.status(204).send("id inválido.");
    } else {

        investigacaoModel.visualizarDesempenhoPolicial(id_usuario)
            .then(
                function (resultadoDesempenhoPolicial) {
                    if (resultadoDesempenhoPolicial.length >= 1) {
                        res.json({
                            totalInvestigacoes: resultadoDesempenhoPolicial[0].totalInvestigacoes,
                            totalInvestigacoesResolvidas: resultadoDesempenhoPolicial[0].totalInvestigacoesResolvidas,
                            investigacoesAtendidasZN: resultadoDesempenhoPolicial[0].investigacoesAtendidasZN,
                            investigacoesAtendidasZL: resultadoDesempenhoPolicial[0].investigacoesAtendidasZL,
                            investigacoesAtendidasZS: resultadoDesempenhoPolicial[0].investigacoesAtendidasZS,
                            investigacoesAtendidasZO: resultadoDesempenhoPolicial[0].investigacoesAtendidasZO
                        });
                    } else if (resultadoDesempenhoPolicial.length == 0) {
                        res.status(403).send("id inválido ou não há investigações nesse mês.");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao exibir o desempenho! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}


module.exports = {
    cadastrar,
    visualizarInvestigacoes,
    excluirInvestigacao,
    visualizarInvestigacaoPolicial,
    visualizarInvestigacaoPorId,
    editarInvestigacao,
    visualizarHistoricoPorMes,
    visualizarDesempenhoPolicial
}