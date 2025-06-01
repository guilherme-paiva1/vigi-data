var express = require("express");
var router = express.Router();

var investigacaoController = require("../controllers/investigacaoController");

router.post("/cadastrar", function (req, res) {
    investigacaoController.cadastrar(req, res);
});

router.post("/visualizarInvestigacoes", function (req, res) {
    investigacaoController.visualizarInvestigacoes(req, res);
});

router.post("/excluirInvestigacao", function (req, res) {
    investigacaoController.excluirInvestigacao(req, res);
});

router.post("/visualizarInvestigacaoPolicial", function (req, res) {
    investigacaoController.visualizarInvestigacaoPolicial(req, res);
});

router.post("/visualizarInvestigacaoPorId", function (req, res) {
    investigacaoController.visualizarInvestigacaoPorId(req, res);
});

router.put("/editar", function (req, res) {
    investigacaoController.editarInvestigacao(req, res);
});

router.put("/visualizarHistoricoPorMes", function (req, res) {
    investigacaoController.visualizarHistoricoPorMes(req, res);
});

module.exports = router;