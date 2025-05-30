var notificacaoModel = require("../models/notificacaoModel");

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
    }
}

module.exports = {
    editarNotificacao
}