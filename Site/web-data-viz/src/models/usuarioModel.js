var database = require("../database/config")

function entrar(matricula, senha) {
    var instrucaoSql = `
        SELECT u.id_usuario, u.nome, u.email, u.matricula, u.perfil, s.nome AS superior
            FROM Usuario AS u
            JOIN Usuario AS s
                WHERE u.matricula = '${matricula}' AND u.senha = '${senha}';;
    `;

    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, matricula, perfil, idSuperior, senha) {
    var instrucaoSql = `
        INSERT INTO Usuario (nome, email, matricula, perfil, superior, senha) VALUES
	        ('${nome}', '${email}', '${matricula}', '${perfil}', ${idSuperior}, '${senha}');
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    entrar,
    cadastrar
};