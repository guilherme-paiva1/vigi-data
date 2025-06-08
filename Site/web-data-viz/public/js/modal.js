var modalNotificacao, modalUsuario, conteudoModal, modalNovoUsuario, modalEditarUsuario, modalDesempenhoUsuario, modalEditarAlerta;

modalNotificacao = document.getElementById("modal_notificacao");
modalUsuario = document.getElementById("modal_usuario");
conteudoModal = document.getElementById("modal_conteudo");
modalNovoUsuario = document.getElementById("modal_novo_usuario");
modalEditarUsuario = document.getElementById("modal_editar_usuario");
modalDesempenhoUsuario = document.getElementById("modal_desempenho_usuario");
modalExclusaoInvestigacao = document.getElementById("modal_confirmacao_exclusao_investigacao");
modalEditarAlerta = document.getElementById("modal_editar_alerta");

nomeSession();
distintivoSession();
perfilSession();
mostrarNotificacoes();

function sair() {
  sessionStorage.clear();
  window.location.href = "../index.html";
}

var btnMenu = document.getElementById("btn_menu");
var navbar = document.querySelector(".navbar");

btnMenu.addEventListener("click", function () {
  if (navbar.classList.contains("show")) {
    navbar.classList.remove("show"); // fecha a navbar
    modalNotificacao.style.display = "none";
    modalUsuario.style.display = "none";
  } else {
    navbar.classList.add("show"); // abre a navbar
  }
});

document.addEventListener("click", function (event) {
  if (!btnMenu.contains(event.target) && !navbar.contains(event.target)) {
    navbar.classList.remove("show"); // fecha a navbar se clicar fora
  }
});


function mudarModalNotificacao() {
  if (modalNotificacao.style.display == "flex") {
    modalNotificacao.style.opacity = "0";

    setTimeout(function () {
      modalNotificacao.style.display = "none";
    }, 100);
  } else {
    modalUsuario.style.display = "none";

    setTimeout(function () {
      modalNotificacao.style.opacity = "1";
    }, 100);
    modalNotificacao.style.display = "flex";
  }
}

function mudarModalNovoUsuario() {
  if (modalNovoUsuario.style.display == "flex") {
    modalNovoUsuario.style.opacity = "0";

    setTimeout(function () {
      modalNovoUsuario.style.display = "none";
    }, 100);
  } else {
    setTimeout(function () {
      modalNovoUsuario.style.opacity = "1";
    }, 100);
    modalNovoUsuario.style.display = "flex";
  }
}


function mudarModalNovaInvestigacao() {
  const modalNovaInvestigacao = document.getElementById('modal_nova_investigacao');

  if (modalNovaInvestigacao.style.display == "flex") {
    modalNovaInvestigacao.style.opacity = "0";

    setTimeout(function () {
      modalNovaInvestigacao.style.display = "none";
    }, 100);
  } else {
    modalNovaInvestigacao.style.display = "flex";
    setTimeout(function () {
      modalNovaInvestigacao.style.opacity = "1";
    }, 100);
  }
}

function mudarModalEditarInvestigacao(idInvestigacao) {
  const modalEditarInvestigacao = document.getElementById('modal_editar_investigacao');

  if (modalEditarInvestigacao.style.display == "flex") {
    modalEditarInvestigacao.style.opacity = "0";

    setTimeout(function () {
      modalEditarInvestigacao.style.display = "none";
    }, 100);
  } else {
    carregarInformacoesEditarInvestigacao(idInvestigacao);

    modalEditarInvestigacao.style.display = "flex";
    setTimeout(function () {
      fecharConfirmacaoExclusaoInvestigacao();
      modalEditarInvestigacao.style.opacity = "1";
    }, 100);
  }
}

function mudarModalEditarUsuario(idUsuario) {
  if (modalEditarUsuario.style.display == "flex") {
    modalEditarUsuario.style.opacity = "0";

    setTimeout(function () {
      modalEditarUsuario.style.display = "none";
    }, 100);
  } else {
    carregarInformacoesEditarUsuario(idUsuario);

    setTimeout(function () {
      modalEditarUsuario.style.opacity = "1";
    }, 100);
    modalEditarUsuario.style.display = "flex";
  }
}

