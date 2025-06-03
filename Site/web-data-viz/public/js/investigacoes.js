window.onload = function () {
    if (sessionStorage.PERFIL_USUARIO == "delegado") {
        carregarInvestigacoesDelegado();
        carregarPoliciaisInvestigacao();
        visualizarQtdInvestigacaoPorStatus();
    } else {
        document.getElementById("subtitle").innerHTML = "Veja as investigações que você está participando";
        permitirVisualizacaoPorPerfil();
        carregarInvestigacoesPolicial();
    }
}

let listaIDsPoliciais = [];
let listaPoliciaisSelecionados = [];

function abrirConfirmacaoExclusaoInvestigacao() {
    document.getElementById('modal_confirmacao_exclusao_investigacao').classList.remove('oculto');
}

function fecharConfirmacaoExclusaoInvestigacao() {
    document.getElementById('modal_confirmacao_exclusao_investigacao').classList.add('oculto');
}

function confirmarExclusaoInvestigacao() {
    var editar_id_investigacao = document.getElementById("editar_id_investigacao");

    fetch('/investigacao/excluirInvestigacao', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            idServer: editar_id_investigacao.value
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            setTimeout(() => {
                carregarInvestigacoesDelegado();

                setTimeout(function () {
                    fecharConfirmacaoExclusaoInvestigacao();
                }, 1000);
            }, 1000)
        }
    });
}

function adicionarInvestigacao() {
    var titulo = document.getElementById("titulo_investigacao").value;
    var descricao = document.getElementById("descricao_investigacao").value;
    var dt_investigacao = document.getElementById("data_investigacao").value;
    var localidade = document.getElementById("localizacao_investigacao").value;
    var regiao = document.getElementById("regiao_investigacao").value;
    var id = sessionStorage.ID_USUARIO;

    fetch("/investigacao/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fkDelegadoServer: id,
            fkPoliciaisServer: listaIDsPoliciais,
            tituloServer: titulo,
            descricaoServer: descricao,
            dt_investigacaoServer: dt_investigacao,
            localidadeServer: localidade,
            regiaoServer: regiao
        }),
    })
        .then(function (resposta) {
            if (resposta.ok) {
                setTimeout(() => {
                    carregarInvestigacoesDelegado();
                    visualizarQtdInvestigacaoPorStatus();
                    document.getElementById("form_investigacao").reset();
                }, 1000)

            }
        })

}

function carregarInformacoesEditarInvestigacao(idInvestigacao) {
    var editar_id_investigacao = document.getElementById("editar_id_investigacao");
    var editar_titulo_investigacao = document.getElementById("editar_titulo_investigacao");
    var editar_descricao_investigacao = document.getElementById("editar_descricao_investigacao");
    var editar_data_investigacao = document.getElementById("editar_data_investigacao");
    var editar_localizacao_investigacao = document.getElementById("editar_localizacao_investigacao");
    var editar_status_investigacao = document.getElementById("editar_status_investigacao");


    fetch('/investigacao/visualizarInvestigacaoPorId', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            idInvestigacaoServer: idInvestigacao
        })
    }).then(function (resposta) {
        resposta.json().then(json => {
            var investigacao = json[0];

            editar_id_investigacao.value = investigacao.idInvestigacao;
            editar_titulo_investigacao.value = investigacao.titulo;
            editar_descricao_investigacao.value = investigacao.descricao;
            editar_data_investigacao.value = investigacao.dt_investigacao.slice(0, 10);
            editar_localizacao_investigacao.value = investigacao.localidade;
            editar_status_investigacao.value = investigacao.status_atual;
        });
    });
}


function editarInvestigacao() {
    const modalEditarInvestigacao = document.getElementById('modal_editar_investigacao');
    var editar_id_investigacao = document.getElementById("editar_id_investigacao");
    var editar_titulo_investigacao = document.getElementById("editar_titulo_investigacao");
    var editar_descricao_investigacao = document.getElementById("editar_descricao_investigacao");
    var editar_data_investigacao = document.getElementById("editar_data_investigacao");
    var editar_localizacao_investigacao = document.getElementById("editar_localizacao_investigacao");
    var editar_status_investigacao = document.getElementById("editar_status_investigacao");

    fetch("/investigacao/editarInvestigacao", {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            idServer: editar_id_investigacao.value,
            tituloServer: editar_titulo_investigacao.value,
            descricaoServer: editar_descricao_investigacao.value,
            localidadeServer: editar_localizacao_investigacao.value,
            dt_investigacaoServer: editar_data_investigacao.value,
            status_atualServer: editar_status_investigacao.value
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            setTimeout(() => {
                carregarInvestigacoesDelegado();
                modalEditarInvestigacao.style.opacity = "0";
                setTimeout(function () {
                    visualizarQtdInvestigacaoPorStatus();
                    modalEditarInvestigacao.style.display = "none";
                }, 100);
            }, 1000)
        }
    })
}

