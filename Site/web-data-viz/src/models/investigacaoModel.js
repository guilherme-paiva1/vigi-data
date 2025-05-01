var database = require("../database/config")

function cadastrar(titulo, descricao, localidade, dt_investigacao, status_atual, incidencia, qtdPoliciais) {
    var instrucaoSql = `
        INSERT INTO investigacao VALUES (titulo, descricao, localidade, dt_investigacao, status_atual, incidencia, qtdPoliciais)
	        ('${titulo}', '${descricao}', '${localidade}', '${dt_investigacao}', ${status_atual}, '${incidencia}', ${qtdPoliciais});
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar
};