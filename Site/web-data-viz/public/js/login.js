function entrar() {
    var matricula = ipt_matricula.value;
    var senha = ipt_senha.value;

    // Detecta se está rodando local ou em produção
    const URL_API = window.location.hostname === "localhost" 
        ? "http://localhost:8080" 
        : "https://vigi-data.duckdns.org";

    fetch(`${URL_API}/usuarios/entrar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            matriculaServer: matricula,
            senhaServer: senha
        })
    })
    .then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                sessionStorage.ID_USUARIO = json.idUsuario;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.MATRICULA_USUARIO = json.matricula;
                sessionStorage.PERFIL_USUARIO = json.perfil;
                sessionStorage.SUPERIOR_USUARIO = json.superior;

                if (sessionStorage.PERFIL_USUARIO == "policial") {
                    setTimeout(function () {
                        window.location = "../private/investigacoes.html";
                    }, 1000);
                } else if (sessionStorage.PERFIL_USUARIO == "delegado") {
                    setTimeout(function () {
                        window.location = "../private/dashboard.html";
                    }, 1000);
                }
            });
        } else {
            resposta.text().then(texto => {
                span_mensagem.innerHTML = `❌ ${texto}`;
            });
        }
    })
    .catch(function (erro) {
        console.log("❌ Erro na conexão com o servidor: ", erro);
        span_mensagem.innerHTML = "❌ Erro na conexão com o servidor. Verifique sua internet ou tente mais tarde.";
    });

    return false;
}
