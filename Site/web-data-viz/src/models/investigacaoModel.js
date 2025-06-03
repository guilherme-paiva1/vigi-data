var database = require("../database/config")

async function cadastrar(titulo, descricao, localidade, dt_investigacao, fkRegiao) {
    var instrucaoSql = `
        INSERT INTO investigacao (titulo, descricao, localidade, dt_investigacao, fkRegiao, status_atual) 
            VALUES ('${titulo}', '${descricao}', '${localidade}', '${dt_investigacao}', ${fkRegiao}, 'pendente');
    `;

    await database.executar(instrucaoSql);

    var instrucaoSqlIdInvestigacao = `
        SELECT idInvestigacao
        FROM investigacao
        WHERE titulo = '${titulo}'
        AND descricao = '${descricao}'
        AND localidade = '${localidade}'
        AND dt_investigacao = '${dt_investigacao}'
        AND fkRegiao = ${fkRegiao}
        AND status_atual = 'pendente'
        ORDER BY idInvestigacao DESC
        LIMIT 1;
    `;
    return database.executar(instrucaoSqlIdInvestigacao);
}

function registrarHistoricoDoDelegado(fkDelegado, idInvestigacao) {

    var queryHistorico = `
        INSERT INTO historico_investigacao (fkUsuario, fkInvestigacao, criador) 
            VALUES (${fkDelegado}, ${idInvestigacao}, 1);
    `;
    return database.executar(queryHistorico);
}


function registrarHistoricoDoPolicial(fkPolicial, idInvestigacao) {

    var queryHistorico = `
        INSERT INTO historico_investigacao (fkUsuario, fkInvestigacao, criador) 
            VALUES (${fkPolicial}, ${idInvestigacao}, 0);
    `;
    return database.executar(queryHistorico);
}


function visualizarInvestigacoes(fkUsuario) {

    var instrucaoSql = `
        SELECT idInvestigacao, titulo, descricao, localidade, dt_investigacao, status_atual,
        (
            SELECT COUNT(DISTINCT fkUsuario)
            FROM historico_investigacao
            WHERE criador = 0 AND fkInvestigacao = inv.idInvestigacao
        ) AS qtd_policiais
        FROM investigacao AS inv 
        JOIN historico_investigacao AS hist 
            ON inv.idInvestigacao = hist.fkInvestigacao 
        WHERE 
            hist.fkUsuario = ${fkUsuario} AND hist.criador = 1
        ORDER BY idInvestigacao DESC;
    `;

    return database.executar(instrucaoSql);
}