function mudarModalDesempenhoUsuario(idUsuario) {
  if (modalDesempenhoUsuario.style.display == "flex") {
    modalDesempenhoUsuario.style.opacity = "0";

    setTimeout(function () {
      modalDesempenhoUsuario.style.display = "none";
    }, 100);
  } else {
    carregarInformacoesDesempenhoUsuario(idUsuario);
    setTimeout(function () {
      modalDesempenhoUsuario.style.opacity = "1";
    }, 100);
    modalDesempenhoUsuario.style.display = "flex";
  }
}

function mudarModalUsuario() {
  if (modalUsuario.style.display == "flex") {
    modalUsuario.style.opacity = "0";

    setTimeout(function () {
      modalUsuario.style.display = "none";
    }, 100);
  } else {
    modalNotificacao.style.display = "none";

    setTimeout(function () {
      modalUsuario.style.opacity = "1";
    }, 100);
    modalUsuario.style.display = "flex";
  }
}

function nomeSession() {
  nome_usuario.innerHTML = sessionStorage.NOME_USUARIO;
}

function distintivoSession() {
  matricula_usuario.innerHTML = sessionStorage.MATRICULA_USUARIO;
}

function perfilSession() {
  perfil_usuario.innerHTML = sessionStorage.PERFIL_USUARIO.charAt(0).toUpperCase() + sessionStorage.PERFIL_USUARIO.slice(1);

  if (sessionStorage.PERFIL_USUARIO == "delegado") {
    conteudoModal.innerHTML += `
      <a href="./dashboard.html">
        <div class="conteudo-opcao">
            <div class="icon">
                <svg width="26px" height="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V3M15 10V17M7 13V17M19 5V17M11 7V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </div>
            <p>Dashboards</p>
        </div>
      </a>

      <hr>

      <a href="#">
        <div class="conteudo-opcao">
            <div class="icon">
                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.2429 22 18.8286 22 16.0002 22H15.0002C12.1718 22 10.7576 22 9.87889 21.1213C9.11051 20.3529 9.01406 19.175 9.00195 17" stroke="#FF2020" stroke-width="1.5" stroke-linecap="round"></path> <path d="M15 12L2 12M2 12L5.5 9M2 12L5.5 15" stroke="#FF2020" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </div>
            <p><span class="texto-sair" onclick="sair()">Sair do sistema</span></p>
        </div>
      </a>
    `
    return;
  }

  if (sessionStorage.PERFIL_USUARIO == "policial") {
    a_investigacoes = document.getElementById("a_investigacoes");
    a_investigacoes.style.display = "none";
    a_usuarios = document.getElementById("a_usuarios");
    a_usuarios.style.display = "none";
    a_notificacoes = document.getElementById("a_notificacoes");
    a_notificacoes.style.display = "none";
    conteudoModal.innerHTML += `
    <a href="./investigacoes.html">
      <div class="conteudo-opcao">
        <div class="icon">
            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 6C20 6 19.1843 6 19.0001 6C16.2681 6 13.8871 4.93485 11.9999 3C10.1128 4.93478 7.73199 6 5.00009 6C4.81589 6 4.00009 6 4.00009 6C4.00009 6 4 8 4 9.16611C4 14.8596 7.3994 19.6436 12 21C16.6006 19.6436 20 14.8596 20 9.16611C20 8 20 6 20 6Z" stroke="#1b1b1d" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </div>
        <p>Minhas investigações</p>
      </div>
    </a>
    <a href="./dashboard-policial.html">
      <div class="conteudo-opcao">
        <div class="icon">
          <svg width="26px" height="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V3M15 10V17M7 13V17M19 5V17M11 7V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </div>
        <p>Minha dashboard</p>
      </div>
    </a>
      <hr>

      <a href="#">
        <div class="conteudo-opcao">
            <div class="icon">
                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.2429 22 18.8286 22 16.0002 22H15.0002C12.1718 22 10.7576 22 9.87889 21.1213C9.11051 20.3529 9.01406 19.175 9.00195 17" stroke="#FF2020" stroke-width="1.5" stroke-linecap="round"></path> <path d="M15 12L2 12M2 12L5.5 9M2 12L5.5 15" stroke="#FF2020" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </div>
            <p><span class="texto-sair" onclick="sair()">Sair do sistema</span></p>
        </div>
      </a>
    `
  }
}

