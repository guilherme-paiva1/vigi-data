document.addEventListener('DOMContentLoaded', function () {
  renderizarOcorrenciaPorTipo();
  renderizarHistoricoDeInvestigacoes();
  renderizarMapaDeCalor();
});

function renderizarOcorrenciaPorTipo() {
  // Gráfico de barras - Ocorrências por tipo
  const crimeCtx = document.getElementById('crime-chart').getContext('2d');
  new Chart(crimeCtx, {
    type: 'bar',
    data: {
      labels: ['Roubo', 'Furto', 'Tráfico'],
      datasets: [{
        label: 'Ocorrências',
        data: [150, 400, 950],
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
}

function renderizarHistoricoDeInvestigacoes() {
  // Gráfico de linha - Histórico de investigações
  const investigationCtx = document.getElementById('investigation-chart').getContext('2d');
  new Chart(investigationCtx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      datasets: [{
        label: 'Investigações abertas',
        data: [120, 190, 170, 160, 220, 240, 195, 210, 180, 230, 250, 280],
        borderColor: '#1400D8',
        // backgroundColor: 'rgba(7, 218, 0, 0.25)',
        borderWidth: 2,
        fill: false
        // tension: 0.3
      },
      {
        label: 'Investigações esclarecidas',
        data: [100, 120, 170, 150, 215, 220, 145, 210, 180, 220, 200, 280],
        borderColor: '#15CDB8',
        // backgroundColor: 'rgba(23, 82, 0, 0.25)',
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
          beginAtZero: false,
          min: 100,
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
}

function renderizarMapaDeCalor() {
  let rubrica = document.getElementById("select_rubrica").value;
  let dataDe = document.getElementById("date_periodo_de").value;
  let dataAte = document.getElementById("date_periodo_ate").value;
  let zona = document.getElementById("select_zona").value;
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
        console.log(json);
        const amarelo = '#FFFF00';
        const vermelho = '#FF0000';
        const verde = '#00FF00';

        let sul_ocorr_hab = json[0].qtd_ocorrencia_sul / json[0].qtd_populacao_sul * 100000;
        let norte_ocorr_hab = json[0].qtd_ocorrencia_norte / json[0].qtd_populacao_norte * 100000;
        let leste_ocorr_hab = json[0].qtd_ocorrencia_leste / json[0].qtd_populacao_leste * 100000;
        let oeste_ocorr_hab = json[0].qtd_ocorrencia_oeste / json[0].qtd_populacao_oeste * 100000;
        let centro_ocorr_hab = json[0].qtd_ocorrencia_centro / json[0].qtd_populacao_centro * 100000;

        console.log(sul_ocorr_hab);
        console.log(norte_ocorr_hab);
        console.log(leste_ocorr_hab);
        console.log(oeste_ocorr_hab);
        console.log(centro_ocorr_hab);

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
        zonas = [
          { name: 'zona_norte', color: norte_color, ocorr_por_hab: norte_ocorr_hab },
          { name: 'zona_sul', color: sul_color, ocorr_por_hab: sul_ocorr_hab },
          { name: 'zona_leste', color: leste_color, ocorr_por_hab: leste_ocorr_hab },
          { name: 'zona_oeste', color: oeste_color, ocorr_por_hab: oeste_ocorr_hab },
          { name: 'centro', color: centro_color, ocorr_por_hab: centro_ocorr_hab }
        ];

        // Mapa de calor - Ocorrências por zona
        var map = L.map('div_mapa', {
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