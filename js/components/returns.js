/* ===== Return Request & Status Pages ===== */

// ── RETURN REQUEST PAGE ──────────────────────────────────
function renderReturnRequestPage(orderId) {
  const order = Store.getOrder(orderId);
  if (!order) {
    return `<div class="page-view"><div class="container"><div class="empty-state" style="min-height:50vh;">
      <span class="empty-state-icon">😕</span>
      <h2 class="empty-state-title">Order not found</h2>
      <a class="btn btn-primary" onclick="navigateTo('/orders')">My Orders</a>
    </div></div></div>`;
  }

  // Check if order is delivered
  const isDelivered = order.currentStatus >= order.statusHistory.length - 1;
  if (!isDelivered) {
    return `<div class="page-view"><div class="container"><div class="empty-state" style="min-height:50vh;">
      <span class="empty-state-icon">📦</span>
      <h2 class="empty-state-title">Order not yet delivered</h2>
      <p class="empty-state-text">You can request a return only after your order has been delivered.</p>
      <a class="btn btn-primary" onclick="navigateTo('/track/${order.id}')">Track Order</a>
    </div></div></div>`;
  }

  // Check if return already exists
  const existingReturn = ReturnDB.getReturnForOrder(orderId);
  if (existingReturn) {
    setTimeout(() => navigateTo('/return-status/' + existingReturn.id), 0);
    return '<div class="page-view"></div>';
  }

  return `
  <div class="page-view support-page return-request-page">
    <div class="container" style="max-width:800px;">
      <nav class="breadcrumb" style="margin-bottom:var(--space-6);">
        <a onclick="navigateTo('/')">Home</a><span class="separator">/</span>
        <a onclick="navigateTo('/orders')">My Orders</a><span class="separator">/</span>
        <a onclick="navigateTo('/order/${order.id}')">${order.id}</a><span class="separator">/</span>
        <span>Request Return</span>
      </nav>

      <div class="support-hero" style="padding-bottom:var(--space-4);">
        <span class="section-label">🔄 Return Request</span>
        <h1 class="support-hero-title">Request a <span class="text-gradient">Return</span></h1>
        <p class="support-hero-desc">Select the items you'd like to return and tell us why.</p>
      </div>

      <form class="return-form" onsubmit="event.preventDefault(); submitReturnRequest('${order.id}');">

        <!-- Items Selection -->
        <div class="return-section-card">
          <h2 class="return-section-title">📦 Select Items to Return</h2>
          <div class="return-items-list">
            ${order.items.map((item, idx) => `
              <label class="return-item-row" for="ret-item-${idx}">
                <input type="checkbox" id="ret-item-${idx}" class="return-checkbox" value="${idx}" checked>
                <div class="return-item-img">
                  <img src="images/${item.image}" alt="${item.name}">
                </div>
                <div class="return-item-info">
                  <span class="return-item-name">${item.name}</span>
                  <span class="return-item-meta">${item.category} · Qty: ${item.qty}</span>
                </div>
                <span class="return-item-price">${formatINR(item.price * item.qty)}</span>
              </label>
            `).join('')}
          </div>
        </div>

        <!-- Reason -->
        <div class="return-section-card">
          <h2 class="return-section-title">📝 Reason for Return</h2>
          <div class="return-reasons">
            <label class="return-reason-option">
              <input type="radio" name="return-reason" value="Defective / Damaged" required>
              <span class="return-reason-label">🔧 Defective / Damaged</span>
            </label>
            <label class="return-reason-option">
              <input type="radio" name="return-reason" value="Wrong Item Received">
              <span class="return-reason-label">📦 Wrong Item Received</span>
            </label>
            <label class="return-reason-option">
              <input type="radio" name="return-reason" value="Not as Described">
              <span class="return-reason-label">📋 Not as Described</span>
            </label>
            <label class="return-reason-option">
              <input type="radio" name="return-reason" value="Changed My Mind">
              <span class="return-reason-label">💭 Changed My Mind</span>
            </label>
            <label class="return-reason-option">
              <input type="radio" name="return-reason" value="Quality Not Satisfactory">
              <span class="return-reason-label">⭐ Quality Not Satisfactory</span>
            </label>
            <label class="return-reason-option">
              <input type="radio" name="return-reason" value="Other">
              <span class="return-reason-label">📌 Other</span>
            </label>
          </div>
          <div class="form-group" style="margin-top:var(--space-4);">
            <label class="form-label" for="return-notes">Additional Details (optional)</label>
            <textarea class="form-input" id="return-notes" rows="3" placeholder="Tell us more about the issue..." style="resize:vertical;"></textarea>
          </div>
        </div>

        <!-- Refund Method -->
        <div class="return-section-card">
          <h2 class="return-section-title">💰 Refund Method</h2>
          <div class="return-reasons">
            <label class="return-reason-option">
              <input type="radio" name="refund-method" value="Original Payment Method" required checked>
              <span class="return-reason-label">💳 Original Payment Method</span>
            </label>
            <label class="return-reason-option">
              <input type="radio" name="refund-method" value="Store Credit">
              <span class="return-reason-label">🏷️ Store Credit (Instant)</span>
            </label>
            <label class="return-reason-option">
              <input type="radio" name="refund-method" value="Bank Transfer">
              <span class="return-reason-label">🏦 Bank Transfer (NEFT)</span>
            </label>
          </div>
        </div>

        <!-- Refund Summary -->
        <div class="return-section-card return-summary-card">
          <h2 class="return-section-title">📊 Refund Summary</h2>
          <div class="summary-rows">
            <div class="summary-row">
              <span>Items Total</span>
              <span id="return-items-total">${formatINR(order.items.reduce((s, i) => s + i.price * i.qty, 0))}</span>
            </div>
            <div class="summary-row" style="color:var(--color-primary-600);">
              <span>Return Shipping</span>
              <span>FREE</span>
            </div>
            <div class="summary-row total">
              <span>Estimated Refund</span>
              <span id="return-refund-total">${formatINR(order.items.reduce((s, i) => s + i.price * i.qty, 0))}</span>
            </div>
          </div>
          <p style="font-size:var(--fs-xs);color:var(--text-tertiary);margin-top:var(--space-3);">
            Refund will be processed within 5–7 business days after item inspection.
          </p>
        </div>

        <button type="submit" class="btn btn-primary btn-lg" style="width:100%;font-size:var(--fs-md);">
          🔄 Submit Return Request
        </button>
        <p style="text-align:center;font-size:var(--fs-xs);color:var(--text-tertiary);margin-top:var(--space-2);">
          Our team will review your request within 24 hours.
        </p>
      </form>
    </div>
  </div>`;
}


