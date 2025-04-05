var modalNotificacao = document.getElementById("modal_notificacao");
var modalUsuario = document.getElementById("modal_usuario");

function mudarModalNotificacao() {
    if(modalNotificacao.style.display == "none") {
        setTimeout(function() {
            modalNotificacao.style.opacity = "1";
        }, 100);
        modalNotificacao.style.display = "flex";
    } else {
        setTimeout(function() {
            modalNotificacao.style.opacity = "0";
        }, 100);
        modalNotificacao.style.display = "none";
    }
}

function mudarModalUsuario() {
    if(modalUsuario.style.display == "none") {
        setTimeout(function() {
            modalUsuario.style.opacity = "1";
        }, 100);
        modalUsuario.style.display = "flex";
    } else {
        setTimeout(function() {
            modalUsuario.style.opacity = "0";
        }, 100);
        modalUsuario.style.display = "none";
    }
}