/* ===== Cart Drawer Component ===== */

function renderCartDrawer() {
  return `
  <div class="cart-drawer-overlay" id="cart-drawer-overlay" onclick="toggleCartDrawer()"></div>
  <aside class="cart-drawer" id="cart-drawer" aria-label="Shopping cart">
    <div class="cart-drawer-header">
      <h2 class="cart-drawer-title">Your Cart</h2>
      <button class="btn-ghost" onclick="toggleCartDrawer()" aria-label="Close cart">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="cart-drawer-body" id="cart-drawer-body">
      <!-- filled by updateCartDrawer -->
    </div>
    <div class="cart-drawer-footer" id="cart-drawer-footer" style="display:none;">
      <div class="cart-summary-row">
        <span>Subtotal</span>
        <span id="cart-drawer-subtotal">₹0</span>
      </div>
      <div class="cart-summary-row">
        <span>Shipping</span>
        <span id="cart-drawer-shipping">₹0</span>
      </div>
      <div class="cart-summary-row total">
        <span>Total</span>
        <span id="cart-drawer-total">₹0</span>
      </div>
      <a class="btn btn-primary btn-lg" onclick="navigateTo('/cart'); toggleCartDrawer();">View Cart & Checkout</a>
    </div>
  </aside>`;
}

function toggleCartDrawer() {
  const overlay = document.getElementById('cart-drawer-overlay');
  const drawer = document.getElementById('cart-drawer');
  if (!overlay || !drawer) return;

  const isOpen = drawer.classList.contains('open');
  if (isOpen) {
    overlay.classList.remove('open');
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  } else {
    updateCartDrawer();
    overlay.classList.add('open');
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function updateCartDrawer() {
  const body = document.getElementById('cart-drawer-body');
  const footer = document.getElementById('cart-drawer-footer');
  if (!body) return;

  const items = Store.getCartItems();

  if (items.length === 0) {
    body.innerHTML = `
      <div class="cart-drawer-empty">
        <span class="empty-icon">🛒</span>
        <p>Your cart is empty</p>
        <a class="btn btn-primary" onclick="navigateTo('/shop'); toggleCartDrawer();">Start Shopping</a>
      </div>`;
    if (footer) footer.style.display = 'none';
    return;
  }

  body.innerHTML = items.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <div class="cart-item-image" onclick="navigateTo('/product/${item.id}'); toggleCartDrawer();">
        <img src="images/${item.image}" alt="${item.name}" loading="lazy">
      </div>
      <div class="cart-item-details">
        <span class="cart-item-name">${item.name}</span>
        <span class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</span>
        <div class="cart-item-controls">
          <div class="qty-control">
            <button class="qty-btn" onclick="Store.updateQty(${item.id}, ${item.qty - 1}); updateCartDrawer(); updateCartCount();">−</button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-btn" onclick="Store.updateQty(${item.id}, ${item.qty + 1}); updateCartDrawer(); updateCartCount();">+</button>
          </div>
          <button class="cart-item-remove" onclick="Store.removeFromCart(${item.id}); updateCartDrawer(); updateCartCount();">Remove</button>
        </div>
      </div>
    </div>
  `).join('');

  if (footer) {
    footer.style.display = 'flex';
    document.getElementById('cart-drawer-subtotal').textContent = `₹${Store.getCartSubtotal().toLocaleString('en-IN')}`;
    const shipping = Store.getShipping();
    document.getElementById('cart-drawer-shipping').textContent = shipping === 0 ? 'Free' : `₹${shipping}`;
    document.getElementById('cart-drawer-total').textContent = `₹${Store.getCartTotal().toLocaleString('en-IN')}`;
  }
}
