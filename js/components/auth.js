/* ===== Authentication Pages: Login & Register ===== */

// ── LOGIN PAGE ──────────────────────────────────────────
function renderLoginPage() {
  // If already logged in, redirect
  if (UserDB.isLoggedIn()) {
    setTimeout(() => navigateTo(UserDB.isAdmin() ? '/admin' : '/dashboard'), 0);
    return '<div class="page-view"></div>';
  }

  return `
  <div class="page-view auth-page">
    <div class="auth-container">
      <div class="auth-card animate-scale-in">
        <div class="auth-header">
          <span class="auth-logo" onclick="navigateTo('/')">🌿</span>
          <h1 class="auth-title">Welcome Back</h1>
          <p class="auth-subtitle">Log in to your The Rooted Parcel account</p>
        </div>

        <form class="auth-form" onsubmit="event.preventDefault(); handleLogin();" id="login-form">
          <div class="form-group">
            <label class="form-label" for="login-email">Email Address</label>
            <input type="email" class="form-input" id="login-email" placeholder="you@example.com" required autocomplete="email">
          </div>
          <div class="form-group">
            <label class="form-label" for="login-password">Password</label>
            <div class="password-wrapper">
              <input type="password" class="form-input" id="login-password" placeholder="Enter your password" required autocomplete="current-password">
              <button type="button" class="password-toggle" onclick="togglePasswordVisibility('login-password', this)" aria-label="Show password">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
            </div>
          </div>
          <div id="login-error" class="auth-error" style="display:none;"></div>
          <button type="submit" class="btn btn-primary btn-lg auth-submit-btn" id="login-submit">
            Log In →
          </button>
        </form>

        <div class="auth-divider"><span>or</span></div>

        <div class="auth-footer">
          <p>Don't have an account? <a onclick="navigateTo('/register')" class="auth-link">Create one</a></p>
        </div>
      </div>
    </div>
  </div>`;
}

// ── REGISTER PAGE ──────────────────────────────────────────
function renderRegisterPage() {
  if (UserDB.isLoggedIn()) {
    setTimeout(() => navigateTo('/dashboard'), 0);
    return '<div class="page-view"></div>';
  }

  return `
  <div class="page-view auth-page">
    <div class="auth-container">
      <div class="auth-card animate-scale-in">
        <div class="auth-header">
          <span class="auth-logo" onclick="navigateTo('/')">🌿</span>
          <h1 class="auth-title">Join The Rooted Parcel</h1>
          <p class="auth-subtitle">Create your account and start shopping sustainably</p>
        </div>

        <form class="auth-form" onsubmit="event.preventDefault(); handleRegister();" id="register-form">
          <div class="form-group">
            <label class="form-label" for="reg-name">Full Name</label>
            <input type="text" class="form-input" id="reg-name" placeholder="Rahul Sharma" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="reg-email">Email Address</label>
            <input type="email" class="form-input" id="reg-email" placeholder="rahul@example.com" required autocomplete="email">
          </div>
          <div class="form-group">
            <label class="form-label" for="reg-phone">Mobile Number</label>
            <input type="tel" class="form-input" id="reg-phone" placeholder="9876543210" pattern="[0-9]{10}" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="reg-password">Password</label>
            <div class="password-wrapper">
              <input type="password" class="form-input" id="reg-password" placeholder="Min 6 characters" required minlength="6" autocomplete="new-password">
              <button type="button" class="password-toggle" onclick="togglePasswordVisibility('reg-password', this)" aria-label="Show password">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label" for="reg-confirm">Confirm Password</label>
            <div class="password-wrapper">
              <input type="password" class="form-input" id="reg-confirm" placeholder="Re-enter password" required minlength="6" autocomplete="new-password">
              <button type="button" class="password-toggle" onclick="togglePasswordVisibility('reg-confirm', this)" aria-label="Show password">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
            </div>
          </div>
          <div id="register-error" class="auth-error" style="display:none;"></div>
          <button type="submit" class="btn btn-primary btn-lg auth-submit-btn">
            Create Account →
          </button>
        </form>

        <div class="auth-divider"><span>or</span></div>

        <div class="auth-footer">
          <p>Already have an account? <a onclick="navigateTo('/login')" class="auth-link">Log in</a></p>
        </div>
      </div>
    </div>
  </div>`;
}


// ── AUTH HANDLERS ──────────────────────────────────────────

function handleLogin() {
  const email = document.getElementById('login-email')?.value?.trim();
  const password = document.getElementById('login-password')?.value;
  const errorEl = document.getElementById('login-error');

  if (!email || !password) {
    showAuthError(errorEl, 'Please fill in all fields.');
    return;
  }

  const result = UserDB.login(email, password);
  if (result.success) {
    showToast(`Welcome back, ${result.user.name}! 🌿`, 'success');
    // Rebuild header to show user menu
    rebuildAppShell();
    navigateTo(result.user.role === 'admin' ? '/admin' : '/dashboard');
  } else {
    showAuthError(errorEl, result.error);
  }
}

function handleRegister() {
  const name = document.getElementById('reg-name')?.value?.trim();
  const email = document.getElementById('reg-email')?.value?.trim();
  const phone = document.getElementById('reg-phone')?.value?.trim();
  const password = document.getElementById('reg-password')?.value;
  const confirm = document.getElementById('reg-confirm')?.value;
  const errorEl = document.getElementById('register-error');

  if (!name || !email || !phone || !password || !confirm) {
    showAuthError(errorEl, 'Please fill in all fields.');
    return;
  }

  if (!/^[0-9]{10}$/.test(phone)) {
    showAuthError(errorEl, 'Please enter a valid 10-digit mobile number.');
    return;
  }

  if (password.length < 6) {
    showAuthError(errorEl, 'Password must be at least 6 characters.');
    return;
  }

  if (password !== confirm) {
    showAuthError(errorEl, 'Passwords do not match.');
    return;
  }

  const result = UserDB.register(name, email, phone, password);
  if (result.success) {
    // Auto-login after registration
    UserDB.login(email, password);
    showToast(`Welcome to The Rooted Parcel, ${name}! 🎉`, 'success');
    rebuildAppShell();
    navigateTo('/dashboard');
  } else {
    showAuthError(errorEl, result.error);
  }
}

function handleLogout() {
  UserDB.logout();
  showToast('You have been logged out. See you soon! 👋', 'success');
  rebuildAppShell();
  navigateTo('/');
}

function showAuthError(el, message) {
  if (!el) return;
  el.textContent = message;
  el.style.display = 'block';
  el.classList.add('shake');
  setTimeout(() => el.classList.remove('shake'), 500);
}

function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const isPassword = input.type === 'password';
  input.type = isPassword ? 'text' : 'password';
  btn.innerHTML = isPassword
    ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>'
    : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
}



// Helper to rebuild app shell (header) after login/logout
function rebuildAppShell() {
  const app = document.getElementById('app');
  if (app) {
    app.innerHTML = renderHeader() + renderCartDrawer() + '<main class="main-content" id="app-content"></main>';
    initHeader();
    updateCartCount();
  }
}
