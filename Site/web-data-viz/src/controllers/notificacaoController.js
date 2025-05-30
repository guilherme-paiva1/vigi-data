var notificacaoModel = require("../models/notificacaoModel");

function cadastrar(req, res) {
    var titulo = req.body.tituloServer;
    var descricao = req.body.descricaoServer;
    var tipo = req.body.tipoServer;
    var fkUsuario = req.body.fkUsuarioServer;

    if (!titulo) {
        res.status(400).send("O título está indefinido.");
    } else if (!descricao) {
        res.status(400).send("A descrição está indefinida.");
    } else if (!tipo) {
        res.status(400).send("O tipo está indefinido.");
    } else if (!fkUsuario) {
        res.status(400).send("O usuário não está identificado.");
    } else {
        notificacaoModel.cadastrar(titulo, descricao, tipo, fkUsuario)
            .then(function (resultado) {
                res.status(201).json(resultado);
            })
            .catch(function (erro) {
                console.log("Erro ao cadastrar notificação:", erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function buscarUltimaNotificacao(req, res) {
    var titulo = req.body.tituloServer;
    var descricao = req.body.descricaoServer;
    var tipo = req.body.tipoServer;

    if (!titulo) {
        res.status(400).send("O título está indefinido.");
    } else if (!descricao) {
        res.status(400).send("A descrição está indefinida.");
    } else if (!tipo) {
        res.status(400).send("O tipo está indefinido.");
    } else {
        notificacaoModel.buscarUltimaNotificacao(titulo, descricao, tipo)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado[0]);
                } else {
                    res.status(404).send("Nenhuma notificação encontrada.");
                }
            })
            .catch(function (erro) {
                console.log("Erro ao buscar notificação:", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    cadastrar,
    buscarUltimaNotificacao
};