var express = require("express");
var router = express.Router();

var investigacaoController = require("../controllers/investigacaoController");

router.post("/cadastrar", function (req, res) {
    investigacaoController.cadastrar(req, res);
});

router.post("/visualizarInvestigacoes", function (req, res) {
    investigacaoController.visualizarInvestigacoes(req, res);
});

module.exports = router;