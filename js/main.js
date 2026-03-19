// =============================================================
//  B2B Coffee Insights — JavaScript Principal
//  Gráficos (Chart.js) + Calculadora + Seção de Processo
// =============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Paleta de cores ─────────────────────────────────────
  const COFFEE = {
    900: '#2C1E16',
    800: '#4A3525',
    600: '#8D6E63',
    400: '#C19A6B',
    100: '#EFEBE4',
    50:  '#F9F6F0',
  };

  // ── Gráfico: Crescimento do Mercado (linha) ──────────────
  const marketCtx = document.getElementById('marketGrowthChart')?.getContext('2d');
  if (marketCtx) {
    new Chart(marketCtx, {
      type: 'line',
      data: {
        labels: ['2019', '2020', '2021', '2022', '2023', '2024 (Est)'],
        datasets: [{
          label: 'Volume de Mercado B2B (R$ Milhões)',
          data: [12, 18, 35, 58, 85, 120],
          borderColor: COFFEE[400],
          backgroundColor: 'rgba(193, 154, 107, 0.2)',
          borderWidth: 3,
          pointBackgroundColor: COFFEE[900],
          pointRadius: 5,
          fill: true,
          tension: 0.4,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: COFFEE[800], font: { family: 'Segoe UI' } },
          },
          tooltip: {
            backgroundColor: COFFEE[900],
            titleColor: COFFEE[50],
            bodyColor: COFFEE[50],
            padding: 12,
            cornerRadius: 8,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: COFFEE[100] },
            ticks: { color: COFFEE[600] },
          },
          x: {
            grid: { display: false },
            ticks: { color: COFFEE[600] },
          },
        },
      },
    });
  }

  // ── Gráfico: Motivações de Compra (donut) ────────────────
  const motivationCtx = document.getElementById('motivationChart')?.getContext('2d');
  if (motivationCtx) {
    new Chart(motivationCtx, {
      type: 'doughnut',
      data: {
        labels: [
          'Presentes de Fim de Ano',
          'Onboarding de Colaboradores',
          'Kits de Eventos/Palestras',
          'Consumo Interno VIP',
          'Fidelização de Clientes Base',
        ],
        datasets: [{
          data: [35, 20, 15, 10, 20],
          backgroundColor: [
            COFFEE[900], COFFEE[800], COFFEE[600], COFFEE[400], COFFEE[100],
          ],
          borderWidth: 2,
          borderColor: '#FFF',
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: COFFEE[800],
              font: { family: 'Segoe UI' },
              boxWidth: 15,
            },
          },
          tooltip: {
            backgroundColor: COFFEE[900],
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: (context) => {
                let label = context.label || '';
                if (label) label += ': ';
                if (context.parsed !== null) label += context.parsed + '%';
                return label;
              },
            },
          },
        },
      },
    });
  }

  // ── Seção de Processo ─────────────────────────────────────
  const processData = {
    1: {
      title: 'Seleção de Grãos Especiais (80+ pontos BSCA)',
      text: 'O processo começa com a escolha criteriosa de lotes de café de pequenos produtores. As torrefadoras parceiras buscam perfis sensoriais específicos (chocolate, frutado, floral) que combinem com a mensagem que a empresa cliente deseja transmitir. A qualidade da matéria-prima é inegociável para garantir a percepção de alto valor do brinde.',
    },
    2: {
      title: 'Curva de Torra Personalizada',
      text: 'O Mestre de Torra desenvolve um perfil de torrefação exclusivo. Se a empresa cliente busca transmitir energia e dinamismo, opta-se por uma torra mais clara, ressaltando acidez. Se o objetivo é conforto e tradição, busca-se uma torra média, evidenciando notas de chocolate e caramelo. O café se torna a expressão líquida da marca.',
    },
    3: {
      title: 'Design de Embalagem (White Label)',
      text: 'É aqui que a mágica do B2B acontece. O café é embalado em pacotes com o design, logotipo, cores e mensagem da empresa contratante. Pode incluir QR Codes direcionando para landing pages de campanhas internas ou mensagens de agradecimento aos clientes. A torrefadora fornece o produto finalizado como se fosse de fabricação própria da empresa cliente.',
    },
    4: {
      title: 'Logística e Distribuição Ponto a Ponto',
      text: 'Muitas torrefadoras modernas oferecem logística completa. Em vez de enviar uma palete para o escritório do cliente, elas realizam o envio fracionado diretamente para a casa dos funcionários (modelo home office) ou para a carteira de clientes, garantindo frescor máximo (café recém-torrado) no momento do recebimento.',
    },
  };

  window.changeProcess = function (step) {
    for (let i = 1; i <= 4; i++) {
      const btn = document.getElementById(`btn-proc-${i}`);
      if (!btn) continue;
      btn.classList.remove('active');
      btn.classList.add('bg-white', 'text-coffee-900');
      btn.style.borderColor = '';
    }

    const activeBtn = document.getElementById(`btn-proc-${step}`);
    if (activeBtn) {
      activeBtn.classList.add('active');
      activeBtn.classList.remove('bg-white', 'text-coffee-900');
    }

    const contentDiv = document.getElementById('process-content');
    if (!contentDiv) return;

    contentDiv.style.opacity = '0';
    setTimeout(() => {
      contentDiv.innerHTML = `
        <h3 class="text-2xl font-bold mb-4 text-coffee-400">${processData[step].title}</h3>
        <p class="text-lg leading-relaxed text-coffee-100">${processData[step].text}</p>
      `;
      contentDiv.style.opacity = '1';
    }, 250);
  };

  // ── Calculadora de Engajamento ───────────────────────────
  const audienceSlider  = document.getElementById('audience-slider');
  const freqSlider      = document.getElementById('freq-slider');
  const audienceVal     = document.getElementById('audience-val');
  const freqVal         = document.getElementById('freq-val');
  const calcImpactScore = document.getElementById('calc-impact-score');
  const calcPackages    = document.getElementById('calc-packages');

  function updateCalculator() {
    if (!audienceSlider || !freqSlider) return;

    const people    = parseInt(audienceSlider.value);
    const frequency = parseInt(freqSlider.value);

    if (audienceVal)  audienceVal.textContent  = `${people} pessoas`;
    if (freqVal)      freqVal.textContent       = frequency === 12 ? 'Mensal (12x)' : `${frequency}x ao ano`;

    const totalPackages = people * frequency;
    if (calcPackages) calcPackages.textContent = totalPackages.toLocaleString('pt-BR');

    let score = 50 + (frequency * 3) + (people > 500 ? 5 : 0) + (frequency >= 4 ? 10 : 0);
    if (score > 98) score = 98;
    if (calcImpactScore) calcImpactScore.textContent = `${score}%`;
  }

  audienceSlider?.addEventListener('input', updateCalculator);
  freqSlider?.addEventListener('input', updateCalculator);
  updateCalculator();

  // ── Destaque de navegação ao rolar ───────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((sec) => observer.observe(sec));

});
