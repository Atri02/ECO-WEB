/* ===== Order Pages: My Orders, Order Detail, Order Tracking ===== */

// ============================================================
// ---- MY ORDERS PAGE ----
// ============================================================
function renderOrdersPage() {
  const user = UserDB.getCurrentUser();
  const allOrders = Store.getAllOrders();
  // Show user's orders if logged in (admin sees all)
  const orders = user && user.role !== 'admin' ? allOrders.filter(o => o.userId === user.id) : allOrders;

  if (orders.length === 0) {
    return `
    <div class="page-view">
      <div class="container">
        <div class="empty-state" style="min-height:60vh;">
          <span class="empty-state-icon">📦</span>
          <h1 class="empty-state-title">No Orders Yet</h1>
          <p class="empty-state-text">You haven't placed any orders. Start shopping for sustainable products!</p>
          <a class="btn btn-primary btn-lg" onclick="navigateTo('/shop')">Browse Products</a>
        </div>
      </div>
    </div>`;
  }

  const statusColors = ['#78716c','#16a34a','#2563eb','#d97706','#7c3aed','#16a34a'];

  return `
  <div class="page-view orders-page">
    <div class="container" style="padding-top:var(--space-8); padding-bottom:var(--space-20);">
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:var(--space-8); flex-wrap:wrap; gap:var(--space-4);">
        <div>
          <h1 class="shop-title">My Orders</h1>
          <span class="shop-count">${orders.length} order${orders.length !== 1 ? 's' : ''}</span>
        </div>
        <a class="btn btn-secondary" onclick="navigateTo('/shop')">Continue Shopping</a>
      </div>
      <div style="display:flex; flex-direction:column; gap:var(--space-4);">
        ${orders.map(order => {
          const status = order.statusHistory[order.currentStatus];
          const date = new Date(order.placedAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' });
          const color = statusColors[order.currentStatus] || '#78716c';
          return `
          <div class="order-card" onclick="navigateTo('/order/${order.id}')">
            <div class="order-card-header">
              <div class="order-card-meta">
                <span class="order-id-label">Order ID</span>
                <span class="order-id-value">${order.id}</span>
              </div>
              <div class="order-card-meta" style="text-align:center;">
                <span class="order-id-label">Placed On</span>
                <span class="order-id-value">${date}</span>
              </div>
              <div class="order-card-meta" style="text-align:center;">
                <span class="order-id-label">Total</span>
                <span class="order-id-value" style="color:var(--text-accent);">${formatINR(order.total)}</span>
              </div>
              <div class="order-card-meta" style="text-align:right;">
                <span class="order-id-label">Status</span>
                <span class="order-status-badge" style="background:${color}20; color:${color};">
                  ${status.icon} ${status.label}
                </span>
              </div>
            </div>
            <div class="order-card-items">
              ${order.items.slice(0, 3).map(item => `
                <div class="order-item-thumb">
                  <img src="images/${item.image}" alt="${item.name}" loading="lazy">
                </div>
              `).join('')}
              ${order.items.length > 3 ? `<div class="order-item-more">+${order.items.length - 3} more</div>` : ''}
              <div style="margin-left:auto; display:flex; gap:var(--space-2);">
                <a class="btn btn-sm btn-secondary" onclick="event.stopPropagation(); navigateTo('/track/${order.id}')">🚚 Track</a>
                <a class="btn btn-sm btn-primary" onclick="event.stopPropagation(); navigateTo('/order/${order.id}')">Details</a>
              </div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>
  </div>`;
}

// ============================================================
// ---- ORDER DETAIL PAGE ----
// ============================================================
function renderOrderDetailPage(orderId) {
  const order = Store.getOrder(orderId);
  if (!order) {
    return `<div class="page-view"><div class="container"><div class="empty-state" style="min-height:50vh;">
      <span class="empty-state-icon">😕</span>
      <h2 class="empty-state-title">Order not found</h2>
      <a class="btn btn-primary" onclick="navigateTo('/orders')">My Orders</a>
    </div></div></div>`;
  }

  const addr = order.shippingAddress;
  const date = new Date(order.placedAt).toLocaleString('en-IN', { day:'numeric', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit' });
  const estDate = new Date(order.estimatedDelivery).toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long' });
  const curStep = order.statusHistory[order.currentStatus];

  return `
  <div class="page-view order-detail-page">
    <div class="container" style="padding-top:var(--space-8); padding-bottom:var(--space-20);">
      <nav class="breadcrumb" style="margin-bottom:var(--space-6);">
        <a onclick="navigateTo('/')">Home</a><span class="separator">/</span>
        <a onclick="navigateTo('/orders')">My Orders</a><span class="separator">/</span>
        <span>${order.id}</span>
      </nav>

      <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:var(--space-4); margin-bottom:var(--space-8);">
        <div>
          <h1 class="shop-title">Order Details</h1>
          <span class="shop-count">Placed on ${date}</span>
        </div>
        <a class="btn btn-primary" onclick="navigateTo('/track/${order.id}')">🚚 Track Order</a>
      </div>

      <!-- Status Banner -->
      <div class="order-status-banner">
        <span style="font-size:2rem;">${curStep.icon}</span>
        <div>
          <div class="order-status-banner-title">${curStep.label}</div>
          <div class="order-status-banner-desc">${curStep.desc}</div>
        </div>
        <div style="margin-left:auto; text-align:right;">
          <div style="font-size:var(--fs-xs); opacity:0.8;">Estimated Delivery</div>
          <div style="font-weight:700;">${estDate}</div>
        </div>
      </div>

      <div class="order-detail-grid">
        <!-- Items + Pricing -->
        <div>
          <div class="order-section-card">
            <h2 class="order-section-title">📦 Items Ordered (${order.items.length})</h2>
            <div style="display:flex; flex-direction:column; gap:var(--space-3);">
              ${order.items.map(item => `
                <div class="order-item-row">
                  <div class="order-item-row-img" onclick="navigateTo('/product/${item.id}')">
                    <img src="images/${item.image}" alt="${item.name}" loading="lazy">
                  </div>
                  <div class="order-item-row-info">
                    <span class="order-item-row-name">${item.name}</span>
                    <span class="order-item-row-cat">${item.category}</span>
                    <span class="order-item-row-price">${formatINR(item.price)} × ${item.qty} = <strong>${formatINR(item.price * item.qty)}</strong></span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="order-section-card" style="margin-top:var(--space-4);">
            <h2 class="order-section-title">💰 Price Breakdown</h2>
            <div style="display:flex;flex-direction:column;gap:var(--space-2);">
              <div class="summary-row"><span>Subtotal</span><span>${formatINR(order.subtotal)}</span></div>
              <div class="summary-row"><span>Delivery</span><span>${order.shipping === 0 ? '<span style="color:var(--color-primary-600);">FREE</span>' : formatINR(order.shipping)}</span></div>
              <div class="summary-row total"><span>Total Paid</span><span>${formatINR(order.total)}</span></div>
            </div>
          </div>

          <!-- Return Section -->
          ${(() => {
            const isDelivered = order.currentStatus >= order.statusHistory.length - 1;
            const existingReturn = ReturnDB.getReturnForOrder(order.id);
            if (existingReturn) {
              const statusColors = { 'requested':'#d97706','approved':'#16a34a','pickup_scheduled':'#2563eb','picked_up':'#7c3aed','inspected':'#0891b2','refunded':'#16a34a','rejected':'#ef4444' };
              const color = statusColors[existingReturn.status] || '#78716c';
              const lastStatus = existingReturn.statusHistory[existingReturn.statusHistory.length - 1];
              return `
              <div class="order-section-card" style="margin-top:var(--space-4);border-left:3px solid ${color};">
                <h2 class="order-section-title">🔄 Return Request</h2>
                <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:var(--space-3);">
                  <div>
                    <span class="order-status-badge" style="background:${color}20;color:${color};">${lastStatus?.icon||'📋'} ${lastStatus?.label||existingReturn.status}</span>
                    <span style="font-size:var(--fs-sm);color:var(--text-secondary);margin-left:var(--space-2);">Refund: ${formatINR(existingReturn.refundAmount)}</span>
                  </div>
                  <a class="btn btn-sm btn-secondary" onclick="navigateTo('/return-status/${existingReturn.id}')">View Return Status →</a>
                </div>
              </div>`;
            } else if (isDelivered) {
              return `
              <div class="order-section-card" style="margin-top:var(--space-4);">
                <h2 class="order-section-title">🔄 Need to Return?</h2>
                <p style="font-size:var(--fs-sm);color:var(--text-secondary);margin-bottom:var(--space-4);">Not satisfied? You can request a return within 30 days of delivery.</p>
                <a class="btn btn-primary" onclick="navigateTo('/return/${order.id}')">Request Return →</a>
              </div>`;
            }
            return '';
          })()}
        </div>

        <!-- Payment + Address + Reference -->
        <div style="display:flex; flex-direction:column; gap:var(--space-4);">
          <div class="order-section-card">
            <h2 class="order-section-title">💳 Payment Info</h2>
            <div style="display:flex;flex-direction:column;gap:var(--space-2);font-size:var(--fs-sm);">
              <div class="summary-row"><span style="color:var(--text-tertiary);">Method</span><span>${order.paymentMethod}</span></div>
              ${order.paymentId && order.paymentId !== 'COD'
                ? `<div class="summary-row"><span style="color:var(--text-tertiary);">Payment ID</span><span style="font-family:monospace;font-size:var(--fs-xs);">${order.paymentId}</span></div>`
                : ''}
              <div class="summary-row"><span style="color:var(--text-tertiary);">Amount</span><span style="font-weight:700;color:var(--text-accent);">${formatINR(order.total)}</span></div>
            </div>
          </div>
          <div class="order-section-card">
            <h2 class="order-section-title">📍 Shipping Address</h2>
            <div style="font-size:var(--fs-sm);line-height:1.8;color:var(--text-secondary);">
              <strong style="color:var(--text-primary);">${addr.firstName} ${addr.lastName}</strong><br>
              ${addr.address}<br>
              ${addr.city}, ${addr.state} — ${addr.pin}<br>
              📱 ${addr.phone}<br>
              ✉️ ${addr.email}
              ${addr.gstin ? `<br>GSTIN: ${addr.gstin}` : ''}
            </div>
          </div>
          <div class="order-section-card">
            <h2 class="order-section-title">🔖 Order Reference</h2>
            <div style="font-size:var(--fs-sm);color:var(--text-secondary);">
              <div class="summary-row"><span>Order ID</span><span style="font-family:monospace;font-weight:700;">${order.id}</span></div>
              <div class="summary-row"><span>Placed</span><span>${date}</span></div>
              <div class="summary-row"><span>Est. Delivery</span><span style="font-weight:600;color:var(--color-primary-600);">${estDate}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

// ============================================================
// ---- ORDER TRACKING PAGE ----
// ============================================================
let _trackingInterval = null;

function renderTrackingPage(orderId) {
  const order = Store.getOrder(orderId);
  if (!order) {
    return `<div class="page-view"><div class="container"><div class="empty-state" style="min-height:50vh;">
      <span class="empty-state-icon">🔍</span>
      <h2 class="empty-state-title">Order not found</h2>
      <a class="btn btn-primary" onclick="navigateTo('/orders')">My Orders</a>
    </div></div></div>`;
  }

  // Clear any running interval
  if (_trackingInterval) { clearInterval(_trackingInterval); _trackingInterval = null; }

  const estDate = new Date(order.estimatedDelivery).toLocaleDateString('en-IN', {
    weekday:'long', day:'numeric', month:'long', year:'numeric'
  });
  const addr = order.shippingAddress;
  const pct = Math.round((order.currentStatus / (order.statusHistory.length - 1)) * 100);

  const html = `
  <div class="page-view tracking-page">
    <div class="container" style="padding-top:var(--space-8); padding-bottom:var(--space-20); max-width:800px; margin:0 auto;">
      <nav class="breadcrumb" style="margin-bottom:var(--space-6);">
        <a onclick="navigateTo('/')">Home</a><span class="separator">/</span>
        <a onclick="navigateTo('/orders')">My Orders</a><span class="separator">/</span>
        <a onclick="navigateTo('/order/${order.id}')">${order.id}</a><span class="separator">/</span>
        <span>Track</span>
      </nav>

      <h1 class="shop-title" style="margin-bottom:var(--space-2);">🚚 Live Order Tracking</h1>
      <p class="shop-count" style="margin-bottom:var(--space-8);">
        Order: <strong>${order.id}</strong> &nbsp;·&nbsp;
        Est. Delivery: <strong style="color:var(--color-primary-600);">${estDate}</strong>
      </p>

      <!-- Animated Vehicle Map -->
      <div class="tracking-map-strip">
        <div class="tracking-map-inner">
          <div class="tracking-road-line"></div>
          <div class="tracking-vehicle" id="tracking-vehicle" style="left:${Math.min(pct, 92)}%;">
            ${order.currentStatus === order.statusHistory.length - 1 ? '🏠' : '🚚'}
          </div>
        </div>
        <div class="tracking-map-labels">
          <span>📦 Warehouse</span>
          <span class="tracking-status-live-badge" id="tracking-status-live">
            ${order.statusHistory[order.currentStatus].icon} ${order.statusHistory[order.currentStatus].label}
          </span>
          <span>🏠 Your Home</span>
        </div>
      </div>

      <!-- Progress Bar -->
      <div class="tracking-progress-bar">
        <div class="tracking-progress-fill" id="tracking-progress-fill" style="width:${pct}%"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:var(--fs-xs);color:var(--text-tertiary);margin-top:var(--space-1);margin-bottom:var(--space-8);">
        <span>Order Placed</span>
        <span style="color:var(--color-primary-600);font-weight:600;">${pct}% Complete</span>
        <span>Delivered</span>
      </div>

      <!-- Timeline -->
      <div class="tracking-timeline" id="tracking-timeline">
        ${order.statusHistory.map((step, i) => `
          <div class="tracking-step ${i < order.currentStatus ? 'completed' : i === order.currentStatus ? 'active' : ''}" id="tracking-step-${i}">
            <div class="tracking-step-icon-wrap">
              <div class="tracking-step-circle" id="tracking-circle-${i}">
                ${i < order.currentStatus ? '✓' : step.icon}
              </div>
              ${i < order.statusHistory.length - 1
                ? `<div class="tracking-step-connector" id="tracking-line-${i}" style="--fill:${i < order.currentStatus ? '100%' : '0%'}"></div>`
                : ''}
            </div>
            <div class="tracking-step-body">
              <div class="tracking-step-label">${step.label}</div>
              <div class="tracking-step-desc">${step.desc}</div>
              <div class="tracking-step-time ${step.completedAt ? '' : 'pending'}" id="tracking-time-${i}">
                ${step.completedAt
                  ? '✓ ' + new Date(step.completedAt).toLocaleString('en-IN', {day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})
                  : (i === order.currentStatus + 1 ? '⚡ Up Next' : '⏳ Pending')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Delivery Address -->
      <div class="order-section-card" style="margin-top:var(--space-6);">
        <h2 class="order-section-title">📍 Delivering To</h2>
        <p style="font-size:var(--fs-sm);color:var(--text-secondary);line-height:1.8;">
          <strong style="color:var(--text-primary);">${addr.firstName} ${addr.lastName}</strong><br>
          ${addr.address}, ${addr.city}, ${addr.state} — ${addr.pin}<br>
          📱 ${addr.phone}
        </p>
      </div>

      <div style="margin-top:var(--space-6);display:flex;gap:var(--space-3);flex-wrap:wrap;align-items:center;">
        <a class="btn btn-primary" onclick="navigateTo('/order/${order.id}')">📋 Order Details</a>
        <a class="btn btn-secondary" onclick="navigateTo('/orders')">← My Orders</a>
        ${order.currentStatus < order.statusHistory.length - 1
          ? `<button class="btn btn-ghost" id="simulate-btn" onclick="simulateNextStep('${order.id}')">⚡ Simulate Next Update</button>`
          : `<span style="color:var(--color-primary-600);font-weight:700;font-size:var(--fs-md);">🎉 Order Delivered!</span>
             ${!ReturnDB.getReturnForOrder(order.id) ? `<a class="btn btn-secondary" onclick="navigateTo('/return/${order.id}')" style="margin-left:auto;">🔄 Request Return</a>` : `<a class="btn btn-secondary" onclick="navigateTo('/return-status/${ReturnDB.getReturnForOrder(order.id).id}')" style="margin-left:auto;">🔄 View Return</a>`}`}
      </div>
      ${order.currentStatus < order.statusHistory.length - 1
        ? `<p style="font-size:var(--fs-xs);color:var(--text-tertiary);margin-top:var(--space-3);">
            🔄 Status auto-updates every 8 seconds · Click ⚡ to advance manually
           </p>`
        : ''}
    </div>
  </div>`;

  // Start simulation after DOM renders
  setTimeout(() => startTrackingSimulation(order), 150);
  return html;
}

function startTrackingSimulation(order) {
  if (_trackingInterval) clearInterval(_trackingInterval);
  if (order.currentStatus >= order.statusHistory.length - 1) return;

  _trackingInterval = setInterval(() => {
    const fresh = Store.getOrder(order.id);
    if (!fresh || fresh.currentStatus >= fresh.statusHistory.length - 1) {
      clearInterval(_trackingInterval); _trackingInterval = null; return;
    }
    Store.updateOrderStatus(order.id, fresh.currentStatus + 1);
    updateTrackingDOM(Store.getOrder(order.id));
  }, 8000);
}

function simulateNextStep(orderId) {
  const order = Store.getOrder(orderId);
  if (!order) return;
  if (order.currentStatus >= order.statusHistory.length - 1) {
    showToast('Order already delivered! 🎉', 'success'); return;
  }
  Store.updateOrderStatus(orderId, order.currentStatus + 1);
  updateTrackingDOM(Store.getOrder(orderId));
}

function updateTrackingDOM(order) {
  if (!order) return;
  const cur   = order.currentStatus;
  const steps = order.statusHistory;
  const total = steps.length - 1;
  const pct   = Math.round((cur / total) * 100);

  steps.forEach((step, i) => {
    const stepEl  = document.getElementById('tracking-step-' + i);
    const circEl  = document.getElementById('tracking-circle-' + i);
    const timeEl  = document.getElementById('tracking-time-' + i);
    const lineEl  = document.getElementById('tracking-line-' + i);

    if (stepEl) stepEl.className = 'tracking-step ' + (i < cur ? 'completed' : i === cur ? 'active' : '');
    if (circEl) circEl.textContent = i < cur ? '✓' : step.icon;
    if (lineEl) lineEl.style.setProperty('--fill', i < cur ? '100%' : '0%');
    if (timeEl) {
      if (step.completedAt) {
        timeEl.className = 'tracking-step-time';
        timeEl.textContent = '✓ ' + new Date(step.completedAt).toLocaleString('en-IN', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' });
      } else {
        timeEl.textContent = i === cur + 1 ? '⚡ Up Next' : '⏳ Pending';
      }
    }
  });

  const vehicle = document.getElementById('tracking-vehicle');
  if (vehicle) {
    vehicle.style.left = Math.min((cur / total) * 100, 92) + '%';
    vehicle.textContent = cur === total ? '🏠' : '🚚';
  }

  const liveLabel = document.getElementById('tracking-status-live');
  if (liveLabel) liveLabel.textContent = steps[cur].icon + ' ' + steps[cur].label;

  const bar = document.getElementById('tracking-progress-fill');
  if (bar) bar.style.width = pct + '%';

  // Show toast notification on each status update
  showToast(steps[cur].icon + ' ' + steps[cur].label, 'success');

  if (cur >= total) {
    if (_trackingInterval) { clearInterval(_trackingInterval); _trackingInterval = null; }
    const btn = document.getElementById('simulate-btn');
    if (btn) btn.replaceWith(Object.assign(document.createElement('span'), {
      style: 'color:var(--color-primary-600);font-weight:700;font-size:var(--fs-md);',
      textContent: '🎉 Order Delivered!'
    }));
  }
}
