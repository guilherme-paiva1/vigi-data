var database = require("../database/config");

function excluirNotificacao(idNotificacao) {
    var instrucaoSql = `
        DELETE FROM notificacao
        WHERE idNotificacao = ${idNotificacao};
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    excluirNotificacao
};