async function carregarNotificacoes() {
  var estruturaHTML = "";
  const icon_urgente = "../assets/icons/icon-alert.svg";
  const icon_informativo = "../assets/icons/icon-time.svg";
  const icon_sucesso = "../assets/icons/icon-done.svg";
  let contagemNotificacoesNaoVistas = 0;

  try {
    const resposta = await fetch("../notificacao/listarNotificacao", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fkUsuarioServer: sessionStorage.ID_USUARIO
      })
    });

    if (resposta.ok) {
      const json = await resposta.json();
      if (json.length == 0) {
        estruturaHTML = `
            <div class="notificacao">
                <div class="notificacao-texto">
                    <h4>Sem notificações</h4>
                    <p>Você não possui notificações no momento.</p>
                </div>
            </div>`;
      } else {
        json.forEach(notificacao => {
          let icon = "";
          let visualizadoClass = notificacao.visualizado == 0 ? "nao-visualizada" : "";
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
              <div class="notificacao ${visualizadoClass}" id="notificacao_${notificacao.idNotificacao}">
              <div class="notificacao-header">
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
              </div>
              <div class="notificacao-acoes">
                ${notificacao.visualizado == 0 ? `<button onclick="visualizarNotificacao(${notificacao.idNotificacao})"><img src="../assets/icons/view.png"> Visualizar</button>` : ""}
                <button onclick="excluirNotificacao(${notificacao.idNotificacao})"><img src="../assets/icons/icon-trash.svg"> Excluir</button>
              </div>
              </div>`;
          if (notificacao.visualizado == 0) contagemNotificacoesNaoVistas++;
        });
      }
    } else {
      const texto = await resposta.text();
      console.error("Erro ao carregar notificações:", texto);
    }
  } catch (error) {
    console.error("Erro ao carregar notificações:", error);
  }
  return [estruturaHTML, contagemNotificacoesNaoVistas];
}

async function mostrarNotificacoes() {
  var notificacoesHTML = await carregarNotificacoes();
  var div_notificacoes = document.getElementById("div_notificacoes");
  var badge = document.getElementById("badge_notificacoes");
  var span_qtd_not = document.getElementById("span_qtd_not");
  div_notificacoes.innerHTML = "";
  div_notificacoes.innerHTML = notificacoesHTML[0];

  if (notificacoesHTML[1] > 0) {
    badge.style.display = "block";
    span_qtd_not.innerHTML = notificacoesHTML[1];
  } else {
    badge.style.display = "none";
  }
}

function excluirNotificacao(idNotificacao) {
  fetch(`../notificacao/excluir`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      idNotificacaoServer: idNotificacao
    })
  })
    .then(function (resposta) {
      if (resposta.ok) {
        mostrarNotificacoes();
      } else {
        console.error("Erro ao excluir notificação:", resposta.statusText);
      }
    })
    .catch(function (erro) {
      console.error("Erro:", erro.message);
    });
}

function visualizarNotificacao(idNotificacao) {
  fetch(`../notificacao/visualizar`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      idNotificacaoServer: idNotificacao
    })
  })
    .then(function (resposta) {
      if (resposta.ok) {
        mostrarNotificacoes();
      } else {
        console.error("Erro ao visualizar notificação:", resposta.statusText);
      }
    })
    .catch(function (erro) {
      console.error("Erro:", erro.message);
    });
}