// ── SUBMIT RETURN REQUEST ──────────────────────────────────
function submitReturnRequest(orderId) {
  const order = Store.getOrder(orderId);
  if (!order) { showToast('Order not found.', 'error'); return; }

  // Get selected items
  const checkboxes = document.querySelectorAll('.return-checkbox:checked');
  if (checkboxes.length === 0) {
    showToast('Please select at least one item to return.', 'error');
    return;
  }

  const selectedItems = Array.from(checkboxes).map(cb => {
    const idx = parseInt(cb.value);
    return order.items[idx];
  });

  // Get reason
  const reasonEl = document.querySelector('input[name="return-reason"]:checked');
  if (!reasonEl) {
    showToast('Please select a reason for return.', 'error');
    return;
  }

  const refundMethodEl = document.querySelector('input[name="refund-method"]:checked');
  const refundMethod = refundMethodEl ? refundMethodEl.value : 'Original Payment Method';
  const notes = document.getElementById('return-notes')?.value?.trim() || '';

  const result = ReturnDB.createReturn(orderId, selectedItems, reasonEl.value, refundMethod, notes);
  if (result.success) {
    showToast('Return request submitted successfully! 📋', 'success');
    navigateTo('/return-status/' + result.returnRequest.id);
  } else {
    showToast(result.error || 'Failed to submit return request.', 'error');
  }
}


