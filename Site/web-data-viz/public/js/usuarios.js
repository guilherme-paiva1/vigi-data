document.addEventListener('DOMContentLoaded', () => {
    buscarUsuarios();
});



function buscarUsuarios() {
    // Adicionar fetch para buscar os usuários e preencher a tela com esse padrão HTML abaixo
    var idSuperior = sessionStorage.ID_USUARIO;

    fetch('/usuarios/listar', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            idSuperiorServer: idSuperior   
        })
    })
    .then(function (resposta){
        if(resposta.ok) {
            resposta.json().then(json => {
                let users = json;
                let estruturaHTML = '';
                let statusExibicao = '';
                users.forEach(user => {
                    switch (user.status) {
                        case 'ativo':
                            statusExibicao = 'Ativo';
                            break;
                        case 'inativo':
                            statusExibicao = 'Inativo';
                            break;
                        case 'ferias':
                            statusExibicao = 'Férias';
                            break;
                    }


                    estruturaHTML += `
                        <div class="user-card">
                            <div class="user-card-header">
                                <div class="user-avatar">
                                    ${user.nome.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </div>
                                <div class="user-info">
                                    <div class="user-name-badge">
                                        <h3 style="color: #2c3e50;">${user.nome}</h3>
                                        <small class="badge-number">Matrícula: ${user.matricula}</small>
                                    </div>
                                    <span class="user-status ${user.status}">
                                        ${statusExibicao}
                                    </span>
                                </div>
                            </div>
                            <div class="user-details">
                                <p>${user.email}</p>
                            </div>
                            <div class="user-actions">
                                <button class="btn-performance" onclick="mudarModalDesempenhoUsuario(${user.idUsuario})">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    Desempenho
                                </button>
                                <button class="btn-edit" onclick="mudarModalEditarUsuario(${user.idUsuario})">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    Editar
                                </button>
                            </div>
                        </div>
                        `;
                });

                lista_usuarios = document.getElementById('div_lista_usuarios');
                lista_usuarios.innerHTML = estruturaHTML;
            })
        }
    })
}


function adicionarUsuario() {
    // Adicionar fetch para adicionar o usuário com os dados recebidos
    console.log(nome_novo_usuario.value);
    console.log(matricula_novo_usuario.value);
    console.log(email_novo_usuario.value);
    console.log(telefone_novo_usuario.value);
    console.log(status_novo_usuario.value);
}

function carregarInformacoesEditarUsuario(idUsuario) {
    console.log("carregar informações do usuário com id: " + idUsuario);
    var id_usuario_editar = document.getElementById('id_usuario_editar');
    var nome_editar_usuario = document.getElementById('nome_editar_usuario');
    var matricula_editar_usuario = document.getElementById('matricula_editar_usuario');
    var email_editar_usuario = document.getElementById('email_editar_usuario');
    var status_editar_usuario = document.getElementById('status_editar_usuario');

    id_usuario_editar.value = 2;
    nome_editar_usuario.value = "exemplo_nome";
    matricula_editar_usuario.value = "exemplo_matricula";
    email_editar_usuario.value = "exemplo_email";
    status_editar_usuario.value = "exemplo_status";

    // Adicionar Fetch pelo id recebido pra carregar as informações do usuário e preencher os campos do modal de edição
    // Deve ser assim ao finalizar o fetch:
    // nome_editar_usuario.value = usuario.nome;
    // matricula_editar_usuario.value = usuario.matricula;
    // email_editar_usuario.value = usuario.email;
    // telefone_editar_usuario.value = usuario.telefone;
    // status_editar_usuario.value = usuario.status;

}


function editarUsuario(idUsuario) {
    // Adicionar fetch para editar o usuário com os dados recebidos
}

function abrirConfirmacaoExclusao() {
    document.getElementById('modal_confirmacao_exclusao').classList.remove('oculto');
}

function fecharConfirmacaoExclusao() {
    document.getElementById('modal_confirmacao_exclusao').classList.add('oculto');
}

function confirmarExclusaoUsuario() {
    // Aqui você coloca sua lógica de exclusão, como chamada para API etc.
    console.log('Usuário excluído');

    // Fecha o modal de confirmação
    fecharConfirmacaoExclusao();

    // Fecha também o modal de edição do usuário
    document.getElementById('modal_edicao_usuario').classList.add('oculto');

    // (Opcional) Redirecionar, atualizar a lista ou mostrar um alerta
    // window.location.href = '/usuarios'; // se quiser redirecionar
}


function carregarInformacoesDesempenhoUsuario(idUsuario) {
    console.log("carregar informações do desempenho do usuário com id: " + idUsuario);
}