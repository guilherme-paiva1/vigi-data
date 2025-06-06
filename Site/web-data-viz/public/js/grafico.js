if (sessionStorage.PERFIL_USUARIO == "policial") window.location.href = "./investigacoes.html";
document.addEventListener('DOMContentLoaded', function () {
  renderizarMapaDeCalor();
  renderizarHistoricoDeInvestigacoes();
});

// Escopo global — só declare uma vez
window.map = null;

async function renderizarOcorrenciaPorTipo(zona) {
  let exibicao = "";
  switch (zona) {
    case "norte":
      exibicao = "Zona Norte";
      break;
    case "sul":
      exibicao = "Zona Sul";
      break;
    case "leste":
      exibicao = "Zona Leste";
      break;
    case "oeste":
      exibicao = "Zona Oeste";
      break;
    case "centro":
      exibicao = "Centro";
      break;
  }
  document.getElementById("titulo_ocorrencias_tipo").innerHTML = "Ocorrências por Tipo - " + exibicao;
  let listaRubricas = ['roubo', 'furto', 'tráfico drogas'];
  let dataDe = document.getElementById("date_periodo_de").value;
  let dataAte = document.getElementById("date_periodo_ate").value;
  let dados = [0, 0, 0];
  document.getElementById('chart-spinner').classList.remove('hidden');

  // Use Promise.all para buscar todos os dados em paralelo
  await Promise.all(listaRubricas.map(async (rubrica, i) => {
    try {
      const resposta = await fetch("../ocorrencia/listar", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          rubricaServer: `= '${rubrica}'`,
          dataDeServer: dataDe,
          dataAteServer: dataAte
        })
      });
      const json = await resposta.json();
      switch (zona) {
        case "norte":
          dados[i] = json[0].qtd_ocorrencia_norte;
          break;
        case "sul":
          dados[i] = json[0].qtd_ocorrencia_sul;
          break;
        case "leste":
          dados[i] = json[0].qtd_ocorrencia_leste;
          break;
        case "oeste":
          dados[i] = json[0].qtd_ocorrencia_oeste;
          break;
        case "centro":
          dados[i] = json[0].qtd_ocorrencia_centro;
          break;
      }
    } catch (erro) {
      console.log(erro);
    }
  }));

  const existingChart = Chart.getChart('crime-chart');
  if (existingChart) {
    existingChart.destroy();
  }

  // Gráfico de barras - Ocorrências por tipo
  const crimeCtx = document.getElementById('crime-chart').getContext('2d');
  new Chart(crimeCtx, {
    type: 'bar',
    data: {
      labels: ['Roubo', 'Furto', 'Tráfico'],
      datasets: [{
        label: 'Ocorrências',
        data: dados,
        backgroundColor: ['#1E90FF', '#007BFF', '#20c997'],
        borderColor: ['#1a7acc', '#0069d9', '#1aa179'],
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
  document.getElementById('chart-spinner').classList.add('hidden');
}

function renderizarHistoricoDeInvestigacoes() {
  // Gráfico de linha - Histórico de investigações
  fetch("../investigacao/visualizarHistoricoPorMes/", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      idUsuarioServer: sessionStorage.ID_USUARIO
    })
  }).then(function (resposta) {
    resposta.json().then(json => {
      let meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      let esclarecidas = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let naoEsclarecidas = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      json.forEach(item => {
        if (item.mes >= 1 && item.mes <= 12) {
          let totalInvestigacoes = item.total_investigacoes;
          let totalEsclarecidas = item.total_esclarecidas;
          esclarecidas[item.mes - 1] = totalEsclarecidas;
          naoEsclarecidas[item.mes - 1] = totalInvestigacoes - totalEsclarecidas;
        }
      })

      console.log(esclarecidas)
      console.log(naoEsclarecidas)

      const investigationCtx = document.getElementById('investigation-chart').getContext('2d');
      new Chart(investigationCtx, {
        type: 'line',
        data: {
          labels: meses,
          datasets: [{
            label: 'Investigações abertas',
            data: naoEsclarecidas,
            borderColor: '#1400D8',
            borderWidth: 2,
            fill: false
          },
          {
            label: 'Investigações esclarecidas',
            data: esclarecidas,
            borderColor: '#15CDB8',
            borderWidth: 2,
            fill: false
            // tension: 0.3
          }]
        },

        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              top: 10,
              right: 15,
              bottom: 10,
              left: 15
            }
          },
          plugins: {
            legend: {
              position: 'top',
              labels: {
                boxWidth: 12,
                padding: 20
              }
            },
            tooltip: {
              mode: 'index',
              intersect: false,
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
              max: 20,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              },
              ticks: {
                callback: function (value) {
                  return value.toLocaleString();
                }
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
    })
  }).catch(function (erro) {
    console.log(erro);
  })
}

function renderizarMapaDeCalor() {
  let rubrica = document.getElementById("select_rubrica").value;
  let dataDe = document.getElementById("date_periodo_de").value;
  let dataAte = document.getElementById("date_periodo_ate").value;
  let zonas = [];

  if (rubrica === "all") {
    rubrica = "('furto', 'roubo', 'tráfico drogas')";
    rubricaQuery = `IN ${rubrica}`;
  } else {
    rubricaQuery = `= '${rubrica}'`;
  }

  fetch("../ocorrencia/listar", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      rubricaServer: rubricaQuery,
      dataDeServer: dataDe,
      dataAteServer: dataAte,
    })
  })
    .then(function (resposta) {
      resposta.json().then(json => {
        const amarelo = '#FFFF00';
        const vermelho = '#FF0000';
        const verde = '#00FF00';

        let sul_ocorr_hab = json[0].qtd_ocorrencia_sul / json[0].qtd_populacao_sul * 100000;
        let norte_ocorr_hab = json[0].qtd_ocorrencia_norte / json[0].qtd_populacao_norte * 100000;
        let leste_ocorr_hab = json[0].qtd_ocorrencia_leste / json[0].qtd_populacao_leste * 100000;
        let oeste_ocorr_hab = json[0].qtd_ocorrencia_oeste / json[0].qtd_populacao_oeste * 100000;
        let centro_ocorr_hab = json[0].qtd_ocorrencia_centro / json[0].qtd_populacao_centro * 100000;

        function getColor(ocorr_hab) {
          if (ocorr_hab < 80) return verde;
          if (ocorr_hab < 150) return amarelo;
          return vermelho;
        }

        let norte_color = getColor(norte_ocorr_hab);
        let sul_color = getColor(sul_ocorr_hab);
        let centro_color = getColor(centro_ocorr_hab);
        let leste_color = getColor(leste_ocorr_hab);
        let oeste_color = getColor(oeste_ocorr_hab);

        carregarKPIsMapaDeCalor(json);

        zonas = [
          { name: 'zona_norte', color: norte_color, ocorr_por_hab: norte_ocorr_hab },
          { name: 'zona_sul', color: sul_color, ocorr_por_hab: sul_ocorr_hab },
          { name: 'zona_leste', color: leste_color, ocorr_por_hab: leste_ocorr_hab },
          { name: 'zona_oeste', color: oeste_color, ocorr_por_hab: oeste_ocorr_hab },
          { name: 'centro', color: centro_color, ocorr_por_hab: centro_ocorr_hab }
        ];

        // Verifica e remove se já houver um mapa criado
        if (window.map !== null) {
          window.map.remove();

          const oldContainer = document.getElementById('div_mapa');
          const newContainer = oldContainer.cloneNode(false);
          oldContainer.parentNode.replaceChild(newContainer, oldContainer);
        }

        // Cria um novo mapa e salva no escopo global
        window.map = L.map('div_mapa', {
          center: [-23.55052, -46.63331],
          zoom: 13
        });

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        fetch('../assets/saopaulo_zonas_poligonos.geojson')
          .then(response => response.json())
          .then(data => {
            const geojsonLayer = L.geoJSON(data, {
              style: function (feature) {
                const name = feature.properties.name;
                const color = zonas.find(z => z.name.includes(name))?.color || '#FFFFFF';
                return {
                  color: 'black',
                  weight: 2,
                  fillColor: color,
                  fillOpacity: 0.6
                };
              },
              onEachFeature: function (feature, layer) {
                var nomeExibicao = feature.properties.name;
                var ocorrenciasPorHab = zonas.find(z => z.name.includes(feature.properties.name))?.ocorr_por_hab || 0;
                switch (feature.properties.name) {
                  case 'zona_norte':
                    nomeExibicao = 'Zona Norte';
                    break;
                  case 'zona_sul':
                    nomeExibicao = 'Zona Sul';
                    break;
                  case 'zona_leste':
                    nomeExibicao = 'Zona Leste';
                    break;
                  case 'zona_oeste':
                    nomeExibicao = 'Zona Oeste';
                    break;
                  case 'centro':
                    nomeExibicao = 'Centro';
                    break;
                }

                var popupContent = "<strong>Zona:</strong> " + nomeExibicao + "<br>" +
                  "<strong>Ocorr/hab:</strong> " + ocorrenciasPorHab.toFixed(1) + "<br>";

                layer.bindPopup(popupContent);
              }
            }).addTo(map);

            const bounds = geojsonLayer.getBounds().pad(0.1);
            map.fitBounds(bounds);
            map.setMaxBounds(bounds);
            map.once('zoomend', function () {
              const currentZoom = map.getZoom();
              map.setMinZoom(currentZoom);
              map.setMaxZoom(currentZoom + 8);
            });
          })
          .catch(error => {
            console.error('Erro ao carregar GeoJSON:', error);
          });
      })
    }).catch(function (erro) {
      console.log(erro);
    });
}

