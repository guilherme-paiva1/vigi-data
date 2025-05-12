var database = require("../database/config")

function cadastrar(titulo, descricao, localidade, dt_investigacao,  incidencia) {
    var instrucaoSql = `
        INSERT INTO investigacao VALUES (titulo, descricao, localidade, dt_investigacao, status_atual)
	        ('${titulo}', '${descricao}', '${localidade}', '${dt_investigacao}', 'pendente', '${incidencia}');
    `;

    return database.executar(instrucaoSql);
}

function visualizarRequisicoes(fkUsuario) {
    var instrucaoSql = `
        SELECT titulo, descricao, localidade, dt_investigacao, status_atual,
        (SELECT COUNT (fkUsuario) FROM historico_investigacao WHERE criador = 0) AS qtd_policiais
         FROM investigacao AS inv 
         JOIN historico_investigacao AS hist 
            ON inv.idInvestigacao = hist.fkInvestigacao 
         WHERE 
	        hist.fkUsuario = ${fkUsuario} AND hist.criador = 1;
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    visualizarRequisicoes
};