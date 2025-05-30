var express = require("express");
var router = express.Router();

var notificacaoController = require("../controllers/notificacaoController");

// Rota para cadastrar notificação
router.post("/cadastrar", function (req, res) {
    notificacaoController.cadastrar(req, res);
});

module.exports = router;