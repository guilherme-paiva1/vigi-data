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
  const zonas = [
    { name: 'zona_norte', color: '#00FF00', ocorr_por_hab: 9.8 }, // verde
    { name: 'zona_sul', color: '#00FF00', ocorr_por_hab: 5.3 }, // verde
    { name: 'zona_leste', color: '#FFFF00', ocorr_por_hab: 12.6 }, // amarelo
    { name: 'zona_oeste', color: '#FF0000', ocorr_por_hab: 21.7 }, // vermelho
    { name: 'centro', color: '#00FF00', ocorr_por_hab: 4.0 } // verde
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
        const color = zonas.find(z => z.name === name)?.color || '#FFFFFF'; // cor padrão se não encontrado
        return {
          color: 'black',
          weight: 2,
          fillColor: color,
          fillOpacity: 0.6
        };
      },
      onEachFeature: function (feature, layer) {
        var nomeExibicao = feature.properties.name; 
        var ocorrenciasPorHab = zonas.find(z => z.name === feature.properties.name)?.ocorr_por_hab || 0;
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