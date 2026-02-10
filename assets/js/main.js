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

  // Máscara simples de CPF — 000.000.000-00
  var cpfInput = document.getElementById('gform-cpf');
  if (cpfInput) {
    cpfInput.addEventListener('input', function () {
      var v = this.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 9) v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
      else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
      else if (v.length > 3) v = v.replace(/(\d{3})(\d{1,3})/, '$1.$2');
      this.value = v;
    });
  }

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

  // Máscara de data de nascimento — dd/mm/aaaa
  var dobInput = document.getElementById('gform-dob');
  if (dobInput) {
    dobInput.addEventListener('input', function () {
      var v = this.value.replace(/\D/g, '').slice(0, 8);
      if (v.length > 4) v = v.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3');
      else if (v.length > 2) v = v.replace(/(\d{2})(\d{1,2})/, '$1/$2');
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

    // Basic validation
    var valid = true;
    var requiredInputs = form.querySelectorAll('[required]');
    requiredInputs.forEach(function (input) {
      if (!input.value.trim()) {
        input.classList.add('gform__input--error');
        valid = false;
      }
    });
    // Checkbox validation (at least one required)
    var checkboxFieldset = document.getElementById('gform-checkboxes');
    var checkboxes = form.querySelectorAll('[name="entry.1343350674"]');
    var anyChecked = Array.prototype.some.call(checkboxes, function (cb) { return cb.checked; });
    if (!anyChecked) {
      checkboxFieldset.classList.add('gform__fieldset--error');
      valid = false;
    } else {
      checkboxFieldset.classList.remove('gform__fieldset--error');
    }

    if (!valid) {
      var firstError = form.querySelector('.gform__input--error, .gform__fieldset--error');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // reCAPTCHA validation
    if (typeof grecaptcha !== 'undefined') {
      var recaptchaResponse = grecaptcha.getResponse();
      if (!recaptchaResponse) {
        alert('Por favor, confirme que voc\u00ea n\u00e3o \u00e9 um rob\u00f4.');
        return;
      }
    }

    // Split date of birth into hidden fields (dd/mm/aaaa)
    var dobInput = document.getElementById('gform-dob');
    if (dobInput && dobInput.value) {
      var parts = dobInput.value.split('/'); // DD/MM/YYYY
      document.getElementById('dob-day').value   = parts[0];
      document.getElementById('dob-month').value = parts[1];
      document.getElementById('dob-year').value  = parts[2];
    }

    // Build FormData (exclude honeypot + date UI input)
    var formData = new FormData(form);
    formData.delete('website');

    // Remove the visible date input (not a Google Forms field)
    // It has no name attribute, so it won't be in FormData.

    // Show loading state
    var submitBtn = document.getElementById('gform-submit');
    var originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando…';
    submitBtn.classList.add('btn--loading');

    // Submit via fetch (no-cors — we won't get a response body)
    var GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdwkSeelic6cnqWV9F5713VxSaah0yCPDiJEglo-QAYr0C4kg/formResponse';

    fetch(GOOGLE_FORM_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: formData,
    })
    .then(function () {
      // no-cors always resolves — redirect to thank-you
      window.location.href = 'thank-you.html';
    })
    .catch(function () {
      // Fallback: still redirect (data was likely sent)
      window.location.href = 'thank-you.html';
    });
  });
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
});