// ── RETURN STATUS PAGE ──────────────────────────────────
function renderReturnStatusPage(returnId) {
  const ret = ReturnDB.getReturn(returnId);
  if (!ret) {
    return `<div class="page-view"><div class="container"><div class="empty-state" style="min-height:50vh;">
      <span class="empty-state-icon">🔍</span>
      <h2 class="empty-state-title">Return request not found</h2>
      <a class="btn btn-primary" onclick="navigateTo('/orders')">My Orders</a>
    </div></div></div>`;
  }

  const statusSteps = ['requested', 'approved', 'pickup_scheduled', 'picked_up', 'inspected', 'refunded'];
  const currentIdx = ret.status === 'rejected' ? -1 : statusSteps.indexOf(ret.status);

  const stepLabels = [
    { key: 'requested', label: 'Request Submitted', icon: '📋' },
    { key: 'approved', label: 'Return Approved', icon: '✅' },
    { key: 'pickup_scheduled', label: 'Pickup Scheduled', icon: '📅' },
    { key: 'picked_up', label: 'Item Picked Up', icon: '📦' },
    { key: 'inspected', label: 'Quality Inspected', icon: '🔍' },
    { key: 'refunded', label: 'Refund Processed', icon: '💰' }
  ];

  const statusColors = {
    'requested': '#d97706',
    'approved': '#16a34a',
    'pickup_scheduled': '#2563eb',
    'picked_up': '#7c3aed',
    'inspected': '#0891b2',
    'refunded': '#16a34a',
    'rejected': '#ef4444'
  };

  const color = statusColors[ret.status] || '#78716c';

  return `
  <div class="page-view support-page return-status-page">
    <div class="container" style="max-width:800px;">
      <nav class="breadcrumb" style="margin-bottom:var(--space-6);">
        <a onclick="navigateTo('/')">Home</a><span class="separator">/</span>
        <a onclick="navigateTo('/orders')">My Orders</a><span class="separator">/</span>
        <a onclick="navigateTo('/order/${ret.orderId}')">${ret.orderId}</a><span class="separator">/</span>
        <span>Return Status</span>
      </nav>

      <div class="support-hero" style="padding-bottom:var(--space-4);">
        <span class="section-label">🔄 Return Tracking</span>
        <h1 class="support-hero-title">Return <span class="text-gradient">Status</span></h1>
      </div>

      <!-- Status Banner -->
      <div class="order-status-banner" style="background:linear-gradient(135deg, ${color}dd, ${color});">
        <span style="font-size:2rem;">${ret.status === 'rejected' ? '❌' : stepLabels.find(s => s.key === ret.status)?.icon || '📋'}</span>
        <div>
          <div class="order-status-banner-title">${ret.status === 'rejected' ? 'Return Rejected' : stepLabels.find(s => s.key === ret.status)?.label || ret.status}</div>
          <div class="order-status-banner-desc">Return ID: ${ret.id}</div>
        </div>
        <div style="margin-left:auto;text-align:right;">
          <div style="font-size:var(--fs-xs);opacity:0.8;">Refund Amount</div>
          <div style="font-weight:700;font-size:var(--fs-lg);">${formatINR(ret.refundAmount)}</div>
        </div>
      </div>

      ${ret.status !== 'rejected' ? `
      <!-- Progress Timeline -->
      <div class="return-timeline">
        ${stepLabels.map((step, i) => {
          const histEntry = ret.statusHistory.find(h => h.status === step.key);
          const isCompleted = i < currentIdx;
          const isActive = i === currentIdx;
          return `
          <div class="tracking-step ${isCompleted ? 'completed' : isActive ? 'active' : ''}">
            <div class="tracking-step-icon-wrap">
              <div class="tracking-step-circle">${isCompleted ? '✓' : step.icon}</div>
              ${i < stepLabels.length - 1 ? `<div class="tracking-step-connector" style="--fill:${isCompleted ? '100%' : '0%'}"></div>` : ''}
            </div>
            <div class="tracking-step-body">
              <div class="tracking-step-label">${step.label}</div>
              <div class="tracking-step-time ${histEntry ? '' : 'pending'}">
                ${histEntry
                  ? '✓ ' + new Date(histEntry.timestamp).toLocaleString('en-IN', {day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})
                  : (i === currentIdx + 1 ? '⚡ Up Next' : '⏳ Pending')}
              </div>
            </div>
          </div>`;
        }).join('')}
      </div>
      ` : `
      <div class="return-section-card" style="border-left:3px solid #ef4444;">
        <h2 class="return-section-title" style="color:#ef4444;">❌ Return Rejected</h2>
        <p style="color:var(--text-secondary);font-size:var(--fs-sm);">
          ${ret.statusHistory[ret.statusHistory.length - 1]?.note || 'Your return request has been reviewed and was not approved.'}
        </p>
      </div>
      `}

      <!-- Return Details -->
      <div class="return-details-grid">
        <div class="return-section-card">
          <h2 class="return-section-title">📦 Items Being Returned</h2>
          ${ret.items.map(item => `
            <div class="order-item-row">
              <div class="order-item-row-img"><img src="images/${item.image}" alt="${item.name}"></div>
              <div class="order-item-row-info">
                <span class="order-item-row-name">${item.name}</span>
                <span class="order-item-row-price">${formatINR(item.price)} × ${item.qty}</span>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="return-section-card">
          <h2 class="return-section-title">📋 Return Details</h2>
          <div style="display:flex;flex-direction:column;gap:var(--space-2);font-size:var(--fs-sm);">
            <div class="summary-row"><span style="color:var(--text-tertiary);">Reason</span><span>${ret.reason}</span></div>
            <div class="summary-row"><span style="color:var(--text-tertiary);">Refund Method</span><span>${ret.refundMethod}</span></div>
            <div class="summary-row"><span style="color:var(--text-tertiary);">Refund Amount</span><span style="font-weight:700;color:var(--text-accent);">${formatINR(ret.refundAmount)}</span></div>
            <div class="summary-row"><span style="color:var(--text-tertiary);">Requested On</span><span>${new Date(ret.createdAt).toLocaleDateString('en-IN', {day:'numeric',month:'short',year:'numeric'})}</span></div>
            ${ret.notes ? `<div style="margin-top:var(--space-2);padding-top:var(--space-2);border-top:1px solid var(--border-light);"><span style="color:var(--text-tertiary);display:block;margin-bottom:4px;">Your Notes</span><p style="color:var(--text-secondary);line-height:1.6;">${ret.notes}</p></div>` : ''}
          </div>
        </div>
      </div>

      <div style="margin-top:var(--space-6);display:flex;gap:var(--space-3);flex-wrap:wrap;">
        <a class="btn btn-primary" onclick="navigateTo('/order/${ret.orderId}')">📋 View Order</a>
        <a class="btn btn-secondary" onclick="navigateTo('/orders')">← My Orders</a>
        ${ret.status === 'requested' ? `<button class="btn btn-ghost" onclick="simulateReturnProgress('${ret.id}')" style="margin-left:auto;">⚡ Simulate Progress</button>` : ''}
      </div>
    </div>
  </div>`;
}

// Simulate return progress (for demo)
function simulateReturnProgress(returnId) {
  const ret = ReturnDB.getReturn(returnId);
  if (!ret) return;
  const flow = ['requested', 'approved', 'pickup_scheduled', 'picked_up', 'inspected', 'refunded'];
  const currentIdx = flow.indexOf(ret.status);
  if (currentIdx < flow.length - 1) {
    ReturnDB.updateReturnStatus(returnId, flow[currentIdx + 1]);
    showToast('Return status updated! ✅', 'success');
    renderPage();
  } else {
    showToast('Return already fully processed! 💰', 'success');
  }
}
