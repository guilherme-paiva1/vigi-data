var database = require("../database/config")

function cadastrar(titulo, descricao, localidade, dt_investigacao,  incidencia) {
    var instrucaoSql = `
        INSERT INTO investigacao VALUES (titulo, descricao, localidade, dt_investigacao, status_atual)
	        ('${titulo}', '${descricao}', '${localidade}', '${dt_investigacao}', 'pendente', '${incidencia}');
    `;

    return database.executar(instrucaoSql);
}

function registrarHistoricoDoDelegado(fkDelegado, titulo, descricao, localidade, dt_investigacao) {
    var intrucaoSqlInvestigacao = `
        SELECT idInvestigacao FROM investigacao 
            WHERE 
                dt_investigacao = '${dt_investigacao}' 
                AND status_atual = 'pendente'
                AND titulo = '${titulo}'
                AND descricao = '${descricao}'
                AND localidade = '${localidade}';
    `;

    database.executar(intrucaoSqlInvestigacao)
        .then((resultado) => {
            if (resultado.length > 0) {
                var idInvestigacao = resultado[0].idInvestigacao;
                var queryHistorico = `
                    INSERT INTO historico_investigacao (fkDelegado, fkInvestigacao, criador) 
                        VALUES (${fkDelegado}, ${idInvestigacao}, 1);
                `;
                return database.executar(queryHistorico);
            }
        });
}

function visualizarInvestigacoes(fkUsuario) {
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

function excluirInvestigacao(id_investigacao) {
    var instrucaoSql = `
        DELETE FROM investigacao
        WHERE id = ${id_investigacao};
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    registrarHistoricoDoDelegado,
    excluirInvestigacao,
    visualizarInvestigacoes

};