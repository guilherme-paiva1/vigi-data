var database = require("../database/config")

function cadastrar(titulo, descricao, localidade, dt_investigacao, status_atual, incidencia, qtdPoliciais, fkDelegado) {
    var instrucaoSql = `
        INSERT INTO investigacao VALUES (titulo, descricao, localidade, dt_investigacao, status_atual, incidencia, qtdPoliciais, fkDelegado)
	        ('${titulo}', '${descricao}', '${localidade}', '${dt_investigacao}', ${status_atual}, '${incidencia}', ${qtdPoliciais}, ${fkDelegado});
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar
};