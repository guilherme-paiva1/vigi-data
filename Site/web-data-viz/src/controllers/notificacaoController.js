var notificacaoModel = require("../models/notificacaoModel");

function cadastrar(req, res) {
    var titulo = req.body.tituloServer;
    var descricao = req.body.descricaoServer;
    var tipo = req.body.tipoServer;
    var fkUsuario = req.body.fkUsuarioServer;

    if (titulo == undefined || titulo == null || titulo.thim().length == 0) {
        res.status(400).send("O título está indefinido.");
    } else if (descricao == undefined || descricao == null || descricao.thim().length == 0) {
        res.status(400).send("A descrição está indefinida.");
    } else if (tipo == undefined || tipo == null || tipo.thim().length == 0) {
        res.status(400).send("O tipo está indefinido.");
    } else if (fkUsuario == undefined || fkUsuario == null || fkUsuario.thim().length == 0) {
        res.status(400).send("O usuário não está identificado.");
    } else {
        notificacaoModel.cadastrar(titulo, descricao, tipo, fkUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);

                    notificacaoModel.cadastrarNotificacaoAssociativa(fkUsuario, titulo, descricao, tipo)
                        .then(
                            function (resultado) {
                                res.json(resultado);
                            }
                        ).catch(
                            function (erro) {
                                console.log(erro);
                                console.log(
                                    "\nHouve um erro ao criar a notificação! Erro: ",
                                    erro.sqlMessage
                                );
                                res.status(500).json(erro.sqlMessage);
                            }
                        );
                }
            )
            .catch (function (erro) {
            console.log("Erro ao cadastrar notificação:", erro);
            res.status(500).json(erro.sqlMessage);
        });
    }
}

module.exports = {
    cadastrar
};