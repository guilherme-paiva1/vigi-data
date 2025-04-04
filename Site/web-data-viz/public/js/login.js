function entrar() {
    var matricula = ipt_matricula.value; 
    var senha = ipt_senha.value; 

    fetch("/usuarios/entrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            matriculaServer: matricula,
            senhaServer: senha
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            resposta.json().then(json => {
                sessionStorage.ID_USUARIO = json.id_usuario;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.MATRICULA_USUARIO = json.matricula;
                sessionStorage.PERFIL_USUARIO = json.perfil;
                sessionStorage.SUPERIOR_USUARIO = json.superior;

                setTimeout(function () {
                }, 1000);

            });

        } else {

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}