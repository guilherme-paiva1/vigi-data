var database = require("../database/config");

function cadastrar(titulo, descricao, tipo, fkCriador) {
    var instrucaoSql = `
        INSERT INTO alerta (titulo, descricao, tipo, fkCriador) 
        VALUES ('${titulo}', '${descricao}', '${tipo}', ${fkCriador});
    `;
    
    return database.executar(instrucaoSql);
}

function cadastrarNotificacaoAssociativa(fkUsuario, titulo, descricao, tipo, fkCriador) {
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

    database.executar(instrucaoSqlIdNotificacao)
    .then((resultado) => {
                if (resultado.length > 0) {
                    var idNotificacao = resultado[0].instrucaoSqlIdNotificacao;
                    var queryNotificacao = `
                        INSERT INTO notificacao (fkAlerta, fkUsuario, visualizado) 
                            VALUES (${idNotificacao}, ${fkUsuario}, 0);
                    `;
                    return database.executar(queryNotificacao);
                }
            });
}

var database = require("../database/config");

function excluirNotificacao(idNotificacao) {
    var instrucaoSql = `
        DELETE FROM notificacao
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
    a.tipo,
    n.visualizado
    FROM notificacao n
    JOIN alerta a ON n.fkAlerta = a.idAlerta
    WHERE a.fkCriador = ${id_usuario}
    ORDER BY a.dtHoraAlerta DESC;
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    excluirNotificacao,
    editarNotificacao,
    listarNotificacao,
    listarAlertaDelegado,
    cadastrar,
    cadastrarNotificacaoAssociativa,
}
