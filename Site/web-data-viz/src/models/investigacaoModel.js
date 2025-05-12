var database = require("../database/config")

function cadastrar(titulo, descricao, localidade, dt_investigacao,  incidencia) {
    var instrucaoSql = `
        INSERT INTO investigacao VALUES (titulo, descricao, localidade, dt_investigacao, status_atual, incidencia)
	        ('${titulo}', '${descricao}', '${localidade}', '${dt_investigacao}', 'pendente', '${incidencia}');
    `;

    return database.executar(instrucaoSql);
}

function registrarHistoricoDoDelegado(fkDelegado, titulo, descricao, localidade, dt_investigacao) {
    var intrucaoSqlRequisicao = `
        SELECT idInvestigacao FROM investigacao 
            WHERE 
                dt_investigacao = '${dt_investigacao}' 
                AND status_atual = 'pendente'
                AND titulo = '${titulo}'
                AND descricao = '${descricao}'
                AND localidade = '${localidade}';
    `;

    database.executar(intrucaoSqlRequisicao)
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

module.exports = {
    cadastrar,
    registrarHistoricoDoDelegado
};