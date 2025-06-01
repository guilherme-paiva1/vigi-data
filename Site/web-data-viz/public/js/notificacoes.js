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
                
                // Mostrar mensagem de sucesso
                alert('Notificação cadastrada com sucesso!');
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

                notificacoes.forEach(function (notificacao) {
                    
                });
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
        img.onclick = function() {
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