var express = require("express");
var router = express.Router();

var notificacaoController = require("../controllers/notificacaoController");

// Rota para cadastrar notificação
router.post("/cadastrar", function (req, res) {
    notificacaoController.cadastrar(req, res);
});

router.post("/editarNotificacao", function (req, res) {
    notificacaoController.editarNotificacao(req, res);
});

router.post("/listarNotificacao", function (req, res) {
    notificacaoController.listarNotificacao(req, res);
});

module.exports = router;