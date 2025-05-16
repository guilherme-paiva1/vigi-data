var database = require("../database/config")

function listar(rubrica, dataFiltro) {
    var instrucaoSql = `
        SELECT 
            (SELECT COUNT(a.idOcorrencia)
                FROM ocorrencia AS a
                JOIN regiao AS r 
                    ON r.idRegiao = a.fkRegiao
                        WHERE r.nome = 'norte'
                        AND a.rubrica = ${rubrica}
						AND data_hora_crime > ${dataFiltro}) AS qtd_ocorrencia_norte,
            (SELECT COUNT(a.idOcorrencia)
                FROM ocorrencia AS a
                JOIN regiao AS r
                    ON r.idRegiao = a.fkRegiao
                        WHERE r.nome = 'oeste'
                        AND a.rubrica = ${rubrica}
						AND data_hora_crime > ${dataFiltro}) AS qtd_ocorrencia_oeste,
            (SELECT COUNT(a.idOcorrencia)
                FROM ocorrencia AS a
                JOIN regiao AS r 
                    ON r.idRegiao = a.fkRegiao
                        WHERE r.nome = 'leste'
                        AND a.rubrica = ${rubrica}
						AND data_hora_crime > ${dataFiltro}) AS qtd_ocorrencia_leste,
            (SELECT COUNT(a.idOcorrencia)
                FROM ocorrencia AS a
                JOIN regiao AS r 
                    ON r.idRegiao = a.fkRegiao
                        WHERE r.nome = 'centro'
                        AND a.rubrica = ${rubrica}
						AND data_hora_crime > ${dataFiltro}) AS qtd_ocorrencia_centro,
            (SELECT COUNT(a.idOcorrencia)
                FROM ocorrencia AS a
                JOIN regiao AS r 
                    ON r.idRegiao = a.fkRegiao
                        WHERE r.nome = 'sul'
                        AND a.rubrica = ${rubrica}
						AND data_hora_crime > ${dataFiltro}) AS qtd_ocorrencia_sul,
            (SELECT r.populacao
                FROM ocorrencia AS a
                JOIN regiao AS r 
                    ON r.idRegiao = a.fkRegiao
                        WHERE r.nome = 'norte') AS qtd_populacao_norte,
            (SELECT r.populacao
                FROM ocorrencia AS a
                JOIN regiao AS r 
                    ON r.idRegiao = a.fkRegiao
                        WHERE r.nome = 'oeste') AS qtd_populacao_oeste,
            (SELECT r.populacao
                FROM ocorrencia AS a
                JOIN regiao AS r 
                    ON r.idRegiao = a.fkRegiao
                        WHERE r.nome = 'leste') AS qtd_populacao_leste,
            (SELECT r.populacao
                FROM ocorrencia AS a
                JOIN regiao AS r 
                    ON r.idRegiao = a.fkRegiao
                        WHERE r.nome = 'centro') AS qtd_populacao_centro,
            (SELECT r.populacao
                FROM ocorrencia AS a
                JOIN regiao AS r 
                    ON r.idRegiao = a.fkRegiao
                        WHERE r.nome = 'sul') AS qtd_populacao_sul
		FROM ocorrencia AS a
		JOIN regiao AS r
			ON r.idRegiao = a.fkRegiao;
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    listar
};