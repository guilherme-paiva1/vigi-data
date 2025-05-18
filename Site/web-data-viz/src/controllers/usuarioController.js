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
                            idUsuario: resultadoAutenticar[0].idUsuario,
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
    var matricula = req.body.matriculaServer;
    var idSuperior = req.body.idSuperiorServer;
    var senha = req.body.senhaServer;

    if (nome == undefined) {
        res.status(400).send("Erro. Tente novamente mais tarde.");
    } else if (email == undefined) {
        res.status(400).send("Erro. Tente novamente mais tarde.");
    } else if (idSuperior == undefined) {
        res.status(400).send("Erro. Tente novamente mais tarde.");
    } else if (matricula == undefined) {
        res.status(400).send("Erro. Tente novamente mais tarde.");
    } else if (senha == undefined) {
        res.status(400).send("Erro. Tente novamente mais tarde.");
    } else {
        usuarioModel.cadastrar(nome, email, matricula, idSuperior, senha)
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

function listar(req, res) {
    var idSuperior = req.body.idSuperiorServer;

    if (idSuperior == undefined) {
        res.status(400).send("Erro. Tente novamente mais tarde.");
    } else {
        usuarioModel.listar(idSuperior)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.json(resultado);
                } else {
                    res.status(204).send("Policiais não encontrados");
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

function editar(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var matricula = req.body.matriculaServer
    var ativo = req.body.ativoServer;
    
    if (idUsuario == undefined) {
        res.status(400).send("Erro. Tente novamente mais tarde.");
    } else if (nome == undefined) {
        res.status(400).send("Erro. Tente novamente mais tarde.");
    } else if (email == undefined) {
        res.status(400).send("Erro. Tente novamente mais tarde.");
    } else if (matricula == undefined) {
        res.status(400).send("Erro. Tente novamente mais tarde.");
    } else if (ativo == undefined) {
        res.status(400).send("Erro. Tente novamente mais tarde.");
    } else {
        if (ativo == "ativo") {
            ativo = 1;
        } else {
            ativo = 0;
        }
        usuarioModel.editar(idUsuario, nome, email, matricula, ativo)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao atualizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
        }
    }

function listarPorId(req, res) {
    var idUsuario = req.body.idUsuarioServer;

    if (idUsuario == undefined) {
        res.status(400).send("Erro. Tente novamente mais tarde.");
    } else {
        usuarioModel.listarPorId(idUsuario)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.json(resultado);
                } else {
                    res.status(204).send("Policial não encontrado");
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

function excluirUsuario(req, res) {
    var idUsuario = req.body.idUsuarioServer;

    if (idUsuario == undefined) {
        res.status(400).send("Erro. Tente novamente mais tarde.");
    } else {
        usuarioModel.excluirUsuario(idUsuario)
        .then(
            function (resposta) {
                if (resposta.ok) {
                    res.status(202).send("Usuário excluído com sucesso!");
                } else {
                    res.status(403).send("Erro ao excluir usuário.");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao excluir o usuário! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }

}

module.exports = {
    entrar,
    cadastrar,
    listar,
    editar,
    listarPorId,
    excluirUsuario
}