function carregarInvestigacoesDelegado() {
    var botaoTotal = document.getElementById(`btn_todos`);
    var botaoPendente = document.getElementById(`btn_Pendente`);
    var botaoEmAndamento = document.getElementById(`btn_EmAndamento`);
    var botaoEsclarecida = document.getElementById(`btn_Esclarecida`);
    var botaoNaoEsclarecida = document.getElementById(`btn_NaoEsclarecida`);

    botaoTotal.classList.add("ativo");
    botaoEmAndamento.classList.remove("ativo");
    botaoPendente.classList.remove("ativo");
    botaoEsclarecida.classList.remove("ativo");
    botaoNaoEsclarecida.classList.remove("ativo");

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
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {

                linha_cards.style.display = "flex";
                tabela_investigacoes.innerHTML = ``;
                var estrutura_tabela = ``;
                if (json.length == 0) {
                    estrutura_tabela = `
                    <tr>
                        <td colspan="7">Nenhuma investigação encontrada.</td>
                    </tr>
                    `
                } else {
                    for (var i = 0; i < json.length; i++) {
                        var idInvestigacao = json[i].idInvestigacao;
                        var titulo = json[i].titulo;
                        var localidade = json[i].localidade;
                        var data_separada = json[i].dt_investigacao.slice(0, 10).split("-");
                        var status_atual = json[i].status_atual.charAt(0).toUpperCase() + json[i].status_atual.slice(1);;
                        var qtd_policiais = json[i].qtd_policiais;

                        var dt_investigacao = `${data_separada[2]}/${data_separada[1]}/${data_separada[0]}`

                        var tag_status = ``;
                        if (status_atual == 'Em andamento') {
                            tag_status = 'andamento';

                        } else if (status_atual == 'Não esclarecida') {
                            tag_status = 'nao-esclarecida';

                        } else {
                            tag_status = status_atual.toLowerCase();
                        }

                        estrutura_tabela += `
                    <tr>
                        <td>REQ-${idInvestigacao}</td>
                        <td>${titulo}</td>
                        <td>${localidade}</td>
                        <td>${dt_investigacao}</td>
                        <td><span class="badge status ${tag_status}">${status_atual}</span></td>
                        <td>${qtd_policiais}</td>
                        <td>
                            <div class="actions">
                                <button class="botao botao-azul-claro hiddeable" onclick="mudarModalEditarInvestigacao(${idInvestigacao})">Editar</button>
                                <a href="#" class="botao botao-secundario">Ver Detalhes</a>
                            </div>
                        </td>
                    </tr>   
                    `;
                    }
                }
                tabela_investigacoes.innerHTML += estrutura_tabela;
            })
        }
    })
}

