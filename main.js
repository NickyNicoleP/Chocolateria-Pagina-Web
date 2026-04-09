/* ─────────────────────────────────────────
   CACAO & ALMA — Chocolatería Artesanal
   main.js
───────────────────────────────────────── */

/* ══════════════════════════════
   CARRITO DE COMPRAS
══════════════════════════════ */

let cartCount = 0;

/**
 * Añade un producto al carrito y actualiza el contador del navbar.
 * @param {string} name  - Nombre del producto
 * @param {number} price - Precio del producto
 */
function addToCart(name, price) {
  cartCount++;
  const badge = document.getElementById('cartCount');
  if (badge) badge.textContent = cartCount;

  showToast(`"${name}" añadido al carrito ✓`);
}

/**
 * Abre (simula) el carrito y muestra resumen en toast.
 */
function openCart() {
  if (cartCount === 0) {
    showToast('Tu carrito está vacío');
  } else {
    showToast(`Tu carrito tiene ${cartCount} artículo${cartCount > 1 ? 's' : ''}`);
  }
}


/* ══════════════════════════════
   NEWSLETTER
══════════════════════════════ */

/**
 * Valida el correo y muestra confirmación de suscripción.
 */
function subscribe() {
  const input = document.getElementById('emailInput');
  if (!input) return;

  const email = input.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    showToast('Por favor ingresa un correo válido');
    return;
  }

  input.value = '';
  showToast('¡Bienvenida a la familia Cacao & Alma! 🍫');
}

/* Permite suscribirse presionando Enter en el input del newsletter */
document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById('emailInput');
  if (emailInput) {
    emailInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') subscribe();
    });
  }
});


/* ══════════════════════════════
   TOAST NOTIFICATION
══════════════════════════════ */

let toastTimeout = null;

/**
 * Muestra un mensaje toast temporal en la parte inferior de la pantalla.
 * @param {string} message - Texto a mostrar
 * @param {number} duration - Duración en ms (por defecto 3000)
 */
function showToast(message, duration = 3000) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  // Si ya hay un toast activo, reiniciamos el timer
  if (toastTimeout) {
    clearTimeout(toastTimeout);
    toast.classList.remove('show');
    // Pequeña pausa para permitir el re-render de la transición
    setTimeout(() => triggerToast(toast, message, duration), 80);
  } else {
    triggerToast(toast, message, duration);
  }
}

function triggerToast(toast, message, duration) {
  toast.textContent = message;
  toast.classList.add('show');
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
    toastTimeout = null;
  }, duration);
}


/* ══════════════════════════════
   ANIMACIONES DE SCROLL (fade-up)
══════════════════════════════ */

/**
 * Observa todos los elementos con clase `.fade-up` y les añade
 * la clase `.visible` cuando entran al viewport, activando
 * la transición CSS de aparición suave.
 */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-up');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Dejamos de observar el elemento una vez que ya es visible
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((el) => observer.observe(el));
}


/* ══════════════════════════════
   NAVBAR — efecto al hacer scroll
══════════════════════════════ */

/**
 * Oscurece levemente el navbar cuando el usuario hace scroll hacia abajo.
 */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.style.background = 'rgba(250, 246, 240, 0.95)';
    } else {
      navbar.style.background = 'rgba(250, 246, 240, 0.72)';
    }
  }, { passive: true });
}


/* ══════════════════════════════
   SMOOTH SCROLL para links del nav
══════════════════════════════ */

/**
 * Intercepta los clicks en los enlaces del navbar para hacer
 * scroll suave hacia la sección correspondiente.
 */
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}


/* ══════════════════════════════
   INICIALIZACIÓN
══════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initNavbarScroll();
  initSmoothScroll();
});
