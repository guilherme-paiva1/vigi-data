function carregarRequisicoes() {
    var tabela_requisicoes = document.getElementById("tabela_requisicoes");

    // Mockado por enquanto, depois substituir por fetch
    if (sessionStorage.PERFIL_USUARIO == "policial") {
        tabela_requisicoes.innerHTML = `
        <tr>
            <td>REQ-002</td>
            <td>Roubo</td>
            <td>Rua 123</td>
            <td>05/07/2025</td>
            <td><span class="badge status andamento">Em Andamento</span></td>
            <td>4</td>
            <td><span class="badge risco medio">Médio</span></td>
            <td>
                <div class="progress-cell">
                    <div class="progress">
                        <div class="progress-bar" style="width: 65%"></div>
                    </div>
                    <span class="progress-text">65%</span>
                </div>
            </td>
            <td>
                <div class="actions">
                    <button disabled class="botao botao-azul-claro">Inscrever-se</button>
                    <a href="#" class="botao botao-secundario">Ver Detalhes</a>
                </div>
            </td>
        </tr>
        <tr>
            <td>REQ-002</td>
            <td>Roubo</td>
            <td>Rua 123</td>
            <td>05/07/2025</td>
            <td><span class="badge status andamento">Em Andamento</span></td>
            <td>4</td>
            <td><span class="badge risco medio">Médio</span></td>
            <td>
                <div class="progress-cell">
                    <div class="progress">
                        <div class="progress-bar" style="width: 65%"></div>
                    </div>
                    <span class="progress-text">65%</span>
                </div>
            </td>
            <td>
                <div class="actions">
                    <button disabled class="botao botao-azul-claro">Inscrever-se</button>
                    <a href="#" class="botao botao-secundario">Ver Detalhes</a>
                </div>
            </td>
        </tr>
        `;
        return;
    }

    tabela_requisicoes.innerHTML = `
        <tr>
            <td>REQ-002</td>
            <td>Roubo</td>
            <td>Rua 123</td>
            <td>05/07/2025</td>
            <td><span class="badge status andamento">Em Andamento</span></td>
            <td>4</td>
            <td><span class="badge risco medio">Médio</span></td>
            <td>
                <div class="progress-cell">
                    <div class="progress">
                        <div class="progress-bar" style="width: 65%"></div>
                    </div>
                    <span class="progress-text">65%</span>
                </div>
            </td>
            <td>
                <div class="actions">
                    <button disabled class="botao botao-azul-claro">Editar</button>
                    <a href="#" class="botao botao-secundario">Excluir</a>
                </div>
            </td>
        </tr>
        <tr>
            <td>REQ-002</td>
            <td>Roubo</td>
            <td>Rua 123</td>
            <td>05/07/2025</td>
            <td><span class="badge status andamento">Em Andamento</span></td>
            <td>4</td>
            <td><span class="badge risco medio">Médio</span></td>
            <td>
                <div class="progress-cell">
                    <div class="progress">
                        <div class="progress-bar" style="width: 65%"></div>
                    </div>
                    <span class="progress-text">65%</span>
                </div>
            </td>
            <td>
                <div class="actions">
                    <button disabled class="botao botao-azul-claro">Editar</button>
                    <a href="#" class="botao botao-secundario">Excluir</a>
                </div>
            </td>
        </tr>
        `;
}