function visualizarDesempenhoPolicial() {
    var id = sessionStorage.ID_USUARIO;

    fetch(`/visualizarDesempenhoPolicial/${id}`, {
        method: "GET"
    })
        .then(function (resposta) {
            if (resposta.ok) {
                return resposta.json();
            } else if (resposta.status === 204) {
                throw new Error("ID inválido.");
            } else if (resposta.status === 403) {
                throw new Error("Nenhuma investigação encontrada para este mês.");
            } else {
                throw new Error("Erro ao buscar o desempenho.");
            }
        })
        .then(function (dados) {
            console.log("Desempenho recebido:", dados);
        })
        .catch(function (erro) {
            console.error("Erro:", erro.message);
        });
}