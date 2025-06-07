window.onload = function () {
    visualizarDesempenhoPolicial();
}

function visualizarDesempenhoPolicial() {
    var id = sessionStorage.ID_USUARIO;

    fetch(`../investigacao/visualizarDesempenhoPolicial/${id}`, {
        method: "GET"
    })
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (dados) {
                    gerarGraficoPorZona(dados);
                    carregarDadosDesempenho(dados);
                    carregarDadosPorMes();
                });
            }
        })
        .catch(function (erro) {
            console.error("Erro:", erro.message);
        });
}

function gerarGraficoPorZona(dados) {
    var investigacoesCentro = dados.investigacoesAtendidasCentro || 0;
    var investigacoesNorte = dados.investigacoesAtendidasNorte || 0;
    var investigacoesSul = dados.investigacoesAtendidasSul || 0;
    var investigacoesLeste = dados.investigacoesAtendidasLeste || 0;
    var investigacoesOeste = dados.investigacoesAtendidasOeste || 0;

    const zoneCtx = document.getElementById('ocorrencias_por_zona').getContext('2d');
    const maxValue = Math.max(investigacoesCentro, investigacoesLeste, investigacoesOeste, investigacoesNorte, investigacoesSul);
    const yMax = Math.ceil(maxValue * 1.2 / 100) * 5;

    new Chart(zoneCtx, {
        type: 'bar',
        data: {
            labels: ['Centro', 'Leste', 'Oeste', 'Norte', 'Sul'],
            datasets: [{
                label: 'Ocorrências',
                data: [investigacoesCentro, investigacoesLeste, investigacoesOeste, investigacoesNorte, investigacoesSul],
                backgroundColor: ['#1E90FF', '#007BFF', '#20c997', '#ffc107', '#dc3545'],
                borderColor: ['#1a7acc', '#0069d9', '#1aa179', '#d39e00', '#c82333'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Ocorrências por Zona'
                },
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function (context) {
                            return `${context.dataset.label}: ${context.raw.toLocaleString()}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: yMax,
                    ticks: {
                        stepSize: 200,
                        callback: function (value) {
                            return value.toLocaleString();
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function carregarDadosDesempenho(dados) {
    var pendentes = dados.totalInvestigacoesPendentes || 0;
    var resolvidas = dados.totalInvestigacoesResolvidas || 0;
    var naoResolvidas = dados.totalInvestigacoesNaoResolvidas || 0;
    var emAndamento = dados.totalInvestigacoesEmAndamento || 0;
    document.getElementById('total_ocorrencias_pendentes').textContent = pendentes;
    document.getElementById('total_ocorrencias_su').textContent = resolvidas;
    document.getElementById('total_ocorrencias_ns').textContent = naoResolvidas;
    document.getElementById('total_ocorrencias_ea').textContent = emAndamento;
    document.getElementById('total_ocorrencias').textContent = pendentes + resolvidas + naoResolvidas + emAndamento;

    const total = pendentes + resolvidas + naoResolvidas + emAndamento;
    const solved = resolvidas;
    const percent = total > 0 ? Math.round((solved / total) * 100) : 0;
    document.getElementById('progress-bar').style.width = percent + '%';
    document.getElementById('progress-bar-label').textContent = percent + '%';
}

async function carregarDadosPorMes() {
    var id = sessionStorage.ID_USUARIO;

    const resposta = await fetch(`../investigacao/visualizarHistoricoPorMes/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idUsuarioServer: id })
    });

    if (resposta.ok) {
        const dados = await resposta.json();
        gerarGraficoPorMes(dados);
    }
}

function gerarGraficoPorMes(dados) {
    const nomesMeses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const totaisPorMes = {};
    dados.forEach(function (item) {
        totaisPorMes[item.mes] = item.total_investigacoes;
    });

    var meses = [];
    var totais = [];
    for (let i = 1; i <= 12; i++) {
        meses.push(nomesMeses[i - 1]);
        totais.push(totaisPorMes[i] || 0);
    }

    const monthCtx = document.getElementById('investigacoes_por_mes').getContext('2d');
    const maxValue = Math.max(...totais);
    const yMax = Math.ceil(maxValue * 1.2);

    new Chart(monthCtx, {
        type: 'line',
        data: {
            labels: meses,
            datasets: [{
                label: 'Total de Investigações',
                data: totais,
                borderColor: '#007BFF',
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Total de Investigações por Mês'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: yMax,
                    ticks: {
                        stepSize: 1,
                        callback: function (value) {
                            if (Number.isInteger(value)) {
                                return value.toLocaleString();
                            }
                            return '';
                        }
                    }
                }
            }
        }
    });
}