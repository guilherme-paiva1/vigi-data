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

function listarNotificacao(id_usuario) {
    var instrucaoSql = `
    SELECT 
    a.idAlerta,
    a.dtHoraAlerta,
    a.titulo,
    a.descricao,
    a.tipo,
    n.visualizado
    FROM notificacao n
    JOIN alerta a ON n.fkAlerta = a.idAlerta
    WHERE n.fkUsuario = ${id_usuario}
    ORDER BY a.dtHoraAlerta DESC;
    `

    return database.executar(instrucaoSql);
}

module.exports = {
    editarNotificacao,
    listarNotificacao
}