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

module.exports = {
    excluirNotificacao
};