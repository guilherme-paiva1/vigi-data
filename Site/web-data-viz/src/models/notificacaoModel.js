var database = require("../database/config");

function cadastrar(titulo, descricao, tipo, fkUsuario) {
    // Primeiro insere o alerta
    var instrucaoSql = `
        INSERT INTO alerta (titulo, descricao, tipo) 
        VALUES ('${titulo}', '${descricao}', '${tipo}');
        
        SET @idAlerta = LAST_INSERT_ID();
        
        INSERT INTO notificacao (fkAlerta, fkUsuario, visualizado) 
        VALUES (@idAlerta, ${fkUsuario}, 0);
        
        SELECT @idAlerta AS idAlerta, LAST_INSERT_ID() AS idNotificacao;
    `;
    
    return database.executar(instrucaoSql);
}

function buscarUltimaNotificacao(titulo, descricao, tipo) {
    var instrucaoSql = `
        SELECT n.idNotificacao 
        FROM notificacao AS n
        JOIN alerta AS a ON n.fkAlerta = a.idAlerta
        WHERE a.titulo = '${titulo}' 
          AND a.descricao = '${descricao}'
          AND a.tipo = '${tipo}'
        ORDER BY n.idNotificacao DESC
        LIMIT 1;
    `;
    
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    buscarUltimaNotificacao
};