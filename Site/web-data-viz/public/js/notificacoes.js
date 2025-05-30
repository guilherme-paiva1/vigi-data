// Função para adicionar nova notificação
function adicionarNotificacao() {
    var titulo = document.getElementById('titulo_nova_notificacao').value;
    var descricao = document.getElementById('descricao_notificacao').value;
    var tipo = document.getElementById('tipo_notificacao').value;
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
            tipoServer: tipo,
            statusServer: "ativo" // Valor padrão
        }),
    })
    .then(function (resposta) {
        if (resposta.ok) {
            return resposta.json();
        }
        throw new Error('Erro na resposta do servidor');
    })
    .then(function (respostaJson) {
        // Fechar o modal e limpar o formulário
        mudarModalNovaNotificacao();
        document.getElementById('form_notificacao').reset();
        
        // Recarregar a lista de notificações
        carregarNotificacoes();
        
        // Mostrar mensagem de sucesso
        alert('Notificação cadastrada com sucesso!');
    })
    .catch(function (erro) {
        console.error('Erro:', erro);
        alert('Erro ao cadastrar notificação: ' + erro.message);
    });

    // Impede o envio padrão do formulário
    return false;
}

function mudarModalNovaNotificacao() {
    var modalNovaNotificacao = document.getElementById("modal_nova_notificacao");
    if (modalNovaNotificacao.style.display === "flex") {
        modalNovaNotificacao.style.display = "none";
    } else {
        modalNovaNotificacao.style.display = "flex";
    }
}