function carregarInvestigacoesPolicial() {
    var botaoTotal = document.getElementById(`btn_todos`);
    var botaoPendente = document.getElementById(`btn_Pendente`);
    var botaoEmAndamento = document.getElementById(`btn_EmAndamento`);
    var botaoEsclarecida = document.getElementById(`btn_Esclarecida`);
    var botaoNaoEsclarecida = document.getElementById(`btn_NaoEsclarecida`);

    botaoTotal.classList.add("ativo");
    botaoEmAndamento.classList.remove("ativo");
    botaoPendente.classList.remove("ativo");
    botaoEsclarecida.classList.remove("ativo");
    botaoNaoEsclarecida.classList.remove("ativo");

    var tabela_investigacoes = document.getElementById("tabela_investigacoes");
    var id = sessionStorage.ID_USUARIO;

    fetch("../investigacao/visualizarInvestigacaoPolicial", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            fkUsuarioServer: id
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {

                linha_cards.style.display = "flex";
                tabela_investigacoes.innerHTML = ``;
                var estrutura_tabela = ``;
                if (json.length == 0) {
                    estrutura_tabela = `
                    <tr>
                        <td colspan="7">Nenhuma investigação encontrada.</td>
                    </tr>
                    `
                } else {
                    for (var i = 0; i < json.length; i++) {
                        var idInvestigacao = json[i].idInvestigacao;
                        var titulo = json[i].titulo;
                        var localidade = json[i].localidade;
                        var data_separada = json[i].dt_investigacao.slice(0, 10).split("-");
                        var status_atual = json[i].status_atual.charAt(0).toUpperCase() + json[i].status_atual.slice(1);;
                        var qtd_policiais = json[i].qtd_policiais;

                        var dt_investigacao = `${data_separada[2]}/${data_separada[1]}/${data_separada[0]}`

                        var tag_status = ``;
                        if (status_atual == 'Em andamento') {
                            tag_status = 'andamento';

                        } else if (status_atual == 'Não esclarecida') {
                            tag_status = 'nao-esclarecida';

                        } else {
                            tag_status = status_atual.toLowerCase();
                        }

                        estrutura_tabela += `
                    <tr>
                        <td>REQ-${idInvestigacao}</td>
                        <td>${titulo}</td>
                        <td>${localidade}</td>
                        <td>${dt_investigacao}</td>
                        <td><span class="badge status ${tag_status}">${status_atual}</span></td>
                        <td>${qtd_policiais}</td>
                    </tr>   
                    `;
                    }
                }
                tabela_investigacoes.innerHTML += estrutura_tabela;
            })
        }
    })
}

function visualizarQtdInvestigacaoPorStatus() {
    var id = sessionStorage.ID_USUARIO;
    var cardTotal = document.getElementById("card_total");
    var cardPendentes = document.getElementById("card_pendente");
    var cardAndamento = document.getElementById("card_andamento");
    var cardConcluido = document.getElementById("card_concluido");

    fetch("../investigacao/visualizarQtdInvestigacaoPorStatus", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            idServer: id,
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {

                linha_cards.style.display = "flex";
                cardTotal.innerHTML = json[0].qtd_total;
                cardAndamento.innerHTML = json[0].qtd_andamento;
                cardPendentes.innerHTML = json[0].qtd_pendente;
                cardConcluido.innerHTML = json[0].total_concluido;


            })
        }
    })

}

function visualizarInvestigacaoPorStatus(status) {
    var botaoStatusAtual = document.getElementById(`btn_${status}`);
    var botaoTotal = document.getElementById(`btn_todos`);
    var botaoPendente = document.getElementById(`btn_Pendente`);
    var botaoEmAndamento = document.getElementById(`btn_EmAndamento`);
    var botaoEsclarecida = document.getElementById(`btn_Esclarecida`);
    var botaoNaoEsclarecida = document.getElementById(`btn_NaoEsclarecida`);

    botaoTotal.classList.remove("ativo");
    botaoEmAndamento.classList.remove("ativo");
    botaoPendente.classList.remove("ativo");
    botaoEsclarecida.classList.remove("ativo");
    botaoNaoEsclarecida.classList.remove("ativo");

    botaoStatusAtual.classList.add("ativo");

    var tabela_investigacoes = document.getElementById("tabela_investigacoes");
    var id = sessionStorage.ID_USUARIO;
    var status_atual = ``

    if (status == 'EmAndamento') {
        status_atual = 'Em andamento';

    } else if (status == 'NaoEsclarecida') {
        status_atual = 'Não esclarecida';

    } else {
        status_atual = status;
    }

    fetch("../investigacao/visualizarInvestigacaoPorStatus", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            idServer: id,
            status_atualServer: status_atual
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {

                linha_cards.style.display = "flex";
                tabela_investigacoes.innerHTML = ``;
                var estrutura_tabela = ``;

                if (json.length == 0) {
                    estrutura_tabela = `
                    <tr>
                        <td colspan="7">Nenhuma investigação com esse status encontrada.</td>
                    </tr>
                    `
                } else {
                    for (var i = 0; i < json.length; i++) {
                        var idInvestigacao = json[i].idInvestigacao;
                        var titulo = json[i].titulo;
                        var localidade = json[i].localidade;
                        var data_separada = json[i].dt_investigacao.slice(0, 10).split("-");
                        var status_atual = json[i].status_atual.charAt(0).toUpperCase() + json[i].status_atual.slice(1);;
                        var qtd_policiais = json[i].qtd_policiais;

                        var dt_investigacao = `${data_separada[2]}/${data_separada[1]}/${data_separada[0]}`

                        var tag_status = ``;
                        if (status_atual == 'Em andamento') {
                            tag_status = 'andamento';

                        } else if (status_atual == 'Não esclarecida') {
                            tag_status = 'nao-esclarecida';

                        } else {
                            tag_status = status_atual.toLowerCase();
                        }

                        estrutura_tabela += `
                            <tr>
                            <td>REQ-${idInvestigacao}</td>
                            <td>${titulo}</td>
                            <td>${localidade}</td>
                            <td>${dt_investigacao}</td>
                            <td><span class="badge status ${tag_status}">${status_atual}</span></td>
                            <td>${qtd_policiais}</td>
                            `
                        if (sessionStorage.PERFIL_USUARIO == "delegado") {
                            estrutura_tabela += `
                            <td>
                                <div class="actions">
                                    <button class="botao botao-azul-claro" onclick="mudarModalEditarInvestigacao(${idInvestigacao})">Editar</button>
                                </div>
                            </td>
                    `;
                        }
                        estrutura_tabela += "</tr>";
                    }
                }
                tabela_investigacoes.innerHTML = estrutura_tabela;
            })
        }
    })
}