function carregarKPIsMapaDeCalor(json) {
  // Carrega os KPIs do mapa de calor
  let zonaSelecionada = document.getElementById("select_zona").value;
  switch (zonaSelecionada) {
    case "norte":
      let norte_ocorr = json[0].qtd_ocorrencia_norte;
      let norte_pop = json[0].qtd_populacao_norte;
      document.getElementById("total_ocorrencias").innerHTML = norte_ocorr.toLocaleString();
      let norte_ocorr_hab = norte_ocorr / norte_pop * 100000;
      document.getElementById("kpi_ocorrencias_habitantes").innerHTML = norte_ocorr_hab.toFixed(1);
      break;
    case "sul":
      let sul_ocorr = json[0].qtd_ocorrencia_sul;
      let sul_pop = json[0].qtd_populacao_sul;
      document.getElementById("total_ocorrencias").innerHTML = sul_ocorr.toLocaleString();
      let sul_ocorr_hab = sul_ocorr / sul_pop * 100000;
      document.getElementById("kpi_ocorrencias_habitantes").innerHTML = sul_ocorr_hab.toFixed(1);
      break;
    case "leste":
      let leste_ocorr = json[0].qtd_ocorrencia_leste;
      let leste_pop = json[0].qtd_populacao_leste;
      document.getElementById("total_ocorrencias").innerHTML = leste_ocorr.toLocaleString();
      let leste_ocorr_hab = leste_ocorr / leste_pop * 100000;
      document.getElementById("kpi_ocorrencias_habitantes").innerHTML = leste_ocorr_hab.toFixed(1);
      break;
    case "oeste":
      let oeste_ocorr = json[0].qtd_ocorrencia_oeste;
      let oeste_pop = json[0].qtd_populacao_oeste;
      document.getElementById("total_ocorrencias").innerHTML = oeste_ocorr.toLocaleString();
      let oeste_ocorr_hab = oeste_ocorr / oeste_pop * 100000;
      document.getElementById("kpi_ocorrencias_habitantes").innerHTML = oeste_ocorr_hab.toFixed(1);
      break;
    case "centro":
      let centro_ocorr = json[0].qtd_ocorrencia_centro;
      let centro_pop = json[0].qtd_populacao_centro;
      document.getElementById("total_ocorrencias").innerHTML = centro_ocorr.toLocaleString();
      let centro_ocorr_hab = centro_ocorr / centro_pop * 100000;
      document.getElementById("kpi_ocorrencias_habitantes").innerHTML = centro_ocorr_hab.toFixed(1);
      break;
  }
  renderizarOcorrenciaPorTipo(zonaSelecionada);
}

// Função para redimensionar os gráficos
function handleResize() {
  const investigationChart = Chart.getChart('investigation-chart');
  const crimeChart = Chart.getChart('crime-chart');

  investigationChart.resize();
  crimeChart.resize();
}

// Redimensionar quando a janela muda de tamanho
window.addEventListener('resize', handleResize);

// Também redimensiona após um pequeno delay quando a página carrega
setTimeout(handleResize, 200);