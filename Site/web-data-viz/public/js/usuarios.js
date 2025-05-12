document.addEventListener('DOMContentLoaded', () => {
    buscarUsuarios();
});



function buscarUsuarios() {
    // Adicionar fetch para buscar os usuários e preencher a tela com esse padrão HTML abaixo

    let users = [
        { id:1, matricula: '12345', nome: 'Carlos Silva', email: 'carlos.silva@policia.gov.br', telefone: '(11) 98765-4321', status: 'ativo' },
        { id:2, matricula: '12346', nome: 'Ana Oliveira', email: 'ana.oliveira@policia.gov.br', telefone: '(11) 98765-4322', status: 'inativo' },
        { id:3, matricula: '12347', nome: 'Marcos Rocha', email: 'marcos.rocha@policia.gov.br', telefone: '(11) 98765-4323', status: 'inativo' },
        { id:4, matricula: '12348', nome: 'Juliana Costa', email: 'juliana.costa@policia.gov.br', telefone: '(11) 98765-4324', status: 'ferias' }
    ];

    var estruturaHTML = '';

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
                    <p>${user.telefone}</p>
                </div>
                <div class="user-actions">
                    <button class="btn-performance" onclick="mudarModalDesempenhoUsuario(${user.id})">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Desempenho
                    </button>
                    <button class="btn-edit" onclick="mudarModalEditarUsuario(${user.id})">
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
    nome_editar_usuario.value = "exemplo_nome";
    matricula_editar_usuario.value = "exemplo_matricula";
    email_editar_usuario.value = "exemplo_email";
    telefone_editar_usuario.value = "exemplo_telefone";
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

function carregarInformacoesDesempenhoUsuario(idUsuario) {
    nome_editar_usuario.value = "exemplo_nome";
    matricula_editar_usuario.value = "exemplo_matricula";
    email_editar_usuario.value = "exemplo_email";
    telefone_editar_usuario.value = "exemplo_telefone";
    status_editar_usuario.value = "exemplo_status";

    // Adicionar Fetch pelo id recebido pra carregar as informações do usuário e preencher os campos do modal de edição
    // Deve ser assim ao finalizar o fetch:
    // nome_editar_usuario.value = usuario.nome;
    // matricula_editar_usuario.value = usuario.matricula;
    // email_editar_usuario.value = usuario.email;
    // telefone_editar_usuario.value = usuario.telefone;
    // status_editar_usuario.value = usuario.status;

}