// =============================================================
//  CAFÉCORP Landing Page — JavaScript
//  Converte toda a lógica React → vanilla JS
// =============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Inicializa ícones Lucide ─────────────────────────────
  if (window.lucide) {
    lucide.createIcons();
  }

  // ── Navbar: efeito ao rolar ──────────────────────────────
  const nav = document.getElementById('main-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }
    });
  }

  // ── Calculadora Interativa ───────────────────────────────
  const slider     = document.getElementById('calc-people-slider');
  const peopleVal  = document.getElementById('calc-people-val');
  const cupsEl     = document.getElementById('calc-cups');
  const kgEl       = document.getElementById('calc-kg');

  function updateCalc() {
    if (!slider) return;
    const people = parseInt(slider.value);

    if (peopleVal) peopleVal.textContent = `${people} pessoas`;
    if (cupsEl)    cupsEl.textContent    = (people * 20).toLocaleString('pt-BR');
    if (kgEl)      kgEl.textContent      = `${Math.floor(people * 2.5)}kg`;
  }

  if (slider) {
    slider.addEventListener('input', updateCalc);
    updateCalc();
  }

  // ── Botões de Volume ─────────────────────────────────────
  let selectedVolume = 'pequeno';
  const volButtons = document.querySelectorAll('.vol-btn');

  volButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      selectedVolume = btn.dataset.volume;

      // Reset todos
      volButtons.forEach(b => {
        b.classList.remove('bg-brand-950', 'text-white', 'border-brand-950');
        b.classList.add('bg-white', 'border-brand-100', 'text-brand-500');
      });

      // Ativa o clicado
      btn.classList.remove('bg-white', 'border-brand-100', 'text-brand-500');
      btn.classList.add('bg-brand-950', 'text-white', 'border-brand-950');
    });
  });

  // ── Formulário de Lead ───────────────────────────────────
  const form       = document.getElementById('lead-form');
  const formSuccess = document.getElementById('form-success');
  const btnVoltar  = document.getElementById('btn-voltar');
  const successMsg = document.getElementById('success-message');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const data = new FormData(form);
      const nome = data.get('nome') || '';

      // Log para debug (em produção, enviar para backend/Firebase)
      console.log('Dados captados:', {
        nome: data.get('nome'),
        empresa: data.get('empresa'),
        email: data.get('email'),
        volume: selectedVolume,
      });

      // Mostra sucesso
      form.classList.add('hidden');
      if (formSuccess) {
        formSuccess.classList.remove('hidden');
        formSuccess.classList.add('flex');
      }

      if (successMsg) {
        successMsg.textContent = `Obrigado, ${nome}. Nossa equipe de baristas e torrefadores vai analisar seu pedido e retornar em menos de 2 horas úteis.`;
      }

      // Re-inicializa ícones (os do bloco success)
      if (window.lucide) lucide.createIcons();
    });
  }

  if (btnVoltar) {
    btnVoltar.addEventListener('click', () => {
      if (formSuccess) {
        formSuccess.classList.add('hidden');
        formSuccess.classList.remove('flex');
      }
      if (form) {
        form.classList.remove('hidden');
        form.reset();
      }

      // Reset volume para "pequeno"
      volButtons.forEach(b => {
        b.classList.remove('bg-brand-950', 'text-white', 'border-brand-950');
        b.classList.add('bg-white', 'border-brand-100', 'text-brand-500');
      });
      if (volButtons[0]) {
        volButtons[0].classList.remove('bg-white', 'border-brand-100', 'text-brand-500');
        volButtons[0].classList.add('bg-brand-950', 'text-white', 'border-brand-950');
      }
      selectedVolume = 'pequeno';
    });
  }

  // ── Smooth scroll para links internos ────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
