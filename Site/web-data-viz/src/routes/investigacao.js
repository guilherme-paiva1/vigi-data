var express = require("express");
var router = express.Router();

var investigacaoController = require("../controllers/investigacaoController");

router.post("/cadastrar", function (req, res) {
    investigacaoController.cadastrar(req, res);
});

router.post("/visualizarInvestigacoes", function (req, res) {
    investigacaoController.visualizarInvestigacoes(req, res);
});

router.post("/exibir", function (req, res) {
    investigacaoController.exibir(req, res);
});

router.post("/excluirInvestigacao", function (req, res) {
    investigacaoController.excluirInvestigacao(req, res);
});

router.post("/visualizarInvestigacaoPolicial", function (req, res) {
    investigacaoController.visualizarInvestigacaoPolicial(req, res);
});

module.exports = router;