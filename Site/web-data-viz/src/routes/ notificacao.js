var express = require("express");
var router = express.Router();
var notificacaoController = require("../controllers/notificacaoController");

router.delete("/excluir", function (req, res) {
    notificacaoController.excluirNotificacao(req, res);
});

module.exports = router;