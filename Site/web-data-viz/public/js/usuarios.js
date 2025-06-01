if (sessionStorage.PERFIL_USUARIO == "policial") window.location.href = "./investigacoes.html";
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
            resposta.text().then(function (text) {
                if (text) {
                let users = JSON.parse(text);
                let estruturaHTML = '';
                let statusExibicao = '';
                users.forEach(user => {
                    switch (user.ativo) {
                        case 1:
                            statusExibicao = 'Ativo';
                            break;
                        case 0:
                            statusExibicao = 'Inativo';
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
                                    <span class="user-status ${statusExibicao.toLowerCase()}">
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
            } else {
                lista_usuarios = document.getElementById('div_lista_usuarios');
                lista_usuarios.innerHTML = '<p class="no-users">Nenhum usuário encontrado.</p>';
            }
        });
    } else {
        console.log("Erro ao buscar usuários");
    }
})
}


function adicionarUsuario() {
    var nome_novo_usuario = document.getElementById('nome_novo_usuario');
    var matricula_novo_usuario = document.getElementById('matricula_novo_usuario');
    var email_novo_usuario = document.getElementById('email_novo_usuario');
    var senha_novo_usuario = document.getElementById('senha_novo_usuario');

    fetch('/usuarios/cadastrar', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: nome_novo_usuario.value,
            matriculaServer: matricula_novo_usuario.value,
            emailServer: email_novo_usuario.value,
            senhaServer: senha_novo_usuario.value,
            idSuperiorServer: sessionStorage.ID_USUARIO
        })
    }).then(function (resposta) {
        if(resposta.ok) {
            console.log("Usuário adicionado com sucesso!");
            window.location.reload(); 
        } else {
            console.log("Erro ao adicionar usuário");
        }
    });
}

function carregarInformacoesEditarUsuario(idUsuario) {
    var id_usuario_editar = document.getElementById('id_usuario_editar');
    var nome_editar_usuario = document.getElementById('nome_editar_usuario');
    var matricula_editar_usuario = document.getElementById('matricula_editar_usuario');
    var email_editar_usuario = document.getElementById('email_editar_usuario');
    var status_editar_usuario = document.getElementById('status_editar_usuario');

    fetch('/usuarios/listarPorId', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            idUsuarioServer: idUsuario   
        })
    }).then(function (resposta) {
        resposta.json().then(json => {
            let usuario = json[0];
            id_usuario_editar.value = usuario.idUsuario;
            nome_editar_usuario.value = usuario.nome;
            matricula_editar_usuario.value = usuario.matricula;
            email_editar_usuario.value = usuario.email;
            if (usuario.ativo == 1) {
                status_editar_usuario.value = 'ativo';
            } else {
                status_editar_usuario.value = 'inativo';
            }
        });
    });
}

function editarUsuario() {
    var id_usuario_editar = document.getElementById('id_usuario_editar');
    var nome_editar_usuario = document.getElementById('nome_editar_usuario');  
    var matricula_editar_usuario = document.getElementById('matricula_editar_usuario');
    var email_editar_usuario = document.getElementById('email_editar_usuario');
    var status_editar_usuario = document.getElementById('status_editar_usuario');

    fetch('/usuarios/editar', {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            idUsuarioServer: id_usuario_editar.value,
            nomeServer: nome_editar_usuario.value,
            matriculaServer: matricula_editar_usuario.value,
            emailServer: email_editar_usuario.value,
            ativoServer: status_editar_usuario.value
        })
    }).then(function (resposta) {
        if(resposta.ok) {
            resposta.json().then(json => {
                console.log(json);
                window.location.reload(); // Recarrega a página atual após edição
            });
        } else {
            console.log("Erro ao editar usuário");
        }
    });
}

function abrirConfirmacaoExclusao() {
    document.getElementById('modal_confirmacao_exclusao').classList.remove('oculto');
}

function fecharConfirmacaoExclusao() {
    document.getElementById('modal_confirmacao_exclusao').classList.add('oculto');
}

function confirmarExclusaoUsuario() {
    // Aqui você coloca sua lógica de exclusão, como chamada para API etc.
    let idUsuario = document.getElementById('id_usuario_editar').value;

    fetch('/usuarios/excluir', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            idUsuarioServer: idUsuario   
        })
    }).then(function (resposta) {
        if(resposta.ok) {
            fecharConfirmacaoExclusao();
            document.getElementById('modal_edicao_usuario').classList.add('oculto');
        }
    });
    window.location.reload(); // Recarrega a página atual após exclusão]
}


function carregarInformacoesDesempenhoUsuario(idUsuario) {
    console.log("carregar informações do desempenho do usuário com id: " + idUsuario);
}