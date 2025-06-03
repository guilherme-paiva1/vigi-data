if (sessionStorage.PERFIL_USUARIO == "policial") window.location.href = "./investigacoes.html";
window.onload = function () {
    carregarPoliciais();
    carregarAlertas();
};

let listaIDsPoliciais = [];
let listaPoliciaisSelecionados = [];

// Função para adicionar nova notificação
function adicionarNotificacao() {
    var titulo = document.getElementById('titulo_nova_notificacao').value;
    var descricao = document.getElementById('descricao_notificacao').value;
    var tipo = document.getElementById('tipo_notificacao').value;
    var fkCriador = sessionStorage.ID_USUARIO;
    var idUsuarios = listaIDsPoliciais;

    // Enviar para o backend
    fetch("../notificacao/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fkUsuariosServer: idUsuarios,
            tituloServer: titulo,
            descricaoServer: descricao,
            tipoServer: tipo,
            fkCriadorServer: fkCriador
        }),
    })
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resultado) {
                    console.log("Notificação cadastrada com sucesso:", resultado);
                    // Fechar o modal e limpar o formulário
                    mudarModalNovaNotificacao();
                    document.getElementById('form_notificacao').reset();

                    // Recarregar a lista de notificações
                    carregarAlertas();
                });
            }
        })
        .catch(function (erro) {
            console.error('Erro:', erro);
            console.log("Erro ao cadastrar notificação:", erro.message);
        });

    // Impede o envio padrão do formulário
    return false;
}

function carregarAlertas() {
    var idUsuario = sessionStorage.ID_USUARIO;

    const icon_urgente = "../assets/icons/icon-alert.svg";
    const icon_informativo = "../assets/icons/icon-time.svg";
    const icon_sucesso = "../assets/icons/icon-done.svg";

    fetch(`../notificacao/listarAlertaDelegado`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fkUsuarioServer: idUsuario
        }),
    })
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (notificacoes) {
                    var listaNotificacoes = document.getElementById('div_lista_notificacoes');
                    listaNotificacoes.innerHTML = ''; // Limpa a lista antes de adicionar novas notificações
                    let estruturaHTML = "";

                    if (notificacoes.length == 0) {
                        estruturaHTML = `
                        <div class="notificacao-listagem">
                            <p>Nenhuma notificação encontrada.</p>
                        </div>`;
                    } else {
                        notificacoes.forEach(function (notificacao) {
                            let icon = "";
                            switch (notificacao.tipo) {
                                case "urgente":
                                    icon = icon_urgente;
                                    break;
                                case "informativa":
                                    icon = icon_informativo;
                                    break;
                                case "sucesso":
                                    icon = icon_sucesso;
                                    break;
                            }
                            estruturaHTML += `
                        <div class="notificacao-listagem notification-type.${notificacao.tipo}" id="notificacao_${notificacao.idAlerta}">
                            <div class="icon">
                                <img src="${icon}" alt="${notificacao.tipo}" style="width:32px;height:32px;">
                            </div>
                            <div class="notificacao-texto">
                                <h4>${notificacao.titulo}</h4>
                                <p>${notificacao.descricao}</p>
                                <p class="notification-date">${new Date(notificacao.dtHoraAlerta).toLocaleDateString("pt-BR", {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}</p>
                            </div>
                            <div class="notification-actions">
                                <button class="btn" onclick="mudarModalEditarAlerta(${notificacao.idAlerta})">Editar</button>
                            </div>
                        </div>`;
                        });
                    }
                    listaNotificacoes.innerHTML = estruturaHTML;
                });
            }
        })
        .catch(function (erro) {
            console.error('Erro:', erro);
        });
}

function carregarPoliciais() {
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
                    var selectPoliciais = document.getElementById('policiais_notificacao');
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

function selecionarPolicial() {
    var selectPoliciais = document.getElementById('policiais_notificacao');
    var listaPoliciais = document.getElementById('ul_policiais_selecionados');
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
    console.log("IDs Policiais Selecionados:", listaIDsPoliciais);
    console.log("Nomes Policiais Selecionados:", listaPoliciaisSelecionados);
    selectPoliciais.value = "";
}

function mudarModalNovaNotificacao() {
    var modalNovaNotificacao = document.getElementById("modal_nova_notificacao");
    if (modalNovaNotificacao.style.display === "flex") {
        modalNovaNotificacao.style.display = "none";
    } else {
        modalNovaNotificacao.style.display = "flex";
    }
}

function mudarModalEditarAlerta(idAlerta) {
    if (modalEditarAlerta.style.display == "flex") {
        modalEditarAlerta.style.opacity = "0";

        setTimeout(function () {
            modalEditarAlerta.style.display = "none";
        }, 100);
    } else {
        carregarInformacoesEditarAlerta(idAlerta);

        setTimeout(function () {
            modalEditarAlerta.style.opacity = "1";
        }, 100);
        modalEditarAlerta.style.display = "flex";
    }
}

function carregarInformacoesEditarAlerta(idAlerta) {
    let id_usuario_editar = document.getElementById('id_notificacao_editar');
    let titulo_editar_notificacao = document.getElementById('titulo_editar_notificacao');
    let descricao_editar_notificacao = document.getElementById('descricao_editar_notificacao');
    let tipo_editar_notificacao = document.getElementById('tipo_editar_notificacao');
    fetch('/notificacao/listarPorId', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            idAlertaServer: idAlerta
        })
    }).then(function (resposta) {
        resposta.json().then(json => {
            let alerta = json[0];
            id_usuario_editar.value = alerta.idAlerta;
            titulo_editar_notificacao.value = alerta.titulo;
            descricao_editar_notificacao.value = alerta.descricao;
            tipo_editar_notificacao.value = alerta.tipo;
        });
    });
}

function editarAlerta() {
    var notificacaoId = document.getElementById('id_notificacao_editar').value;
    var titulo = document.getElementById('titulo_editar_notificacao').value;
    var descricao = document.getElementById('descricao_editar_notificacao').value;
    var tipo = document.getElementById('tipo_editar_notificacao').value;
    fetch('/notificacao/editarNotificacao', {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            idAlertaServer: notificacaoId,
            tituloServer: titulo,
            descricaoServer: descricao,
            tipoServer: tipo
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                mudarModalEditarAlerta();
                carregarAlertas();
            });
        } else {
            console.error("Erro ao editar alerta");
        }
    }).catch(function (erro) {
        console.error('Erro:', erro);
    });
}

function abrirConfirmacaoExclusao() {
    document.getElementById('modal_confirmacao_exclusao').classList.remove('oculto');
}

function fecharConfirmacaoExclusao() {
    document.getElementById('modal_confirmacao_exclusao').classList.add('oculto');
}

function confirmarExclusaoAlerta() {
    var idAlerta = document.getElementById('id_notificacao_editar').value;
    fetch('/notificacao/excluirAlerta', {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            idAlertaServer: idAlerta
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            fecharConfirmacaoExclusao();
            mudarModalEditarAlerta();
            carregarAlertas();
        } else {
            console.error("Erro ao excluir alerta");
        }
    }).catch(function (erro) {
        console.error('Erro:', erro);
    });
}
