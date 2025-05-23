window.onload = function () {
    carregarInvestigacoes();
}

function carregarInvestigacoes() {
    var tabela_investigacoes = document.getElementById("tabela_investigacoes");
    var id = sessionStorage.ID_USUARIO;

    fetch("../investigacao/visualizarInvestigacoes", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            fkUsuarioServer: id
        })
    }).then(function (resposta){
        console.log("resposta: ", resposta)
        if(resposta.ok) {
            resposta.json().then(json => {
            console.log("oi")

                linha_cards.style.display = "flex";
                var estrutura_tabela = ``;
                
                for (var i = 0; i < json.length; i++) {
                    var idInvestigacao = json[i].idInvestigacao;
                    var titulo = json[i].titulo;
                    var localidade = json[i].localidade;
                    var dt_investigacao = json[i].dt_investigacao.slice(0, 10);
                    var status_atual = json[i].status_atual.charAt(0).toUpperCase() + json[i].status_atual.slice(1);;
                    var qtd_policiais = json[i].qtd_policiais;
                    
                    
                    estrutura_tabela += `
                    <tr>
                    <td>REQ-${idInvestigacao}</td>
                    <td>${titulo}</td>
                    <td>${localidade}</td>
                    <td>${dt_investigacao}</td>
                    <td><span class="badge status andamento">${status_atual}</span></td>
                    <td>${qtd_policiais}</td>
                    <td>
                        <div class="actions">
                            <a href="#" class="botao botao-secundario">Ver Detalhes</a>
                        </div>
                    </td>
                </tr>   
                    `;
                }
                tabela_investigacoes.innerHTML += estrutura_tabela;
            })
        }
    })
}