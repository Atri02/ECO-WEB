/* ===== Admin Sub-Application Router ===== */

// ---- Current Page State ----
window._currentPage = '/admin';

// ---- Detect if running from file:// ----
const _isFileProtocol = window.location.protocol === 'file:';

// ---- Navigation ----
function navigateTo(path) {
  window._currentPage = path;

  if (_isFileProtocol) {
    window.location.hash = '#' + path;
  } else {
    window.history.pushState({ path }, '', path);
  }

  renderPage(path);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function _parseCurrentRoute() {
  if (_isFileProtocol || window.location.hash.startsWith('#/')) {
    const hashPath = window.location.hash.slice(1) || '/admin';
    return { pathname: hashPath };
  }
  const path = window.location.pathname;
  return { pathname: path.replace('/admin.html', '/admin') || '/admin' };
}

function renderPage(pathname) {
  if (!pathname) {
    const route = _parseCurrentRoute();
    pathname = route.pathname;
  }

  window._currentPage = pathname;
  const app = document.getElementById('app-content');
  if (!app) return;

  let pageHtml = '';

  // ---- Admin Dashboard Routes ----
  if (pathname === '/admin' || pathname === '/') {
    pageHtml = renderAdminDashboard('overview');
    document.title = 'Admin Dashboard — The Rooted Parcel';
  } else if (pathname === '/admin/orders') {
    pageHtml = renderAdminDashboard('orders');
    document.title = 'Manage Orders — The Rooted Parcel';
  } else if (pathname === '/admin/users') {
    pageHtml = renderAdminDashboard('users');
    document.title = 'Manage Users — The Rooted Parcel';
  } else if (pathname === '/admin/returns') {
    pageHtml = renderAdminDashboard('returns');
    document.title = 'Manage Returns — The Rooted Parcel';
  
  // ---- Admin Order View (Redirect or Render) ----
  } else if (pathname.startsWith('/order/')) {
    // Basic fallback for when admin clicks order ID
    // Re-use store function but we don't have order detail renderer here?
    // Wait, order detail renderer is in orders.js!
    // For admin, we should just alert or render a placeholder, or we can load orders.js in admin.html.
    alert('Order detail view is limited in admin right now. View orders in the table.');
    navigateTo('/admin/orders');
    return;
  } else if (pathname === '/shop' || pathname === '/login') {
    // Redirect cross-app links to the main app
    window.location.href = 'index.html#' + pathname;
    return;
  } else {
    pageHtml = `
    <div class="page-view">
      <div class="container">
        <h1 class="dash-page-title" style="text-align:center; margin-top:20vh;">Page Not Found</h1>
        <p style="text-align:center;"><a onclick="navigateTo('/admin')" class="btn btn-primary">Back to Dashboard</a></p>
      </div>
    </div>`;
  }

  app.innerHTML = pageHtml;
  
  // Update nav highlights dynamically
  const links = document.querySelectorAll('.dash-nav-link');
  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('onclick') === `navigateTo('${pathname}')`) {
      link.classList.add('active');
    }
  });
}

function handleLogout() {
  UserDB.logout();
  window.location.href = 'index.html'; // Go back to front storefront
}

function formatINR(amount) {
  return '₹' + Number(amount).toLocaleString('en-IN');
}

// Ensure user is an admin before initializing
function initAdminApp() {
  Store.initCart(); // Just in case it's needed for dependencies
  
  if (!UserDB.isAdmin()) {
    // Not admin, redirect to storefront login
    window.location.href = 'index.html#/login';
    return;
  }

  // Handle browser back/forward
  window.addEventListener('popstate', () => renderPage());
  window.addEventListener('hashchange', () => renderPage());

  // Render initial route
  renderPage();
}

document.addEventListener('DOMContentLoaded', initAdminApp);
