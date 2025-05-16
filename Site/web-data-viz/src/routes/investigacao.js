var express = require("express");
var router = express.Router();

var investigacaoController = require("../controllers/investigacaoController");

router.post("/cadastrar", function (req, res) {
    investigacaoController.cadastrar(req, res);
});

router.post("/visualizarRequisicoes", function (req, res) {
    investigacaoController.visualizarRequisicoes(req, res);
});

module.exports = router;