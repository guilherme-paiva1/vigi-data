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

      <a href="#">
        <div class="conteudo-opcao">
            <div class="icon">
                <svg width="27px" height="27px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="style=fill"> <g id="setting"> <path id="Subtract" fill-rule="evenodd" clip-rule="evenodd" d="M10.8946 3.00654C10.2226 1.87704 8.75191 1.45656 7.59248 2.14193L5.86749 3.12906C4.59518 3.85639 4.16378 5.48726 4.8906 6.74522L4.89112 6.74611C5.26606 7.39298 5.20721 7.8062 5.09018 8.00929C4.97308 8.21249 4.64521 8.47001 3.9 8.47001C2.43322 8.47001 1.25 9.66837 1.25 11.12V12.88C1.25 14.3317 2.43322 15.53 3.9 15.53C4.64521 15.53 4.97308 15.7875 5.09018 15.9907C5.20721 16.1938 5.26606 16.607 4.89112 17.2539L4.8906 17.2548C4.16378 18.5128 4.59558 20.1439 5.8679 20.8712L7.59257 21.8581C8.75199 22.5434 10.2226 22.123 10.8946 20.9935L11.0091 20.7958C11.3841 20.1489 11.773 19.9925 12.0087 19.9925C12.2434 19.9925 12.6293 20.1476 12.9993 20.793L13.0009 20.7958L13.1109 20.9858L13.1154 20.9935C13.7874 22.123 15.258 22.5434 16.4174 21.8581L18.1425 20.871C19.4157 20.1431 19.8444 18.5235 19.1212 17.2579L19.1189 17.2539C18.7439 16.607 18.8028 16.1938 18.9198 15.9907C19.0369 15.7875 19.3648 15.53 20.11 15.53C21.5768 15.53 22.76 14.3317 22.76 12.88V11.12C22.76 9.65323 21.5616 8.47001 20.11 8.47001C19.3648 8.47001 19.0369 8.21249 18.9198 8.00929C18.8028 7.8062 18.7439 7.39298 19.1189 6.74611L19.1194 6.74522C19.8463 5.48713 19.4147 3.85604 18.1421 3.12883L16.4175 2.14193C15.2581 1.45656 13.7874 1.877 13.1154 3.00651L13.0009 3.20423C12.6259 3.85115 12.237 4.00751 12.0012 4.00751C11.7666 4.00751 11.3807 3.85247 11.0107 3.20701L11.0091 3.20423L10.8991 3.01421L10.8946 3.00654ZM15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" fill="#000000"></path> </g> </g> </g></svg>
            </div>
            <p>Gestão</p>
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