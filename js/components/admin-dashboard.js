/* ===== Admin Dashboard: Stats, Orders, Users, Returns ===== */

function _requireAdmin() {
  if (!UserDB.isAdmin()) {
    setTimeout(() => navigateTo('/login'), 0);
    return false;
  }
  return true;
}

// ── ADMIN DASHBOARD ──────────────────────────────────────────
function renderAdminDashboard(tab) {
  if (!_requireAdmin()) return '<div class="page-view"></div>';

  const user = UserDB.getCurrentUser();
  const activeTab = tab || 'overview';

  let content = '';
  if (activeTab === 'overview') content = renderAdminOverview();
  else if (activeTab === 'orders') content = renderAdminOrders();
  else if (activeTab === 'users') content = renderAdminUsers();
  else if (activeTab === 'returns') content = renderAdminReturns();
  else content = renderAdminOverview();

  return `
  <div class="page-view dashboard-page admin-dashboard">
    <div class="container">
      <div class="dash-layout">
        <aside class="dash-sidebar admin-sidebar">
          <div class="dash-user-card admin-user-card">
            <div class="dash-avatar admin-avatar">🛡️</div>
            <div class="dash-user-info">
              <strong>${user.name}</strong>
              <span class="admin-role-badge">Administrator</span>
            </div>
          </div>
          <nav class="dash-nav">
            <a class="dash-nav-link ${activeTab === 'overview' ? 'active' : ''}" onclick="navigateTo('/admin')">
              <span>📊</span> Dashboard
            </a>
            <a class="dash-nav-link ${activeTab === 'orders' ? 'active' : ''}" onclick="navigateTo('/admin/orders')">
              <span>📦</span> All Orders
              <span class="dash-nav-badge">${Store.getAllOrders().length}</span>
            </a>
            <a class="dash-nav-link ${activeTab === 'users' ? 'active' : ''}" onclick="navigateTo('/admin/users')">
              <span>👥</span> Users
              <span class="dash-nav-badge">${UserDB.getUserCount()}</span>
            </a>
            <a class="dash-nav-link ${activeTab === 'returns' ? 'active' : ''}" onclick="navigateTo('/admin/returns')">
              <span>🔄</span> Returns
              ${ReturnDB.getPendingCount() > 0 ? `<span class="dash-nav-badge" style="background:var(--color-error);">${ReturnDB.getPendingCount()}</span>` : `<span class="dash-nav-badge">${ReturnDB.getReturnCount()}</span>`}
            </a>
            <div class="dash-nav-divider"></div>
            <a class="dash-nav-link" onclick="navigateTo('/shop')">
              <span>🛍️</span> View Store
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

// ── ADMIN OVERVIEW ──────────────────────────────────────────
function renderAdminOverview() {
  const orders = Store.getAllOrders();
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const returns = ReturnDB.getAllReturns();
  const pendingReturns = returns.filter(r => r.status === 'requested');
  const users = UserDB.getAllUsers().filter(u => u.role === 'user');
  const deliveredOrders = orders.filter(o => o.currentStatus >= (o.statusHistory?.length || 6) - 1);
  const activeOrders = orders.filter(o => o.currentStatus < (o.statusHistory?.length || 6) - 1);

  return `
    <h1 class="dash-page-title">Admin Dashboard 🛡️</h1>

    <div class="dash-stats-grid admin-stats">
      <div class="dash-stat-card admin-stat-revenue">
        <span class="dash-stat-icon">💰</span>
        <div class="dash-stat-value">${formatINR(totalRevenue)}</div>
        <div class="dash-stat-label">Total Revenue</div>
      </div>
      <div class="dash-stat-card">
        <span class="dash-stat-icon">📦</span>
        <div class="dash-stat-value">${orders.length}</div>
        <div class="dash-stat-label">Total Orders</div>
      </div>
      <div class="dash-stat-card">
        <span class="dash-stat-icon">👥</span>
        <div class="dash-stat-value">${users.length}</div>
        <div class="dash-stat-label">Customers</div>
      </div>
      <div class="dash-stat-card">
        <span class="dash-stat-icon">🔄</span>
        <div class="dash-stat-value">${returns.length}</div>
        <div class="dash-stat-label">Returns</div>
      </div>
    </div>

    <div class="admin-overview-grid">
      <div class="dash-section">
        <div class="dash-section-header">
          <h2>📦 Recent Orders</h2>
          <a onclick="navigateTo('/admin/orders')" class="dash-see-all">View All →</a>
        </div>
        ${orders.length > 0 ? `
        <div class="dash-recent-orders">
          ${orders.slice(0, 5).map(order => {
            const status = order.statusHistory[order.currentStatus];
            const date = new Date(order.placedAt).toLocaleDateString('en-IN', {day:'numeric',month:'short'});
            const user = order.userId ? UserDB.getUser(order.userId) : null;
            return `
            <div class="dash-order-row" onclick="navigateTo('/order/${order.id}')">
              <div class="dash-order-info" style="flex:2;">
                <span class="dash-order-id">${order.id}</span>
                <span class="dash-order-date">${date} · ${user ? user.name : 'Guest'} · ${order.items.length} items</span>
              </div>
              <span class="dash-order-amount">${formatINR(order.total)}</span>
              <span class="dash-order-status">${status.icon} ${status.label}</span>
            </div>`;
          }).join('')}
        </div>` : '<p style="color:var(--text-tertiary);font-size:var(--fs-sm);">No orders yet.</p>'}
      </div>

      ${pendingReturns.length > 0 ? `
      <div class="dash-section">
        <div class="dash-section-header">
          <h2>⚠️ Pending Returns</h2>
          <a onclick="navigateTo('/admin/returns')" class="dash-see-all">Review All →</a>
        </div>
        <div class="dash-recent-orders">
          ${pendingReturns.slice(0, 3).map(ret => `
            <div class="dash-order-row" onclick="navigateTo('/admin/returns')">
              <div class="dash-order-info">
                <span class="dash-order-id">${ret.id}</span>
                <span class="dash-order-date">Order: ${ret.orderId} · ${ret.reason}</span>
              </div>
              <span class="dash-order-amount">${formatINR(ret.refundAmount)}</span>
              <span class="order-status-badge" style="background:#d9770620;color:#d97706;">📋 Awaiting Review</span>
            </div>
          `).join('')}
        </div>
      </div>` : ''}
    </div>

    <div class="admin-quick-stats">
      <div class="admin-mini-stat"><span>🚚</span> <strong>${activeOrders.length}</strong> orders in transit</div>
      <div class="admin-mini-stat"><span>✅</span> <strong>${deliveredOrders.length}</strong> delivered</div>
      <div class="admin-mini-stat"><span>⚠️</span> <strong>${pendingReturns.length}</strong> returns pending</div>
      <div class="admin-mini-stat"><span>🌿</span> <strong>${Store.products.length}</strong> products listed</div>
    </div>
  `;
}

// ── ADMIN ORDERS ──────────────────────────────────────────
function renderAdminOrders() {
  const orders = Store.getAllOrders();
  const statusColors = ['#78716c','#16a34a','#2563eb','#d97706','#7c3aed','#16a34a'];

  return `
    <div class="dash-section-header" style="margin-bottom:var(--space-6);">
      <h1 class="dash-page-title" style="margin-bottom:0;">All Orders</h1>
      <span class="shop-count">${orders.length} order${orders.length !== 1 ? 's' : ''}</span>
    </div>

    ${orders.length > 0 ? `
    <div class="admin-table-wrapper">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${orders.map(order => {
            const status = order.statusHistory[order.currentStatus];
            const color = statusColors[order.currentStatus] || '#78716c';
            const date = new Date(order.placedAt).toLocaleDateString('en-IN', {day:'numeric',month:'short',year:'2-digit'});
            const user = order.userId ? UserDB.getUser(order.userId) : null;
            return `
            <tr>
              <td><span style="font-family:monospace;font-weight:700;">${order.id}</span></td>
              <td>${user ? user.name : 'Guest'}</td>
              <td>${date}</td>
              <td>${order.items.length}</td>
              <td style="font-weight:700;color:var(--text-accent);">${formatINR(order.total)}</td>
              <td><span class="order-status-badge" style="background:${color}20;color:${color};">${status.icon} ${status.label}</span></td>
              <td>
                <div style="display:flex;gap:var(--space-1);">
                  <button class="btn btn-sm btn-secondary" onclick="navigateTo('/order/${order.id}')">View</button>
                  ${order.currentStatus < order.statusHistory.length - 1
                    ? `<button class="btn btn-sm btn-primary" onclick="event.stopPropagation(); adminAdvanceOrder('${order.id}')">Advance ⚡</button>`
                    : ''}
                </div>
              </td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>` : '<p style="color:var(--text-tertiary);">No orders yet.</p>'}
  `;
}

function adminAdvanceOrder(orderId) {
  const order = Store.getOrder(orderId);
  if (!order || order.currentStatus >= order.statusHistory.length - 1) return;
  Store.updateOrderStatus(orderId, order.currentStatus + 1);
  showToast(`Order ${orderId} status advanced! ✅`, 'success');
  renderPage();
}

// ── ADMIN USERS ──────────────────────────────────────────
function renderAdminUsers() {
  const users = UserDB.getAllUsers();

  return `
    <div class="dash-section-header" style="margin-bottom:var(--space-6);">
      <h1 class="dash-page-title" style="margin-bottom:0;">All Users</h1>
      <span class="shop-count">${users.length} user${users.length !== 1 ? 's' : ''}</span>
    </div>

    <div class="admin-table-wrapper">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Orders</th>
            <th>Joined</th>
          </tr>
        </thead>
        <tbody>
          ${users.map(u => {
            const orderCount = Store.getOrdersForUser(u.id).length;
            const date = new Date(u.createdAt).toLocaleDateString('en-IN', {day:'numeric',month:'short',year:'2-digit'});
            return `
            <tr>
              <td><strong>${u.name}</strong></td>
              <td>${u.email}</td>
              <td>${u.phone || '—'}</td>
              <td>
                <span class="order-status-badge" style="background:${u.role === 'admin' ? '#7c3aed20' : '#16a34a20'};color:${u.role === 'admin' ? '#7c3aed' : '#16a34a'};">
                  ${u.role === 'admin' ? '🛡️ Admin' : '👤 User'}
                </span>
              </td>
              <td>${orderCount}</td>
              <td>${date}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// ── ADMIN RETURNS ──────────────────────────────────────────
function renderAdminReturns() {
  const returns = ReturnDB.getAllReturns();
  const statusColors = {
    'requested': '#d97706', 'approved': '#16a34a', 'pickup_scheduled': '#2563eb',
    'picked_up': '#7c3aed', 'inspected': '#0891b2', 'refunded': '#16a34a', 'rejected': '#ef4444'
  };

  return `
    <div class="dash-section-header" style="margin-bottom:var(--space-6);">
      <h1 class="dash-page-title" style="margin-bottom:0;">Return Requests</h1>
      <span class="shop-count">${returns.length} return${returns.length !== 1 ? 's' : ''} · ${ReturnDB.getPendingCount()} pending</span>
    </div>

    ${returns.length > 0 ? `
    <div class="admin-table-wrapper">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Return ID</th>
            <th>Order</th>
            <th>Customer</th>
            <th>Reason</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${returns.map(ret => {
            const color = statusColors[ret.status] || '#78716c';
            const user = ret.userId ? UserDB.getUser(ret.userId) : null;
            const lastStatus = ret.statusHistory[ret.statusHistory.length - 1];
            return `
            <tr>
              <td><span style="font-family:monospace;font-weight:700;font-size:var(--fs-xs);">${ret.id}</span></td>
              <td><a onclick="navigateTo('/order/${ret.orderId}')" style="color:var(--color-primary-600);cursor:pointer;font-weight:600;">${ret.orderId}</a></td>
              <td>${user ? user.name : 'Guest'}</td>
              <td style="max-width:120px;">${ret.reason}</td>
              <td style="font-weight:700;color:var(--text-accent);">${formatINR(ret.refundAmount)}</td>
              <td><span class="order-status-badge" style="background:${color}20;color:${color};">${lastStatus?.icon || '📋'} ${lastStatus?.label || ret.status}</span></td>
              <td>
                <div style="display:flex;gap:var(--space-1);flex-wrap:wrap;">
                  ${ret.status === 'requested' ? `
                    <button class="btn btn-sm btn-primary" onclick="event.stopPropagation(); adminActionReturn('${ret.id}', 'approved')">✅ Approve</button>
                    <button class="btn btn-sm btn-ghost" style="color:var(--color-error);" onclick="event.stopPropagation(); adminActionReturn('${ret.id}', 'rejected')">❌ Reject</button>
                  ` : ret.status !== 'refunded' && ret.status !== 'rejected' ? `
                    <button class="btn btn-sm btn-secondary" onclick="event.stopPropagation(); adminAdvanceReturn('${ret.id}')">Advance ⚡</button>
                  ` : `<span style="font-size:var(--fs-xs);color:var(--text-tertiary);">Completed</span>`}
                  <button class="btn btn-sm btn-ghost" onclick="navigateTo('/return-status/${ret.id}')">View</button>
                </div>
              </td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>` : `
    <div class="empty-state" style="padding:var(--space-12);">
      <span class="empty-state-icon">🔄</span>
      <h2 class="empty-state-title">No returns yet</h2>
      <p class="empty-state-text">Return requests from customers will appear here.</p>
    </div>`}
  `;
}

function adminActionReturn(returnId, action) {
  const note = action === 'rejected' ? 'Return request was reviewed and denied by admin.' : '';
  ReturnDB.updateReturnStatus(returnId, action, note);
  showToast(`Return ${action === 'approved' ? 'approved ✅' : 'rejected ❌'}`, action === 'approved' ? 'success' : 'error');
  renderPage();
}

function adminAdvanceReturn(returnId) {
  const ret = ReturnDB.getReturn(returnId);
  if (!ret) return;
  const flow = ['requested', 'approved', 'pickup_scheduled', 'picked_up', 'inspected', 'refunded'];
  const currentIdx = flow.indexOf(ret.status);
  if (currentIdx < flow.length - 1) {
    ReturnDB.updateReturnStatus(returnId, flow[currentIdx + 1]);
    showToast('Return status advanced! ✅', 'success');
    renderPage();
  }
}
