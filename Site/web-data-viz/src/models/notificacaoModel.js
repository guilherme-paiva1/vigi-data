var database = require("../database/config");

function cadastrar(titulo, descricao, tipo) {
    var instrucaoSql = `
        INSERT INTO alerta (titulo, descricao, tipo) 
        VALUES ('${titulo}', '${descricao}', '${tipo}');
    `;
    
    return database.executar(instrucaoSql);
}

function cadastrarNotificacaoAssociativa(fkUsuario, titulo, descricao, tipo) {
    var instrucaoSqlIdNotificacao = `
        SELECT idAlerta 
        FROM alerta 
        WHERE titulo = '${titulo}'
        AND descricao = '${descricao}'
        AND tipo = '${tipo}';
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

module.exports = {
    cadastrar,
    cadastrarNotificacaoAssociativa
};