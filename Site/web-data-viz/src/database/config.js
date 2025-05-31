require('dotenv').config();
const mysql = require('mysql2');

const mySqlConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 3306
};

function executar(instrucao) {
    if (process.env.AMBIENTE_PROCESSO !== "producao" && process.env.AMBIENTE_PROCESSO !== "desenvolvimento") {
        console.log("\n❌ O AMBIENTE (producao ou desenvolvimento) NÃO FOI DEFINIDO no arquivo .env\n");
        return Promise.reject("❌ AMBIENTE NÃO CONFIGURADO NO .env");
    }

    return new Promise((resolve, reject) => {
        const conexao = mysql.createConnection(mySqlConfig);

        conexao.connect((erro) => {
            if (erro) {
                console.error("❌ Erro ao conectar no MySQL:", erro.message);
                reject(erro);
                return;
            }

            conexao.query(instrucao, (erro, resultados) => {
                conexao.end();

                if (erro) {
                    console.error("❌ Erro na execução da instrução SQL:", erro.sqlMessage);
                    reject(erro);
                    return;
                }

                console.log("✅ Resultado da execução:", resultados);
                resolve(resultados);
            });
        });
    });
}

module.exports = {
    executar
};