function carregarPoliciaisInvestigacao() {
    var idSuperior = sessionStorage.ID_USUARIO;
    fetch("../usuarios/listar", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            idSuperiorServer: idSuperior
        })
    })
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.text().then(function (text) {
                    var selectPoliciais = document.getElementById('policiais_investigacao');
                    if (text) {
                        var usuarios = JSON.parse(text);
                        selectPoliciais.innerHTML = '';
                        var option = document.createElement('option');
                        option.value = "";
                        option.disabled = true;
                        option.selected = true;
                        option.textContent = "Selecione os policiais";
                        selectPoliciais.appendChild(option);

                        usuarios.forEach(function (usuario) {
                            var option = document.createElement('option');
                            option.value = usuario.idUsuario;
                            option.textContent = usuario.nome;
                            selectPoliciais.appendChild(option);
                        });
                    } else {
                        selectPoliciais.innerHTML = '';
                        var option = document.createElement('option');
                        option.value = "";
                        option.disabled = true;
                        option.selected = true;
                        option.textContent = "Você não possui policiais vinculados, cadastre um policial primeiro";
                        selectPoliciais.appendChild(option);
                    }
                });
            }
        })
        .catch(function (erro) {
            console.error('Erro:', erro);
        });
}

function selecionarPolicialInvestigacao() {
    var selectPoliciais = document.getElementById('policiais_investigacao');
    var listaPoliciais = document.getElementById('ul_policiais_selecionados_investigacao');
    var idSelecionado = selectPoliciais.value;

    if (idSelecionado && !listaIDsPoliciais.includes(idSelecionado)) {
        listaIDsPoliciais.push(idSelecionado);
        listaPoliciaisSelecionados.push(selectPoliciais.options[selectPoliciais.selectedIndex].text);

        var li = document.createElement('li');
        li.textContent = selectPoliciais.options[selectPoliciais.selectedIndex].text + " ";
        var img = document.createElement('img');
        img.src = "../assets/icons/icon-trash.svg";
        img.alt = "Remover";
        img.onclick = function () {
            var index = listaIDsPoliciais.indexOf(idSelecionado);
            if (index > -1) {
                listaIDsPoliciais.splice(index, 1);
                listaPoliciaisSelecionados.splice(index, 1);
                li.remove();
            }
        };
        img.style.cursor = "pointer";
        img.style.width = "1rem";
        li.appendChild(img);
        listaPoliciais.appendChild(li);
    }
    selectPoliciais.value = "";
}

function permitirVisualizacaoPorPerfil() {
    var elementosAEsconder = document.getElementsByClassName("hiddeable");

    for (var i = 0; i < elementosAEsconder.length; i++) {
        elementosAEsconder[i].style.display = "none";
        elementosAEsconder[i].style.opacity = "0";
        elementosAEsconder[i].style.visibility = "hidden";
        elementosAEsconder[i].style.pointerEvents = "none";
        elementosAEsconder[i].style.height = "0";
        elementosAEsconder[i].style.width = "0";
        elementosAEsconder[i].style.position = "absolute";
    }
    document.getElementById("linha_cards").style.display = "none";

}