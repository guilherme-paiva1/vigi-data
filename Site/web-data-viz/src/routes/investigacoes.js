var express = require("express");
var router = express.Router();

var investigacoesController = require("../controllers/investigacoesController");

router.post("/exibir", function (req, res) {
    investigacoesController.exibir(req, res);
});

module.exports = router;