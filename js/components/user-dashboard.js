/* ===== User Dashboard: Overview, Profile, Returns ===== */

// ── USER DASHBOARD ──────────────────────────────────────────
function renderUserDashboard(tab) {
  const user = UserDB.getCurrentUser();
  if (!user) { setTimeout(() => navigateTo('/login'), 0); return '<div class="page-view"></div>'; }
  if (user.role === 'admin' && !tab) { setTimeout(() => navigateTo('/admin'), 0); return '<div class="page-view"></div>'; }

  const activeTab = tab || 'overview';
  const orders = Store.getOrdersForUser(user.id);
  const returns = ReturnDB.getReturnsForUser(user.id);

  let content = '';
  if (activeTab === 'overview') content = renderDashOverview(user, orders, returns);
  else if (activeTab === 'profile') content = renderDashProfile(user);
  else if (activeTab === 'returns') content = renderDashReturns(returns);
  else content = renderDashOverview(user, orders, returns);

  return `
  <div class="page-view dashboard-page">
    <div class="container">
      <div class="dash-layout">
        <aside class="dash-sidebar">
          <div class="dash-user-card">
            <div class="dash-avatar">${user.name.charAt(0).toUpperCase()}</div>
            <div class="dash-user-info">
              <strong>${user.name}</strong>
              <span>${user.email}</span>
            </div>
          </div>
          <nav class="dash-nav">
            <a class="dash-nav-link ${activeTab === 'overview' ? 'active' : ''}" onclick="navigateTo('/dashboard')">
              <span>📊</span> Overview
            </a>
            <a class="dash-nav-link ${activeTab === 'profile' ? 'active' : ''}" onclick="navigateTo('/dashboard/profile')">
              <span>👤</span> My Profile
            </a>
            <a class="dash-nav-link" onclick="navigateTo('/orders')">
              <span>📦</span> My Orders
              ${orders.length > 0 ? `<span class="dash-nav-badge">${orders.length}</span>` : ''}
            </a>
            <a class="dash-nav-link ${activeTab === 'returns' ? 'active' : ''}" onclick="navigateTo('/dashboard/returns')">
              <span>🔄</span> My Returns
              ${returns.length > 0 ? `<span class="dash-nav-badge">${returns.length}</span>` : ''}
            </a>
            <div class="dash-nav-divider"></div>
            <a class="dash-nav-link" onclick="navigateTo('/shop')">
              <span>🛍️</span> Browse Shop
            </a>
            <a class="dash-nav-link dash-nav-logout" onclick="handleLogout()">
              <span>🚪</span> Log Out
            </a>
          </nav>
        </aside>
        <main class="dash-content">
          ${content}
        </main>
      </div>
    </div>
  </div>`;
}

// ── OVERVIEW TAB ──────────────────────────────────────────
function renderDashOverview(user, orders, returns) {
  const totalSpent = orders.reduce((s, o) => s + o.total, 0);
  const activeOrders = orders.filter(o => o.currentStatus < (o.statusHistory?.length || 6) - 1);
  const deliveredOrders = orders.filter(o => o.currentStatus >= (o.statusHistory?.length || 6) - 1);

  return `
    <h1 class="dash-page-title">Welcome back, ${user.name.split(' ')[0]}! 🌿</h1>

    <div class="dash-stats-grid">
      <div class="dash-stat-card">
        <span class="dash-stat-icon">📦</span>
        <div class="dash-stat-value">${orders.length}</div>
        <div class="dash-stat-label">Total Orders</div>
      </div>
      <div class="dash-stat-card">
        <span class="dash-stat-icon">🚚</span>
        <div class="dash-stat-value">${activeOrders.length}</div>
        <div class="dash-stat-label">In Progress</div>
      </div>
      <div class="dash-stat-card">
        <span class="dash-stat-icon">✅</span>
        <div class="dash-stat-value">${deliveredOrders.length}</div>
        <div class="dash-stat-label">Delivered</div>
      </div>
      <div class="dash-stat-card">
        <span class="dash-stat-icon">💰</span>
        <div class="dash-stat-value">${formatINR(totalSpent)}</div>
        <div class="dash-stat-label">Total Spent</div>
      </div>
    </div>

    ${orders.length > 0 ? `
    <div class="dash-section">
      <div class="dash-section-header">
        <h2>Recent Orders</h2>
        <a onclick="navigateTo('/orders')" class="dash-see-all">View All →</a>
      </div>
      <div class="dash-recent-orders">
        ${orders.slice(0, 3).map(order => {
          const status = order.statusHistory[order.currentStatus];
          const date = new Date(order.placedAt).toLocaleDateString('en-IN', {day:'numeric',month:'short'});
          return `
          <div class="dash-order-row" onclick="navigateTo('/order/${order.id}')">
            <div class="dash-order-thumbs">
              ${order.items.slice(0, 2).map(i => `<img src="images/${i.image}" alt="${i.name}">`).join('')}
            </div>
            <div class="dash-order-info">
              <span class="dash-order-id">${order.id}</span>
              <span class="dash-order-date">${date} · ${order.items.length} item${order.items.length !== 1 ? 's' : ''}</span>
            </div>
            <span class="dash-order-amount">${formatINR(order.total)}</span>
            <span class="dash-order-status">${status.icon} ${status.label}</span>
          </div>`;
        }).join('')}
      </div>
    </div>` : `
    <div class="empty-state" style="padding:var(--space-12);">
      <span class="empty-state-icon">🛍️</span>
      <h2 class="empty-state-title">No orders yet</h2>
      <p class="empty-state-text">Start exploring our eco-friendly products!</p>
      <a class="btn btn-primary" onclick="navigateTo('/shop')">Browse Shop</a>
    </div>`}

    ${returns.length > 0 ? `
    <div class="dash-section">
      <div class="dash-section-header">
        <h2>Active Returns</h2>
        <a onclick="navigateTo('/dashboard/returns')" class="dash-see-all">View All →</a>
      </div>
      <div class="dash-recent-orders">
        ${returns.filter(r => r.status !== 'refunded' && r.status !== 'rejected').slice(0, 2).map(ret => `
          <div class="dash-order-row" onclick="navigateTo('/return-status/${ret.id}')">
            <div class="dash-order-thumbs">
              ${ret.items.slice(0, 2).map(i => `<img src="images/${i.image}" alt="${i.name}">`).join('')}
            </div>
            <div class="dash-order-info">
              <span class="dash-order-id">${ret.id}</span>
              <span class="dash-order-date">Order: ${ret.orderId}</span>
            </div>
            <span class="dash-order-amount">${formatINR(ret.refundAmount)}</span>
            <span class="dash-order-status">${ret.statusHistory[ret.statusHistory.length-1]?.icon || '📋'} ${ret.statusHistory[ret.statusHistory.length-1]?.label || ret.status}</span>
          </div>
        `).join('')}
      </div>
    </div>` : ''}
  `;
}

