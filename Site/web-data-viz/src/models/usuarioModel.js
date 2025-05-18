var database = require("../database/config")

function entrar(matricula, senha) {
    var instrucaoSql = `
        SELECT u.idUsuario, u.nome, u.email, u.matricula, u.perfil, s.nome AS superior
            FROM usuario AS u
            JOIN usuario AS s ON u.fkSupervisor = s.idUsuario
                WHERE u.matricula = '${matricula}' AND u.senha = '${senha}';
    `;

    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, matricula, perfil, idSuperior, senha) {
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, matricula, perfil, superior, senha) VALUES
	        ('${nome}', '${email}', '${matricula}', '${perfil}', ${idSuperior}, '${senha}');
    `;

    return database.executar(instrucaoSql);
}


function listar(idSuperior) {
    var instrucaoSql = `
        SELECT 
            idUsuario, nome, email, matricula, ativo
        FROM
            usuario 
        WHERE fkSupervisor = ${idSuperior} AND perfil = 'policial';
    `;
    
    return database.executar(instrucaoSql);
}

function listarPorId(idUsuario) {
    var instrucaoSql = `
        SELECT idUsuario, nome, email, matricula, ativo FROM usuario WHERE idUsuario = ${idUsuario};
    `;

    return database.executar(instrucaoSql);
}

function editar(idUsuario, nome, email, matricula, ativo) {
    var instrucaoSql = `
        UPDATE usuario 
        SET 
            nome = '${nome}',
            email = '${email}',
            matricula = '${matricula}',
            ativo = ${ativo}
        WHERE
            idUsuario = ${idUsuario};
    `
    return database.executar(instrucaoSql);
}

function excluirUsuario(idUsuario) {
    var instrucaoSql = `
        DELETE FROM usuario
        WHERE idUsuario = ${idUsuario};
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    entrar,
    cadastrar,
    listar,
    editar,
    listarPorId,
    excluirUsuario
};