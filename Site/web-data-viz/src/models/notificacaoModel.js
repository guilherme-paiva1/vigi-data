var database = require("../database/config");

async function cadastrar(titulo, descricao, tipo, fkCriador) {
    var instrucaoSql = `
        INSERT INTO alerta (titulo, descricao, tipo, fkCriador) 
        VALUES ('${titulo}', '${descricao}', '${tipo}', ${fkCriador});
    `;
    
    await database.executar(instrucaoSql);

    var instrucaoSqlIdNotificacao = `
        SELECT idAlerta
        FROM alerta 
        WHERE titulo = '${titulo}'
        AND descricao = '${descricao}'
        AND tipo = '${tipo}'
        AND fkCriador = ${fkCriador}
        ORDER BY dtHoraAlerta DESC
        LIMIT 1;
    `;
    return database.executar(instrucaoSqlIdNotificacao);
}

function cadastrarNotificacaoAssociativa(fkUsuario, idNotificacao) {
    var instrucaoSql = `
        INSERT INTO notificacao (fkAlerta, fkUsuario, visualizado) 
        VALUES (${idNotificacao}, ${fkUsuario}, 0);
    `;
    return database.executar(instrucaoSql);
}

function excluirNotificacao(idNotificacao) {
    var instrucaoSql = `
        DELETE FROM notificacao
        WHERE idNotificacao = ${idNotificacao};
    `;
  
    return database.executar(instrucaoSql);
}

function visualizarNotificacao(idNotificacao) {
    var instrucaoSql = `
        UPDATE notificacao
        SET visualizado = 1
        WHERE idNotificacao = ${idNotificacao};
    `;

    return database.executar(instrucaoSql);
}

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
    n.idNotificacao,
    n.visualizado
    FROM notificacao n
    JOIN alerta a ON n.fkAlerta = a.idAlerta
    WHERE n.fkUsuario = ${id_usuario}
    ORDER BY a.dtHoraAlerta DESC;
    `;

    return database.executar(instrucaoSql);
}

function listarAlertaDelegado(id_usuario) {
    var instrucaoSql = `
    SELECT 
    a.idAlerta,
    a.dtHoraAlerta,
    a.titulo,
    a.descricao,
    a.tipo
    FROM alerta a
    WHERE a.fkCriador = ${id_usuario}
    ORDER BY a.dtHoraAlerta DESC;
    `;

    return database.executar(instrucaoSql);
}

function listarPorId(idAlerta) {
    var instrucaoSql = `
    SELECT 
    a.idAlerta,
    a.titulo,
    a.descricao,
    a.tipo
    FROM alerta a
    WHERE a.idAlerta = ${idAlerta};
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    excluirNotificacao,
    editarNotificacao,
    listarNotificacao,
    listarAlertaDelegado,
    listarPorId,
    cadastrar,
    cadastrarNotificacaoAssociativa,
    visualizarNotificacao
}
