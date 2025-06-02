window.onload = function () {
    visualizarDesempenhoPolicial();
}

function visualizarDesempenhoPolicial() {
    var id = sessionStorage.ID_USUARIO;

    fetch(`../investigacao/visualizarDesempenhoPolicial/${id}`, {
        method: "GET"
    })
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (dados) {
                    console.log("Desempenho policial:", dados);
                });
            }
        })
        .catch(function (erro) {
            console.error("Erro:", erro.message);
        });
}