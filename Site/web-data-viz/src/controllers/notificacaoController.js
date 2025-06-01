var notificacaoModel = require("../models/notificacaoModel");

function cadastrar(req, res) {
    console.log(req.body);
    var titulo = req.body.tituloServer;
    var descricao = req.body.descricaoServer;
    var tipo = req.body.tipoServer;
    var fkUsuarios = req.body.fkUsuariosServer;
    var fkCriador = req.body.fkCriadorServer;

    if (titulo == undefined || titulo == null || titulo.trim().length == 0) {
        res.status(400).send("O título está indefinido.");
    } else if (descricao == undefined || descricao == null || descricao.trim().length == 0) {
        res.status(400).send("A descrição está indefinida.");
    } else if (tipo == undefined || tipo == null || tipo.trim().length == 0) {
        res.status(400).send("O tipo está indefinido.");
    } else if (fkUsuarios == undefined || fkUsuarios == null) {
        res.status(400).send("O usuário não está identificado.");
    } else if (fkCriador == undefined || fkCriador == null || fkCriador.trim().length == 0) {
        res.status(400).send("O criador da notificação não está identificado.");
    } else {
        notificacaoModel.cadastrar(titulo, descricao, tipo, fkCriador)
            .then(function (resultadoCadastro) {
            const idNotificacao = resultadoCadastro[0].idAlerta;
            const promises = fkUsuarios.map(fkUsuario => {
                return notificacaoModel.cadastrarNotificacaoAssociativa(fkUsuario, idNotificacao);
            });
            Promise.all(promises)
                .then(results => {
                res.json({ idNotificacao, message: "Notificação cadastrada com sucesso!" });
                })
                .catch(function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao criar as associações da notificação! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
                });
            })
            .catch(function (erro) {
            console.log("Erro ao cadastrar notificação:", erro);
            res.status(500).json(erro.sqlMessage);
            });
    }
}
  
function excluirNotificacao(req, res) {
    var idNotificacao = req.body.idNotificacaoServer;

    if (idNotificacao == undefined) {
        res.status(400).send("Erro. ID da notificação inválido.");
    } else {
        notificacaoModel.excluirNotificacao(idNotificacao)
            .then(
                function (resultado) {
                    if (resultado.affectedRows > 0) {
                        res.status(202).send("Notificação excluída com sucesso!");
                    } else {
                        res.status(404).send("Notificação não encontrada.");
                    }
                  }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao excluir a notificação! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
          );
     }
}

function visualizarNotificacao(req, res) {
    var idNotificacao = req.body.idNotificacaoServer;

    if (idNotificacao == undefined) {
        res.status(400).send("Erro. ID da notificação inválido.");
    } else {
        notificacaoModel.visualizarNotificacao(idNotificacao)
            .then(
                function (resultado) {
                    if (resultado.affectedRows > 0) {
                        res.status(202).send("Notificação visualizada com sucesso!");
                    } else {
                        res.status(404).send("Notificação não encontrada.");
                    }
                  }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao visualizar a notificação! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
          );
     }
}
  
function editarNotificacao(req, res) {
    var id_notificacao = req.body.idServer;
    var titulo = req.body.tituloServer;
    var descricao = req.body.descricaoServer; 
    var tipo = req.body.tipoServer;

    if (id_notificacao == undefined || id_notificacao == null || id_notificacao.trim().length == 0) {
        res.status(400).send("id inválido.");
    } else if (titulo == undefined || titulo == null || titulo.trim().length == 0) {
        res.status(400).send("titulo inválido.");
    } else if (descricao == undefined || descrica == null || descricao.trim().length == 0) {
        res.status(400).send("descrição inválida.");
    } else if (tipo == undefined || tipo == null || tipo.trim().length == 0) {
        res.status(400).send("tipo inválido.");
    } else {
        investigacaoModel.editarNotificacao(id_notificacao, titulo, descricao, tipo)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao editar a notificação! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listarNotificacao(req, res) {
    var id_usuario = req.body.fkUsuarioServer;

    if (id_usuario == undefined || id_usuario == null || id_usuario.trim().length == 0) {
        res.status(400).send("id inválido.");
    } else {
        notificacaoModel.listarNotificacao(id_usuario)
        .then(
            function(resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao listar as notificações! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

function listarAlertaDelegado(req, res) {
    var id_usuario = req.body.fkUsuarioServer;

    if (id_usuario == undefined || id_usuario == null || id_usuario.trim().length == 0) {
        res.status(400).send("id inválido.");
    } else {
        notificacaoModel.listarAlertaDelegado(id_usuario)
        .then(
            function(resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao listar as notificações! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

function listarPorId(req, res) {
    var idAlerta = req.body.idAlertaServer;

    if (idAlerta == undefined || idAlerta == null) {
        res.status(400).send("id inválido.");
    } else {
        notificacaoModel.listarPorId(idAlerta)
        .then(
            function(resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao listar a notificação! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

module.exports = {
    cadastrar,
    editarNotificacao,
    listarNotificacao,
    excluirNotificacao,
    listarAlertaDelegado,
    visualizarNotificacao,
    listarPorId
}
