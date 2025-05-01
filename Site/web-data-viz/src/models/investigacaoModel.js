var database = require("../database/config")

function cadastrar(titulo, descricao, localidade, dt_investigacao, status_atual, incidencia) {
    var instrucaoSql = `
        INSERT INTO investigacao VALUES (titulo, descricao, localidade, dt_investigacao, status_atual, incidencia)
	        ('${titulo}', '${descricao}', '${localidade}', '${dt_investigacao}', ${status_atual}, '${incidencia}');
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar
};