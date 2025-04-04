var usuarioModel = require("../models/usuarioModel");

function entrar(req, res) {
    var matricula = req.body.matriculaServer;
    var senha = req.body.senhaServer;

    if (matricula == undefined) {
        res.status(400).send("Matrícula inválida.");
    } else if (senha == undefined) {
        res.status(400).send("Senha inválida.");
    } else {

        usuarioModel.entrar(matricula, senha)
            .then(
                function (resultadoAutenticar) {
                    if (resultadoAutenticar.length == 1) {
                        res.json({
                            id_usuario: resultadoAutenticar[0].id_usuario,
                            nome: resultadoAutenticar[0].nome,
                            email: resultadoAutenticar[0].email,
                            matricula: resultadoAutenticar[0].matricula,
                            perfil: resultadoAutenticar[0].perfil,
                            superior: resultadoAutenticar[0].superior,
                        });
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Matrícula ou senha inválidos.");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var matricula = req.body.matriculaServer
    var perfil = req.body.perfil;
    var idSuperior = req.body.idSuperiorServer;
    var senha = req.body.senhaServer 

    if (nome == undefined) {
        res.status(400).send("Erro. Tente novamente mais tarde.");
    } else if (email == undefined) {
        res.status(400).send("Erro. Tente novamente mais tarde.");
    } else if (idSuperior == undefined) {
        res.status(400).send("Erro. Tente novamente mais tarde.");
    } else if (perfil == undefined) {
        res.status(400).send("Erro. Tente novamente mais tarde.");
    } else if (matricula == undefined) {
        res.status(400).send("Erro. Tente novamente mais tarde.");
    } else if (senha == undefined) {
        res.status(400).send("Erro. Tente novamente mais tarde.");
    } else {
        usuarioModel.cadastrar(nome, email, matricula, perfil, idSuperior, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    entrar,
    cadastrar
}