function excluirInvestigacao(id_investigacao) {

    var instrucaoSqlInvestigacao = `
                DELETE FROM investigacao
                WHERE idInvestigacao = ${id_investigacao};
                `;

    return database.executar(instrucaoSqlInvestigacao);
}

    function editarInvestigacao(id_investigacao, titulo, descricao, localidade, dt_investigacao, status_atual) {
        var instrucaoSql = `
        UPDATE investigacao
        SET titulo = '${titulo}', descricao = '${descricao}', localidade = '${localidade}', dt_investigacao = '${dt_investigacao}', status_atual = '${status_atual}'
        WHERE idInvestigacao = ${id_investigacao};
    `;

        return database.executar(instrucaoSql);
    }

    function visualizarInvestigacaoPorId(id_investigacao) {
        var instrucaoSql = `
        SELECT idInvestigacao, titulo, descricao, localidade, dt_investigacao, status_atual,
        (
            SELECT COUNT(DISTINCT fkUsuario)
            FROM historico_investigacao
            WHERE criador = 0 AND fkInvestigacao = inv.idInvestigacao
        ) AS qtd_policiais
        FROM investigacao AS inv 
        JOIN historico_investigacao AS hist 
            ON inv.idInvestigacao = hist.fkInvestigacao
        WHERE idInvestigacao = ${id_investigacao};
    `;

        return database.executar(instrucaoSql);
    }

    function visualizarInvestigacaoPolicial(fkUsuario) {
        var instrucaoSql = `
        SELECT inv.idInvestigacao, titulo, descricao, localidade, dt_investigacao, status_atual,
        (
            SELECT COUNT(DISTINCT fkUsuario)
            FROM historico_investigacao
            WHERE criador = 0 AND fkInvestigacao = inv.idInvestigacao
        ) AS qtd_policiais
         FROM investigacao AS inv 
         JOIN historico_investigacao AS hist 
            ON inv.idInvestigacao = hist.fkInvestigacao 
         WHERE 
	        hist.fkUsuario = ${fkUsuario} AND hist.criador = 0
        ORDER BY idInvestigacao DESC;
    `;

        return database.executar(instrucaoSql);
    }

    function visualizarInvestigacaoPorStatus(status, fkUsuario) {
        var instrucaoSql = `
        SELECT idInvestigacao, titulo, descricao, localidade, dt_investigacao, status_atual,
        (
            SELECT COUNT(DISTINCT fkUsuario)
            FROM historico_investigacao
            WHERE criador = 0 AND fkInvestigacao = inv.idInvestigacao
        ) AS qtd_policiais
        FROM investigacao AS inv 
        JOIN historico_investigacao AS hist 
            ON inv.idInvestigacao = hist.fkInvestigacao
        WHERE status_atual = '${status}' AND hist.fkUsuario = ${fkUsuario}
        ORDER BY idInvestigacao DESC;
    `;

        return database.executar(instrucaoSql);
    }

    function visualizarQtdInvestigacaoPorStatus(fkUsuario) {
        var instrucaoSql = `
    SELECT 
        (SELECT COUNT(idInvestigacao) FROM investigacao AS inv
        JOIN historico_investigacao AS hist 
		ON inv.idInvestigacao = hist.fkInvestigacao 
		WHERE hist.fkUsuario = ${fkUsuario}) AS qtd_total,

		(SELECT COUNT(idInvestigacao) FROM investigacao AS inv
        JOIN historico_investigacao AS hist 
		ON inv.idInvestigacao = hist.fkInvestigacao 
		WHERE hist.fkUsuario = ${fkUsuario} AND status_atual = "pendente") AS qtd_pendente,
        
        (SELECT COUNT(idInvestigacao) FROM investigacao AS inv
        JOIN historico_investigacao AS hist 
            ON inv.idInvestigacao = hist.fkInvestigacao 
         WHERE 
	        hist.fkUsuario = ${fkUsuario} AND status_atual = "em andamento") AS qtd_andamento,
            
        (SELECT COUNT(idInvestigacao) FROM investigacao AS inv
        JOIN historico_investigacao AS hist 
            ON inv.idInvestigacao = hist.fkInvestigacao 
         WHERE 
	        hist.fkUsuario = ${fkUsuario} AND status_atual = "esclarecida") AS qtd_esclarecida,
            
        (SELECT COUNT(idInvestigacao) FROM investigacao AS inv 
        JOIN historico_investigacao AS hist 
            ON inv.idInvestigacao = hist.fkInvestigacao 
         WHERE 
	        hist.fkUsuario = ${fkUsuario} AND status_atual = "não esclarecida") AS qtd_nao_esclarecida,
            
            (SELECT qtd_nao_esclarecida + qtd_esclarecida) AS total_concluido;`
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
        COALESCE(SUM(CASE WHEN i.status_atual = 'nao esclarecida' THEN 1 ELSE 0 END), 0) AS totalInvestigacoesNaoResolvidas,
        COALESCE(SUM(CASE WHEN i.status_atual = 'esclarecida' THEN 1 ELSE 0 END), 0) AS totalInvestigacoesResolvidas,
        COALESCE(SUM(CASE WHEN i.status_atual = 'pendente' THEN 1 ELSE 0 END), 0) AS totalInvestigacoesPendentes,
        COALESCE(SUM(CASE WHEN i.status_atual = 'em andamento' THEN 1 ELSE 0 END), 0) AS totalInvestigacoesEmAndamento,
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
        registrarHistoricoDoPolicial,
        excluirInvestigacao,
        visualizarInvestigacoes,
        visualizarInvestigacaoPolicial,
        visualizarInvestigacaoPorId,
        editarInvestigacao,
        visualizarQtdInvestigacaoPorStatus,
        visualizarInvestigacaoPorStatus,
        visualizarHistoricoPorMes,
        visualizarDesempenhoPolicial
    };