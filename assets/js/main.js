/* ============================================
   CONFIGURAÇÕES CENTRALIZADAS
   Edite as constantes abaixo conforme necessário.
   ============================================ */

const CONFIG = {
  WHATSAPP_NUMBER: '',                                        // Número com DDI+DDD (sem +, espaços ou traços)
  WHATSAPP_TEXT: 'Olá! Gostaria de saber mais sobre a ação coletiva Justiça para Santa Cruz.',
  INSTAGRAM_URL: 'https://www.instagram.com/justicaparasantacruz', // Perfil do Instagram
  CONTACT_EMAIL: 'contato@justicaparasantacruz.com.br',       // E-mail de contato
  SITE_NAME: 'Justiça para Santa Cruz',
};

/* ============================================
   UTILITÁRIOS
   ============================================ */

/**
 * Gera a URL completa do WhatsApp com texto pré-definido.
 */
function getWhatsAppURL() {
  const text = encodeURIComponent(CONFIG.WHATSAPP_TEXT);
  return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${text}`;
}

/**
 * Aplica os links dinâmicos a todos os elementos com data-attributes.
 */
function applyDynamicLinks() {
  // WhatsApp links
  document.querySelectorAll('[data-link="whatsapp"]').forEach(function (el) {
    el.href = getWhatsAppURL();
  });

  // Instagram links
  document.querySelectorAll('[data-link="instagram"]').forEach(function (el) {
    el.href = CONFIG.INSTAGRAM_URL;
  });

  // Email links
  document.querySelectorAll('[data-link="email"]').forEach(function (el) {
    el.href = 'mailto:' + CONFIG.CONTACT_EMAIL;
    if (el.classList.contains('email-text')) {
      el.textContent = CONFIG.CONTACT_EMAIL;
    }
  });
}

/* ============================================
   NAVEGAÇÃO MOBILE
   ============================================ */

function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', function () {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('nav__list--open');
    toggle.classList.toggle('nav__toggle--active');
  });

  // Fecha menu ao clicar num link
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      menu.classList.remove('nav__list--open');
      toggle.classList.remove('nav__toggle--active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ============================================
   HEADER SCROLL (adiciona sombra ao rolar)
   ============================================ */

function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 10) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ============================================
   SMOOTH SCROLL para âncoras internas
   ============================================ */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;

      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
}

/* ============================================
   BOTÃO FLUTUANTE WHATSAPP
   ============================================ */

function initFloatingWhatsApp() {
  const btn = document.getElementById('whatsapp-float');
  if (!btn) return;

  btn.href = getWhatsAppURL();

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      btn.classList.add('fab--visible');
    } else {
      btn.classList.remove('fab--visible');
    }
  }, { passive: true });
}

/* ============================================
   ANO ATUAL NO FOOTER
   ============================================ */

function setCurrentYear() {
  const el = document.getElementById('current-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ============================================
   FORMULÁRIO GOOGLE FORMS
   ============================================ */

function initGoogleForm() {
  var form = document.getElementById('gform');
  if (!form) return;

  // Máscara simples de telefone — (00) 00000-0000
  var telInput = document.getElementById('gform-tel');
  if (telInput) {
    telInput.addEventListener('input', function () {
      var v = this.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 6) v = v.replace(/(\d{2})(\d{5})(\d{1,4})/, '($1) $2-$3');
      else if (v.length > 2) v = v.replace(/(\d{2})(\d{1,5})/, '($1) $2');
      this.value = v;
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Honeypot check
    var honeypot = form.querySelector('[name="website"]');
    if (honeypot && honeypot.value) return;

    // Clear previous errors
    form.querySelectorAll('.gform__input--error').forEach(function (el) {
      el.classList.remove('gform__input--error');
    });

    // Basic validation (only nome + tel are required)
    var valid = true;
    var requiredInputs = form.querySelectorAll('[required]');
    requiredInputs.forEach(function (input) {
      if (!input.value.trim()) {
        input.classList.add('gform__input--error');
        valid = false;
      }
    });

    if (!valid) {
      var firstError = form.querySelector('.gform__input--error');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // reCAPTCHA validation
    if (typeof grecaptcha !== 'undefined') {
      var recaptchaResponse = grecaptcha.getResponse();
      if (!recaptchaResponse) {
        alert('Por favor, confirme que você não é um robô.');
        return;
      }
    }

    // Build FormData (exclude honeypot)
    var formData = new FormData(form);
    formData.delete('website');

    // Show loading state
    var submitBtn = document.getElementById('gform-submit');
    submitBtn.textContent = 'Enviando…';
    submitBtn.classList.add('btn--loading');

    // Submit via fetch (no-cors)
    var GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdwkSeelic6cnqWV9F5713VxSaah0yCPDiJEglo-QAYr0C4kg/formResponse';

    fetch(GOOGLE_FORM_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: formData,
    })
    .then(function () {
      window.location.href = 'thank-you.html';
    })
    .catch(function () {
      window.location.href = 'thank-you.html';
    });
  });
}

/* ============================================
   SOCIAL PROOF — Animação do contador
   ============================================ */

function initSocialProofCounter() {
  var numberEl = document.querySelector('.social-proof__number');
  var progressEl = document.querySelector('.social-proof__progress');
  if (!numberEl) return;

  var target = parseInt(numberEl.getAttribute('data-target'), 10) || 0;
  var progress = progressEl ? parseInt(progressEl.getAttribute('data-progress'), 10) || 0 : 0;
  var animated = false;

  function animateCounter() {
    if (animated) return;
    animated = true;

    var duration = 2000;
    var start = performance.now();

    function tick(now) {
      var elapsed = now - start;
      var ratio = Math.min(elapsed / duration, 1);
      // ease-out
      var eased = 1 - Math.pow(1 - ratio, 3);
      var current = Math.round(eased * target);
      numberEl.textContent = current.toLocaleString('pt-BR');

      if (ratio < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);

    // Animate progress bar
    if (progressEl) {
      setTimeout(function () {
        progressEl.style.width = progress + '%';
      }, 100);
    }
  }

  // Use IntersectionObserver to trigger on scroll
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter();
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });
    observer.observe(numberEl);
  } else {
    animateCounter();
  }
}

/* ============================================
   FLOATING CTA BAR (MOBILE)
   ============================================ */

function initFloatingCTA() {
  var bar = document.getElementById('floating-cta');
  if (!bar) return;

  var contactSection = document.getElementById('contato');

  function checkVisibility() {
    var scrollY = window.scrollY || window.pageYOffset;

    // Show after scrolling past hero
    if (scrollY < 400) {
      bar.classList.remove('floating-cta--visible');
      return;
    }

    // Hide when form section is in view
    if (contactSection) {
      var rect = contactSection.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        bar.classList.remove('floating-cta--visible');
        return;
      }
    }

    bar.classList.add('floating-cta--visible');
  }

  window.addEventListener('scroll', checkVisibility, { passive: true });
  checkVisibility();
}

/* ============================================
   INICIALIZAÇÃO
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
  applyDynamicLinks();
  initMobileNav();
  initHeaderScroll();
  initSmoothScroll();
  initFloatingWhatsApp();
  setCurrentYear();
  initGoogleForm();
  initSocialProofCounter();
  initFloatingCTA();
});
