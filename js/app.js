/* ===== The Rooted Parcel App — SPA Router & Init ===== */

// ---- Current Page State ----
window._currentPage = '/';

// ---- Detect if running from file:// ----
const _isFileProtocol = window.location.protocol === 'file:';

// ---- Navigation ----
function navigateTo(path) {
  // Parse the path and query params
  const [pathname, queryString] = path.split('?');
  const params = {};
  if (queryString) {
    new URLSearchParams(queryString).forEach((v, k) => { params[k] = v; });
  }

  window._currentPage = pathname;

  if (_isFileProtocol) {
    // Use hash-based routing for file:// protocol
    window.location.hash = '#' + path;
  } else {
    window.history.pushState({ path }, '', path);
  }

  renderPage(pathname, params);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function _parseCurrentRoute() {
  if (_isFileProtocol || window.location.hash.startsWith('#/')) {
    // Hash-based routing
    const hashPath = window.location.hash.slice(1) || '/';
    const [hp, hqs] = hashPath.split('?');
    const params = {};
    if (hqs) {
      new URLSearchParams(hqs).forEach((v, k) => { params[k] = v; });
    }
    return { pathname: hp || '/', params };
  }
  // Standard routing
  const path = window.location.pathname + window.location.search;
  const [p, qs] = path.split('?');
  const params = {};
  if (qs) {
    new URLSearchParams(qs).forEach((v, k) => { params[k] = v; });
  }
  return { pathname: p || '/', params };
}

function renderPage(pathname, params) {
  // If called without args, re-parse from window location
  if (!pathname) {
    const route = _parseCurrentRoute();
    pathname = route.pathname;
    params = route.params;
  }

  window._currentPage = pathname;
  const app = document.getElementById('app-content');
  if (!app) return;

  let pageHtml = '';

  // Route matching
  if (pathname === '/' || pathname === '/index.html') {
    pageHtml = renderHomePage();
    document.title = 'The Rooted Parcel — Sustainable Products for Conscious Living';
  } else if (pathname === '/shop') {
    pageHtml = renderShopPage(params);
    document.title = 'Shop — The Rooted Parcel';
  } else if (pathname.startsWith('/product/')) {
    const id = parseInt(pathname.split('/product/')[1]);
    _productQty = 1;
    pageHtml = renderProductPage(id);
    const product = Store.getProduct(id);
    document.title = product ? `${product.name} — The Rooted Parcel` : 'Product — The Rooted Parcel';
  } else if (pathname === '/cart') {
    pageHtml = renderCartPage();
    document.title = 'Shopping Cart — The Rooted Parcel';
  } else if (pathname === '/checkout') {
    pageHtml = renderCheckoutPage();
    document.title = 'Checkout — The Rooted Parcel';
    // Pre-fill after DOM renders
    setTimeout(() => { if (typeof prefillCheckoutForUser === 'function') prefillCheckoutForUser(); }, 100);
  } else if (pathname === '/about') {
    pageHtml = renderAboutPage();
    document.title = 'About Us — The Rooted Parcel';

  // ---- Support Pages ----
  } else if (pathname === '/contact') {
    pageHtml = renderContactPage();
    document.title = 'Contact Us — The Rooted Parcel';
  } else if (pathname === '/shipping') {
    pageHtml = renderShippingPage();
    document.title = 'Shipping Information — The Rooted Parcel';
  } else if (pathname === '/returns') {
    pageHtml = renderReturnsPage();
    document.title = 'Returns & Refunds — The Rooted Parcel';
  } else if (pathname === '/faq') {
    pageHtml = renderFAQPage();
    document.title = 'FAQ — The Rooted Parcel';

  // ---- Auth Pages ----
  } else if (pathname === '/login') {
    pageHtml = renderLoginPage();
    document.title = 'Log In — The Rooted Parcel';
  } else if (pathname === '/register') {
    pageHtml = renderRegisterPage();
    document.title = 'Create Account — The Rooted Parcel';

  // ---- User Dashboard ----
  } else if (pathname === '/dashboard') {
    pageHtml = renderUserDashboard('overview');
    document.title = 'Dashboard — The Rooted Parcel';
  } else if (pathname === '/dashboard/profile') {
    pageHtml = renderUserDashboard('profile');
    document.title = 'My Profile — The Rooted Parcel';
  } else if (pathname === '/dashboard/returns') {
    pageHtml = renderUserDashboard('returns');
    document.title = 'My Returns — The Rooted Parcel';

  // ---- Orders ----
  } else if (pathname === '/orders') {
    pageHtml = renderOrdersPage();
    document.title = 'My Orders — The Rooted Parcel';
  } else if (pathname.startsWith('/order/')) {
    const orderId = pathname.split('/order/')[1];
    pageHtml = renderOrderDetailPage(orderId);
    document.title = 'Order ' + orderId + ' — The Rooted Parcel';
  } else if (pathname.startsWith('/track/')) {
    const orderId = pathname.split('/track/')[1];
    pageHtml = renderTrackingPage(orderId);
    document.title = 'Track Order — The Rooted Parcel';

  // ---- Returns ----
  } else if (pathname.startsWith('/return-status/')) {
    const returnId = pathname.split('/return-status/')[1];
    pageHtml = renderReturnStatusPage(returnId);
    document.title = 'Return Status — The Rooted Parcel';
  } else if (pathname.startsWith('/return/')) {
    const orderId = pathname.split('/return/')[1];
    pageHtml = renderReturnRequestPage(orderId);
    document.title = 'Request Return — The Rooted Parcel';

  // ---- 404 ----
  } else {
    pageHtml = `
    <div class="page-view">
      <div class="container">
        <div class="empty-state" style="min-height: 60vh;">
          <span class="empty-state-icon">🌿</span>
          <h1 class="empty-state-title">Page Not Found</h1>
          <p class="empty-state-text">The page you're looking for doesn't exist or has been moved.</p>
          <a class="btn btn-primary btn-lg" onclick="navigateTo('/')">Back to Home</a>
        </div>
      </div>
    </div>`;
    document.title = '404 — The Rooted Parcel';
  }

  app.innerHTML = pageHtml + renderFooter();
  updateActiveNav();
  updateCartCount();
  initDynamicEffects();
}

// ---- Theme Management ----
function getPreferredTheme() {
  const saved = localStorage.getItem('ecohaven_theme');
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('ecohaven_theme', theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  setTheme(current === 'dark' ? 'light' : 'dark');
}

// ---- Dynamic Effects: Scroll-Reveal & Counters ----
let _revealObserver = null;

function initRevealObserver() {
  if (_revealObserver) _revealObserver.disconnect();
  _revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        _revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger').forEach(el => {
    _revealObserver.observe(el);
  });
}

