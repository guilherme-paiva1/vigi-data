var database = require("../database/config")

function editarNotificacao(id_notificacao, titulo, descricao, tipo){
    var instrucaoSql =`
    UPDATE alerta
    SET
    titulo = '${titulo}',
    descricao = '${descricao}',
    tipo = '${tipo}'
    WHERE idAlerta = ${id_notificacao};
    `

    return database.executar(instrucaoSql);
}

module.exports = {
    editarNotificacao
}