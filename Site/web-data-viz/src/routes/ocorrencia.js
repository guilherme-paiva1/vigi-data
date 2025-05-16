var express = require("express");
var router = express.Router();

var ocorrenciaController = require("../controllers/ocorrenciaController");

router.post("/listar", function (req, res) {
    ocorrenciaController.listar(req, res);
})

module.exports = router;