var modalNotificacao = document.getElementById("modal_notificacao");
var modalUsuario = document.getElementById("modal_usuario");

function mudarModalNotificacao() {
  if (modalNotificacao.style.display == "none") {
    modalUsuario.style.display = "none";

    setTimeout(function () {
      modalNotificacao.style.opacity = "1";
    }, 100);
    modalNotificacao.style.display = "flex";
  } else {
    modalNotificacao.style.opacity = "0";

    setTimeout(function () {
      modalNotificacao.style.display = "none";
    }, 100);
  }
}

function mudarModalUsuario() {
  if (modalUsuario.style.display == "none") {
    modalNotificacao.style.display = "none";

    setTimeout(function () {
      modalUsuario.style.opacity = "1";
    }, 100);
    modalUsuario.style.display = "flex";
  } else {
    modalUsuario.style.opacity = "0";

    setTimeout(function () {
      modalUsuario.style.display = "none";
    }, 100);
  }
}
