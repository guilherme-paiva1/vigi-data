var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/entrar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.post("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

router.post("/listarPorId", function (req, res) {
    usuarioController.listarPorId(req, res);
});

router.post("/excluir", function (req, res) {
    usuarioController.excluirUsuario(req, res);
});

router.put("/editar", function (req, res) {
    usuarioController.editar(req, res);
});

module.exports = router;