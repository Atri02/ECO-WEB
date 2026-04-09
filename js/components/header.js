/* ===== Header Component ===== */

function renderHeader() {
  const user = UserDB.getCurrentUser();

  return `
  <header class="site-header" id="site-header">
    <div class="header-inner">
      <a class="logo" onclick="navigateTo('/')" aria-label="The Rooted Parcel Home">
        <span class="logo-icon">🌿</span>
        <span class="logo-text"><span>The Rooted</span> Parcel</span>
      </a>

      <nav class="main-nav" id="main-nav" aria-label="Main navigation">
        <a class="nav-link" data-page="/" onclick="navigateTo('/')">Home</a>
        <a class="nav-link" data-page="/shop" onclick="navigateTo('/shop')">Shop</a>
        <a class="nav-link" data-page="/about" onclick="navigateTo('/about')">About</a>
        ${user ? `<a class="nav-link" data-page="/orders" onclick="navigateTo('/orders')">My Orders</a>` : ''}
      </nav>

      <div class="header-actions">
        <div class="search-wrapper header-search" id="header-search">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input type="text" class="search-input" placeholder="Search products..." id="header-search-input" onkeydown="if(event.key==='Enter') handleSearch(this.value)">
        </div>

        <button class="header-btn theme-toggle" onclick="toggleTheme()" aria-label="Toggle theme" id="theme-toggle">
          <svg class="icon-sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          <svg class="icon-moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </button>

        <button class="header-btn" onclick="toggleCartDrawer()" aria-label="Open cart" id="cart-toggle-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <span class="cart-count" id="cart-count">0</span>
        </button>

        <!-- User Menu -->
        ${user ? `
        <div class="user-menu-wrapper" id="user-menu-wrapper">
          <button class="header-btn user-avatar-btn" onclick="toggleUserMenu()" aria-label="User menu" id="user-avatar-btn">
            <span class="user-avatar-sm">${user.name.charAt(0).toUpperCase()}</span>
          </button>
          <div class="user-dropdown" id="user-dropdown">
            <div class="user-dropdown-header">
              <span class="user-dropdown-name">${user.name}</span>
              <span class="user-dropdown-email">${user.email}</span>
            </div>
            <div class="user-dropdown-divider"></div>
            ${user.role === 'admin' ? `
              <a class="user-dropdown-item" onclick="navigateTo('/admin'); closeUserMenu();">🛡️ Admin Panel</a>
              <div class="user-dropdown-divider"></div>
            ` : ''}
            <a class="user-dropdown-item" onclick="navigateTo('/dashboard'); closeUserMenu();">📊 My Dashboard</a>
            <a class="user-dropdown-item" onclick="navigateTo('/orders'); closeUserMenu();">📦 My Orders</a>
            <a class="user-dropdown-item" onclick="navigateTo('/dashboard/returns'); closeUserMenu();">🔄 My Returns</a>
            <a class="user-dropdown-item" onclick="navigateTo('/dashboard/profile'); closeUserMenu();">👤 Profile</a>
            <div class="user-dropdown-divider"></div>
            <a class="user-dropdown-item user-dropdown-logout" onclick="handleLogout()">🚪 Log Out</a>
          </div>
        </div>
        ` : `
        <button class="btn btn-sm btn-primary header-login-btn" onclick="navigateTo('/login')">Log In</button>
        `}

        <button class="mobile-menu-btn" id="mobile-menu-btn" onclick="toggleMobileMenu()" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>

    <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">
      <a class="nav-link" data-page="/" onclick="navigateTo('/'); closeMobileMenu();">Home</a>
      <a class="nav-link" data-page="/shop" onclick="navigateTo('/shop'); closeMobileMenu();">Shop</a>
      <a class="nav-link" data-page="/about" onclick="navigateTo('/about'); closeMobileMenu();">About</a>
      ${user ? `
        <a class="nav-link" data-page="/orders" onclick="navigateTo('/orders'); closeMobileMenu();">My Orders</a>
        <a class="nav-link" data-page="/dashboard" onclick="navigateTo('/dashboard'); closeMobileMenu();">Dashboard</a>
        ${user.role === 'admin' ? `<a class="nav-link" data-page="/admin" onclick="navigateTo('/admin'); closeMobileMenu();">Admin Panel</a>` : ''}
        <a class="nav-link" onclick="handleLogout(); closeMobileMenu();">Log Out</a>
      ` : `
        <a class="nav-link" data-page="/login" onclick="navigateTo('/login'); closeMobileMenu();">Log In</a>
        <a class="nav-link" data-page="/register" onclick="navigateTo('/register'); closeMobileMenu();">Register</a>
      `}
      <a class="nav-link" data-page="/cart" onclick="navigateTo('/cart'); closeMobileMenu();">Cart</a>
    </nav>
  </header>`;
}

function initHeader() {
  // Scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const header = document.getElementById('site-header');
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = window.scrollY;
  });

  // Close user dropdown on click outside
  document.addEventListener('click', (e) => {
    const wrapper = document.getElementById('user-menu-wrapper');
    if (wrapper && !wrapper.contains(e.target)) {
      closeUserMenu();
    }
  });

  updateActiveNav();
}

function updateActiveNav() {
  const links = document.querySelectorAll('.nav-link');
  const currentPage = window._currentPage || '/';
  links.forEach(link => {
    const page = link.dataset.page;
    const isActive = page === currentPage
      || (page === '/shop' && currentPage.startsWith('/product'))
      || (page === '/orders' && (currentPage.startsWith('/order/') || currentPage.startsWith('/track/')))
      || (page === '/dashboard' && currentPage.startsWith('/dashboard'))
      || (page === '/admin' && currentPage.startsWith('/admin'));
    link.classList.toggle('active', isActive);
  });
}

function toggleMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const nav = document.getElementById('mobile-nav');
  btn.classList.toggle('open');
  nav.classList.toggle('open');
  document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
}

function closeMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const nav = document.getElementById('mobile-nav');
  if (btn) btn.classList.remove('open');
  if (nav) nav.classList.remove('open');
  document.body.style.overflow = '';
}

function toggleUserMenu() {
  const dropdown = document.getElementById('user-dropdown');
  if (dropdown) dropdown.classList.toggle('open');
}

function closeUserMenu() {
  const dropdown = document.getElementById('user-dropdown');
  if (dropdown) dropdown.classList.remove('open');
}

function handleSearch(query) {
  if (query.trim()) {
    navigateTo('/shop?search=' + encodeURIComponent(query.trim()));
  }
}

function updateCartCount() {
  const el = document.getElementById('cart-count');
  if (!el) return;
  const count = Store.getCartCount();
  el.textContent = count;
  if (count > 0) {
    el.classList.add('show');
    el.classList.remove('pop');
    void el.offsetWidth;
    el.classList.add('pop');
  } else {
    el.classList.remove('show');
  }
}
