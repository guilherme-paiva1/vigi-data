

function mudarModalNovaNotificacao() {
    const modalNovaNotificacao = document.getElementById("modal_nova_notificacao");
    if (modalNovaNotificacao.style.display === "flex") {
        modalNovaNotificacao.style.display = "none";
    } else {
        modalNovaNotificacao.style.display = "flex";
    }
}

function mudarModalEditarNotificacao() {
    const modalEditarNotificacao = document.getElementById("modal_editar_notificacao");
    if (modalEditarNotificacao.style.display === "flex") {
        modalEditarNotificacao.style.display = "none";
    } else {
        modalEditarNotificacao.style.display = "flex";
    }
}

function abrirConfirmacaoExclusao() {
    document.getElementById("modal_confirmacao_exclusao_notificacao").classList.remove("oculto");
}

function fecharConfirmacaoExclusao() {
    document.getElementById("modal_confirmacao_exclusao_notificacao").classList.add("oculto");
}

function confirmarExclusaoNotificacao() {
    // Lógica para excluir a notificação
    alert("Notificação excluída com sucesso!");
    fecharConfirmacaoExclusao();
    mudarModalEditarNotificacao();
}

// Fechar modais ao clicar fora
window.addEventListener("click", (event) => {
    const modalNotificacao = document.getElementById("modal_notificacao");
    const modalUsuario = document.getElementById("modal_usuario");
    const modalNovaNotificacao = document.getElementById("modal_nova_notificacao");
    const modalEditarNotificacao = document.getElementById("modal_editar_notificacao");

    if (event.target === modalNotificacao) {
        modalNotificacao.style.display = "none";
    }
    if (event.target === modalUsuario) {
        modalUsuario.style.display = "none";
    }
    if (event.target === modalNovaNotificacao) {
        modalNovaNotificacao.style.display = "none";
    }
    if (event.target === modalEditarNotificacao) {
        modalEditarNotificacao.style.display = "none";
    }
});


// Adicione esta propriedade ao objeto de notificação mockada
notificacoesMock = [
    {
        id: 1,
        titulo: "Manutenção programada",
        descricao: "O sistema ficará indisponível neste sábado das 8h às 12h para manutenção.",
        tipo: "informativa",
        destinatario: "Todos",
        status: "ativo",
        data: "2023-05-15T10:00:00",
        lida: false // Adicionado
    },
    // ... outras notificações
];

// Função para marcar como lida
function marcarComoLida() {
    const id = parseInt(document.getElementById('id_notificacao_editar').value);
    const notificacao = notificacoesMock.find(n => n.id === id);
    
    if (notificacao) {
        notificacao.lida = true;
        renderizarNotificacoes();
        mudarModalEditarNotificacao();
        alert("Notificação marcada como lida!");
    }
}

// Atualize a função renderizarNotificacoes para mostrar o status "lida"
function renderizarNotificacoes() {
    const listaNotificacoes = document.getElementById('div_lista_notificacoes');
    listaNotificacoes.innerHTML = '';

    notificacoesMock.forEach(notificacao => {
        // ... código existente ...
        
        listaNotificacoes.innerHTML += `
            <div class="notificacao-item ${notificacao.lida ? 'lida' : ''}" data-id="${notificacao.id}">
                <div class="notificacao-tipo" style="background-color: ${cor}">${icone}</div>
                <div class="notificacao-info">
                    <h4>${notificacao.titulo}</h4>
                    <p>${notificacao.descricao}</p>
                    <small>${new Date(notificacao.data).toLocaleString()} • ${notificacao.destinatario}</small>
                </div>
                <div class="notificacao-acoes">
                    <button class="btn-lida" onclick="marcarComoLidaDireto(${notificacao.id})" title="Marcar como lida">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 13L9 17L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <button class="btn-excluir" onclick="abrirConfirmacaoExclusaoNotificacao(${notificacao.id})" title="Excluir">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    });
}

// Função para marcar como lida diretamente da lista
function marcarComoLidaDireto(id) {
    const notificacao = notificacoesMock.find(n => n.id === id);
    if (notificacao) {
        notificacao.lida = true;
        renderizarNotificacoes();
    }
}

// Função para abrir confirmação de exclusão diretamente da lista
function abrirConfirmacaoExclusaoNotificacao(id) {
    document.getElementById('id_notificacao_editar').value = id;
    abrirConfirmacaoExclusao();
}