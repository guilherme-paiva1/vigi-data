var database = require("../database/config")

function listar(rubrica, dataDe, dataAte) {
    var instrucaoSql = `
        SELECT 
            (SELECT COUNT(a.idOcorrencia)
                FROM ocorrencia AS a
                JOIN regiao AS r 
                    ON r.idRegiao = a.fkRegiao
                        WHERE r.nome = 'norte'
                        AND a.rubrica ${rubrica}
                        AND a.data_hora_crime >= '${dataDe}' AND a.data_hora_crime <= '${dataAte}') AS qtd_ocorrencia_norte,
            (SELECT COUNT(a.idOcorrencia)
                FROM ocorrencia AS a
                JOIN regiao AS r
                    ON r.idRegiao = a.fkRegiao
                        WHERE r.nome = 'oeste'
                        AND a.rubrica ${rubrica}
                        AND a.data_hora_crime >= '${dataDe}' AND a.data_hora_crime <= '${dataAte}') AS qtd_ocorrencia_oeste,
            (SELECT COUNT(a.idOcorrencia)
                FROM ocorrencia AS a
                JOIN regiao AS r 
                    ON r.idRegiao = a.fkRegiao
                        WHERE r.nome = 'leste'
                        AND a.rubrica ${rubrica}
                        AND a.data_hora_crime >= '${dataDe}' AND a.data_hora_crime <= '${dataAte}') AS qtd_ocorrencia_leste,
            (SELECT COUNT(a.idOcorrencia)
                FROM ocorrencia AS a
                JOIN regiao AS r 
                    ON r.idRegiao = a.fkRegiao
                        WHERE r.nome = 'centro'
                        AND a.rubrica ${rubrica}
                        AND a.data_hora_crime >= '${dataDe}' AND a.data_hora_crime <= '${dataAte}') AS qtd_ocorrencia_centro,
            (SELECT COUNT(a.idOcorrencia)
                FROM ocorrencia AS a
                JOIN regiao AS r 
                    ON r.idRegiao = a.fkRegiao
                        WHERE r.nome = 'sul'
                        AND a.rubrica ${rubrica}
                        AND a.data_hora_crime >= '${dataDe}' AND a.data_hora_crime <= '${dataAte}') AS qtd_ocorrencia_sul,
            (SELECT populacao FROM regiao WHERE nome = 'norte') AS qtd_populacao_norte,
            (SELECT populacao FROM regiao WHERE nome = 'oeste') AS qtd_populacao_oeste,
            (SELECT populacao FROM regiao WHERE nome = 'leste') AS qtd_populacao_leste,
            (SELECT populacao FROM regiao WHERE nome = 'centro') AS qtd_populacao_centro,
            (SELECT populacao FROM regiao WHERE nome = 'sul') AS qtd_populacao_sul;
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    listar
};