// ── PROFILE TAB ──────────────────────────────────────────
function renderDashProfile(user) {
  return `
    <h1 class="dash-page-title">My Profile</h1>

    <div class="return-section-card">
      <h2 class="return-section-title">👤 Personal Information</h2>
      <form onsubmit="event.preventDefault(); saveUserProfile();" class="auth-form">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="prof-name">Full Name</label>
            <input type="text" class="form-input" id="prof-name" value="${user.name}" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="prof-email">Email</label>
            <input type="email" class="form-input" id="prof-email" value="${user.email}" disabled style="opacity:0.6;">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="prof-phone">Mobile Number</label>
            <input type="tel" class="form-input" id="prof-phone" value="${user.phone}" pattern="[0-9]{10}">
          </div>
          <div class="form-group">
            <label class="form-label">Account Type</label>
            <input type="text" class="form-input" value="${user.role === 'admin' ? 'Administrator' : 'Customer'}" disabled style="opacity:0.6;">
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Save Changes</button>
      </form>
    </div>

    ${user.addresses.length > 0 ? `
    <div class="return-section-card" style="margin-top:var(--space-4);">
      <h2 class="return-section-title">📍 Saved Addresses</h2>
      <div style="display:flex;flex-direction:column;gap:var(--space-3);">
        ${user.addresses.map((addr, i) => `
          <div class="dash-address-card">
            <span class="dash-address-label">${addr.label || 'Address ' + (i+1)}</span>
            <p>${addr.address}, ${addr.city}, ${addr.state} — ${addr.pin}</p>
          </div>
        `).join('')}
      </div>
    </div>` : ''}

    <div class="return-section-card" style="margin-top:var(--space-4);">
      <h2 class="return-section-title">🔒 Account Details</h2>
      <div style="font-size:var(--fs-sm);color:var(--text-secondary);">
        <div class="summary-row"><span>Account ID</span><span style="font-family:monospace;">${user.id}</span></div>
        <div class="summary-row"><span>Member Since</span><span>${new Date(user.createdAt).toLocaleDateString('en-IN', {day:'numeric',month:'long',year:'numeric'})}</span></div>
      </div>
    </div>
  `;
}

function saveUserProfile() {
  const user = UserDB.getCurrentUser();
  if (!user) return;
  const name = document.getElementById('prof-name')?.value?.trim();
  const phone = document.getElementById('prof-phone')?.value?.trim();
  if (!name) { showToast('Name is required.', 'error'); return; }
  const result = UserDB.updateUser(user.id, { name, phone });
  if (result.success) {
    showToast('Profile updated successfully! ✅', 'success');
    rebuildAppShell();
    renderPage();
  } else {
    showToast('Failed to update profile.', 'error');
  }
}

// ── RETURNS TAB ──────────────────────────────────────────
function renderDashReturns(returns) {
  if (returns.length === 0) {
    return `
      <h1 class="dash-page-title">My Returns</h1>
      <div class="empty-state" style="padding:var(--space-12);">
        <span class="empty-state-icon">🔄</span>
        <h2 class="empty-state-title">No returns yet</h2>
        <p class="empty-state-text">You can request a return from any delivered order.</p>
        <a class="btn btn-primary" onclick="navigateTo('/orders')">View Orders</a>
      </div>`;
  }

  const statusColors = {
    'requested': '#d97706', 'approved': '#16a34a', 'pickup_scheduled': '#2563eb',
    'picked_up': '#7c3aed', 'inspected': '#0891b2', 'refunded': '#16a34a', 'rejected': '#ef4444'
  };

  return `
    <h1 class="dash-page-title">My Returns</h1>
    <div class="dash-recent-orders">
      ${returns.map(ret => {
        const color = statusColors[ret.status] || '#78716c';
        const lastStatus = ret.statusHistory[ret.statusHistory.length - 1];
        return `
        <div class="dash-order-row" onclick="navigateTo('/return-status/${ret.id}')">
          <div class="dash-order-thumbs">
            ${ret.items.slice(0, 2).map(i => `<img src="images/${i.image}" alt="${i.name}">`).join('')}
          </div>
          <div class="dash-order-info">
            <span class="dash-order-id">${ret.id}</span>
            <span class="dash-order-date">Order: ${ret.orderId} · ${ret.reason}</span>
          </div>
          <span class="dash-order-amount">${formatINR(ret.refundAmount)}</span>
          <span class="order-status-badge" style="background:${color}20;color:${color};">${lastStatus?.icon || '📋'} ${lastStatus?.label || ret.status}</span>
        </div>`;
      }).join('')}
    </div>
  `;
}