function animateCounters() {
  document.querySelectorAll('[data-count-to]').forEach(el => {
    const target = parseInt(el.dataset.countTo);
    const suffix = el.dataset.countSuffix || '';
    const prefix = el.dataset.countPrefix || '';
    const duration = 1500;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = prefix + current.toLocaleString('en-IN') + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

function initDynamicEffects() {
  // Scroll-reveal
  setTimeout(() => initRevealObserver(), 50);

  // Animated counters
  const counterSection = document.querySelector('[data-count-to]');
  if (counterSection) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          counterObserver.disconnect();
        }
      });
    }, { threshold: 0.3 });
    counterObserver.observe(counterSection.closest('.hero-stats') || counterSection);
  }
}

// ---- App Initialization ----
function initApp() {
  // Theme
  setTheme(getPreferredTheme());

  // Seed default users
  UserDB.seed();

  // Cart
  Store.initCart();
  Store.onCartChange(() => updateCartCount());

  // Build the shell
  const app = document.getElementById('app');
  app.innerHTML = renderHeader() + renderCartDrawer() + '<main class="main-content" id="app-content"></main>';

  // Initial page render
  renderPage();

  // Init header scroll effects
  initHeader();

  // Handle browser back/forward
  window.addEventListener('popstate', () => {
    renderPage();
  });

  // Hash-based routing support for file:// protocol
  window.addEventListener('hashchange', () => {
    renderPage();
  });
}

// ---- Start App ----
document.addEventListener('DOMContentLoaded', initApp);

