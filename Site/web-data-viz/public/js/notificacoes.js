// Função para adicionar nova notificação
function adicionarNotificacao() {
    var titulo = document.getElementById('titulo_nova_notificacao').value;
    var descricao = document.getElementById('descricao_notificacao').value;
    var tipo = document.getElementById('tipo_notificacao').value;
    
    // Substituir a sessionStorage por IDs dos policiais selecionados. Exemplo:
    // var idUsuarios = [1, 2, 3]; // IDs dos policiais selecionados
    var idUsuario = sessionStorage.ID_USUARIO;

    // Enviar para o backend
    fetch("../notificacao/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fkUsuarioServer: idUsuario,
            tituloServer: titulo,
            descricaoServer: descricao,
            tipoServer: tipo
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
                carregarNotificacoes();
                
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

function carregarNotificacoes() {
    var idUsuario = sessionStorage.ID_USUARIO;

    fetch(`../notificacao/listar`, {
        method: "GET",
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

function mudarModalNovaNotificacao() {
    var modalNovaNotificacao = document.getElementById("modal_nova_notificacao");
    if (modalNovaNotificacao.style.display === "flex") {
        modalNovaNotificacao.style.display = "none";
    } else {
        modalNovaNotificacao.style.display = "flex";
    }
}