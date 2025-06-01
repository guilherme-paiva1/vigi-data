var database = require("../database/config")

function cadastrar(titulo, descricao, localidade, dt_investigacao) {
    var instrucaoSql = `
        INSERT INTO investigacao (titulo, descricao, localidade, dt_investigacao, status_atual) 
            VALUES ('${titulo}', '${descricao}', '${localidade}', '${dt_investigacao}', 'pendente');
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
                    INSERT INTO historico_investigacao (fkUsuario, fkInvestigacao, criador) 
                        VALUES (${fkDelegado}, ${idInvestigacao}, 1);
                `;
                return database.executar(queryHistorico);
            }
        });
}

function visualizarInvestigacoes(fkUsuario) {

    var instrucaoSql = `
        SELECT idInvestigacao, titulo, descricao, localidade, dt_investigacao, status_atual,
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

function editarInvestigacao(id_investigacao, titulo, descricao, localidade, dt_investigacao, status_atual) {
    var instrucaoSql = `
        UPDATE investigacao
        SET titulo = '${titulo}', descricao = '${descricao}', localidade = '${localidade}', dt_investigacao = '${dt_investigacao}', status_atual = '${status_atual}'
        WHERE id = ${id_investigacao};
    `;

    return database.executar(instrucaoSql);
}

function visualizarInvestigacaoPorId(id_investigacao) {
    var instrucaoSql = `
        SELECT titulo, descricao, localidade, dt_investigacao, status_atual,
        (SELECT COUNT (fkUsuario) FROM historico_investigacao WHERE criador = 0) AS qtd_policiais 
        FROM investigacao AS inv 
        JOIN historico_investigacao AS hist 
            ON inv.idInvestigacao = hist.fkInvestigacao
        WHERE id = ${id_investigacao};
    `;

    return database.executar(instrucaoSql);
}

function visualizarInvestigacaoPolicial(fkUsuario) {
    var instrucaoSql = `
    SELECT titulo, descricao, localidade, dt_investigacao, status_atual,
        (SELECT COUNT (fkUsuario) FROM historico_investigacao WHERE criador = 0) AS qtd_policiais
         FROM investigacao AS inv 
         JOIN historico_investigacao AS hist 
            ON inv.idInvestigacao = hist.fkInvestigacao 
         WHERE 
	        hist.fkUsuario = ${fkUsuario} AND hist.criador = 0;
    `;

    return database.executar(instrucaoSql);
}

function visualizarHistoricoPorMes(id) {
    var instrucaoSql = `
    SELECT 
    MONTH(i.dt_investigacao) AS mes,
    COUNT(*) AS total_investigacoes
    FROM historico_investigacao hi
    JOIN investigacao i ON hi.fkInvestigacao = i.idInvestigacao
    WHERE hi.fkUsuario = ${id}
    GROUP BY mes
    ORDER BY mes;
    `;

    return database.executar(instrucaoSql);
}

function visualizarDesempenhoPolicial(idUsuario) {
    var instrucaoSql = `
    SELECT
        COUNT(*) AS totalInvestigacoes,
        COALESCE(SUM(CASE WHEN i.status_atual = 'Resolvida' THEN 1 ELSE 0 END), 0) AS totalInvestigacoesResolvidas,
        COALESCE(SUM(CASE WHEN i.status_atual = 'Pendente' THEN 1 ELSE 0 END), 0) AS totalInvestigacoesPendentes,
        COALESCE(SUM(CASE WHEN i.status_atual = 'Em andamento' THEN 1 ELSE 0 END), 0) AS totalInvestigacoesEmAndamento,
        COALESCE(SUM(CASE WHEN r.nome = 'norte' THEN 1 ELSE 0 END), 0) AS investigacoesAtendidasNorte,
        COALESCE(SUM(CASE WHEN r.nome = 'leste' THEN 1 ELSE 0 END), 0) AS investigacoesAtendidasLeste,
        COALESCE(SUM(CASE WHEN r.nome = 'sul' THEN 1 ELSE 0 END), 0) AS investigacoesAtendidasSul,
        COALESCE(SUM(CASE WHEN r.nome = 'oeste' THEN 1 ELSE 0 END), 0) AS investigacoesAtendidasOeste,
        COALESCE(SUM(CASE WHEN r.nome = 'centro' THEN 1 ELSE 0 END), 0) AS investigacoesAtendidasCentro
    FROM historico_investigacao h
    JOIN investigacao i ON h.fkInvestigacao = i.idInvestigacao
    JOIN regiao r ON i.fkRegiao = r.idRegiao
    WHERE h.fkUsuario = ${idUsuario};
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    registrarHistoricoDoDelegado,
    excluirInvestigacao,
    visualizarInvestigacoes,
    visualizarInvestigacaoPolicial,
    visualizarInvestigacaoPorId,
    editarInvestigacao,
    visualizarHistoricoPorMes,
    visualizarDesempenhoPolicial
};