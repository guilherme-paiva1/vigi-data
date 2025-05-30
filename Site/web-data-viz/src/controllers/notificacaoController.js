var notificacaoModel = require("../models/notificacaoModel");

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
    var id_usuario = req.body.idServer;

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

module.exports = {
    editarNotificacao,
    listarNotificacao,
    excluirNotificacao
}
