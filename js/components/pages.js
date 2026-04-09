/* ===== Page Renderers ===== */

// ---- Currency Helper ----
function formatINR(amount) {
  return '₹' + Number(amount).toLocaleString('en-IN');
}

// ---- Shared Helpers ----
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '<span class="stars">' +
    '★'.repeat(full) +
    (half ? '½' : '') +
    '☆'.repeat(empty) +
    '</span>';
}

function renderProductCard(product) {
  const badges = product.badges.map(b =>
    `<span class="badge badge-${b}">${b === 'bestseller' ? '⭐ Bestseller' : b === 'new' ? '✨ New' : b === 'sale' ? '🔥 Sale' : '🌿 Eco'}</span>`
  ).join('');

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return `
  <article class="product-card" onclick="navigateTo('/product/${product.id}')" id="product-card-${product.id}">
    <div class="product-card-image">
      <img src="images/${product.image}" alt="${product.name}" loading="lazy">
      <div class="product-card-badges">${badges}${discount ? `<span class="badge badge-sale">${discount}% off</span>` : ''}</div>
    </div>
    <div class="product-card-body">
      <p class="product-card-category">${product.category}</p>
      <h3 class="product-card-name">${product.name}</h3>
      <div class="product-card-rating">
        ${renderStars(product.rating)}
        <span class="rating-count">(${product.reviews})</span>
      </div>
      <div class="product-card-footer">
        <div class="product-card-price">
          <span class="price-current">${formatINR(product.price)}</span>
          ${product.originalPrice ? `<span class="price-original">${formatINR(product.originalPrice)}</span>` : ''}
        </div>
      </div>
    </div>
  </article>`;
}


// ---- HOME PAGE ----
function renderHomePage() {
  const featured = Store.getFeaturedProducts(4);
  const categoryImages = {
    'Reusable Kitchen': 'category-kitchen.jpg',
    'Personal Care': 'category-personal.jpg',
    'Home & Living': 'category-home.jpg',
    'Fashion': 'category-fashion.jpg'
  };

  return `
  <div class="page-view home-page">
    <!-- Hero -->
    <section class="hero" id="hero-section">
      <div class="container hero-content">
        <div class="hero-text">
          <span class="hero-badge">🌍 Sustainable Shopping in India</span>
          <h1 class="hero-title">Live <span class="highlight">Green</span>,<br>Shop Clean</h1>
          <p class="hero-desc">Discover beautifully crafted, sustainable products that are kind to you and the planet. Every purchase makes a difference.</p>
          <div class="hero-buttons">
            <a class="btn btn-primary btn-lg" onclick="navigateTo('/shop')">Shop Now →</a>
            <a class="btn btn-secondary btn-lg" onclick="navigateTo('/about')">Our Story</a>
          </div>
          <div class="hero-stats">
            <div class="hero-stat">
              <span class="hero-stat-value" data-count-to="50000" data-count-suffix="+">0</span>
              <span class="hero-stat-label">Happy Customers</span>
            </div>
            <div class="hero-stat">
              <span class="hero-stat-value" data-count-to="200" data-count-suffix="+">0</span>
              <span class="hero-stat-label">Eco Products</span>
            </div>
            <div class="hero-stat">
              <span class="hero-stat-value" data-count-to="100" data-count-suffix="%">0</span>
              <span class="hero-stat-label">Sustainable</span>
            </div>
          </div>
        </div>
        <div class="hero-image">
          <div class="hero-image-wrapper">
            <img src="images/hero-image.png" alt="Sustainable eco-friendly products" loading="eager">
          </div>
          <div class="hero-float-card card-1">
            <span class="float-icon green">🌱</span>
            <div class="float-text">
              <strong>Carbon Neutral</strong>
              <span>Free shipping over ₹2,000</span>
            </div>
          </div>
          <div class="hero-float-card card-2">
            <span class="float-icon amber">⭐</span>
            <div class="float-text">
              <strong>4.9 Rating</strong>
              <span>2,400+ reviews</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="section section-glow" id="categories-section">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-label">🏷️ Browse</span>
          <h2 class="section-title">Shop by Category</h2>
          <p class="section-subtitle">Explore our curated collections of sustainable products for every aspect of your life.</p>
        </div>
        <div class="categories-grid reveal-stagger">
          ${Store.categories.map(cat => `
            <div class="category-card" onclick="navigateTo('/shop?category=${encodeURIComponent(cat.name)}')">
              <div class="category-card-bg" style="background-image: url('images/${categoryImages[cat.name]}')"></div>
              <div class="category-card-overlay"></div>
              <div class="category-card-content">
                <span class="category-card-icon">${cat.icon}</span>
                <h3 class="category-card-name">${cat.name}</h3>
                <span class="category-card-count">${cat.count} Products</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="section section-glow" id="featured-section">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-label">⭐ Featured</span>
          <h2 class="section-title">Bestselling Products</h2>
          <p class="section-subtitle">Our community's most loved sustainable essentials.</p>
        </div>
        <div class="products-grid reveal-stagger">
          ${featured.map(p => renderProductCard(p)).join('')}
        </div>
        <div class="reveal" style="text-align:center; margin-top: var(--space-10);">
          <a class="btn btn-secondary btn-lg" onclick="navigateTo('/shop')">View All Products →</a>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="section" id="features-section">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-label">🌿 Why The Rooted Parcel</span>
          <h2 class="section-title">Our Promise to the Planet</h2>
          <p class="section-subtitle">We hold ourselves to the highest standards of sustainability and ethics.</p>
        </div>
        <div class="features-grid reveal-stagger">
          <div class="feature-card">
            <div class="feature-icon">🌱</div>
            <h3 class="feature-title">100% Sustainable</h3>
            <p class="feature-desc">Every product is vetted for environmental impact, using organic, recycled, or renewable materials.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📦</div>
            <h3 class="feature-title">Zero-Waste Packaging</h3>
            <p class="feature-desc">All orders ship in compostable or recyclable packaging. No plastic, ever.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🤝</div>
            <h3 class="feature-title">Fair Trade</h3>
            <p class="feature-desc">We partner with artisans and producers who are paid fairly and work in safe conditions.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="section" id="newsletter-section">
      <div class="container">
        <div class="newsletter-section">
          <div class="newsletter-content">
            <h2 class="newsletter-title">Join the Green Movement</h2>
            <p class="newsletter-desc">Get 10% off your first order and weekly tips for sustainable living.</p>
            <form class="newsletter-form" onsubmit="event.preventDefault(); showToast('Welcome to The Rooted Parcel family! 🌿', 'success'); this.reset();">
              <input type="email" class="form-input" placeholder="Enter your email" required>
              <button type="submit" class="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>`;
}

// ---- SHOP PAGE ----
function renderShopPage(params = {}) {
  const activeCategory = params.category || 'All';
  const searchQuery = params.search || '';
  const sortBy = params.sort || 'featured';

  let products = searchQuery
    ? Store.searchProducts(searchQuery)
    : Store.getProductsByCategory(activeCategory);

  products = Store.sortProducts(products, sortBy);

  return `
  <div class="page-view shop-page">
    <div class="container">
      <div class="shop-header">
        <div>
          <h1 class="shop-title">${searchQuery ? `Results for "${searchQuery}"` : activeCategory === 'All' ? 'All Products' : activeCategory}</h1>
          <span class="shop-count">${products.length} product${products.length !== 1 ? 's' : ''}</span>
        </div>
        <div class="shop-controls">
          <div class="filter-chips">
            <button class="filter-chip ${activeCategory === 'All' ? 'active' : ''}" onclick="navigateTo('/shop')">All</button>
            ${Store.categories.map(cat => `
              <button class="filter-chip ${activeCategory === cat.name ? 'active' : ''}" onclick="navigateTo('/shop?category=${encodeURIComponent(cat.name)}')">${cat.name}</button>
            `).join('')}
          </div>
          <select class="sort-select" onchange="handleSortChange(this.value, '${activeCategory}')" id="shop-sort">
            <option value="featured" ${sortBy === 'featured' ? 'selected' : ''}>Featured</option>
            <option value="price-low" ${sortBy === 'price-low' ? 'selected' : ''}>Price: Low → High</option>
            <option value="price-high" ${sortBy === 'price-high' ? 'selected' : ''}>Price: High → Low</option>
            <option value="rating" ${sortBy === 'rating' ? 'selected' : ''}>Top Rated</option>
            <option value="name" ${sortBy === 'name' ? 'selected' : ''}>A → Z</option>
          </select>
        </div>
      </div>

      ${products.length > 0
        ? `<div class="products-grid stagger-children">${products.map(p => renderProductCard(p)).join('')}</div>`
        : `<div class="empty-state">
            <span class="empty-state-icon">🔍</span>
            <h2 class="empty-state-title">No products found</h2>
            <p class="empty-state-text">Try adjusting your search or browse all products.</p>
            <a class="btn btn-primary" onclick="navigateTo('/shop')">View All Products</a>
          </div>`
      }
    </div>
  </div>`;
}

function handleSortChange(sortBy, category) {
  const params = new URLSearchParams();
  if (category && category !== 'All') params.set('category', category);
  if (sortBy && sortBy !== 'featured') params.set('sort', sortBy);
  const qs = params.toString();
  navigateTo('/shop' + (qs ? '?' + qs : ''));
}

// ---- PRODUCT DETAIL PAGE ----
function renderProductPage(productId) {
  const product = Store.getProduct(productId);
  if (!product) {
    return `<div class="page-view"><div class="container"><div class="empty-state">
      <span class="empty-state-icon">😕</span>
      <h2 class="empty-state-title">Product not found</h2>
      <a class="btn btn-primary" onclick="navigateTo('/shop')">Back to Shop</a>
    </div></div></div>`;
  }

  const related = Store.getRelatedProducts(productId, 4);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return `
  <div class="page-view product-page">
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a onclick="navigateTo('/')">Home</a>
        <span class="separator">/</span>
        <a onclick="navigateTo('/shop')">Shop</a>
        <span class="separator">/</span>
        <a onclick="navigateTo('/shop?category=${encodeURIComponent(product.category)}')">${product.category}</a>
        <span class="separator">/</span>
        <span>${product.name}</span>
      </nav>

      <div class="product-detail">
        <div class="product-gallery">
          <div class="product-main-image">
            <img src="images/${product.image}" alt="${product.name}" id="product-main-img">
          </div>
          <div class="product-thumbnails">
            <div class="product-thumb active">
              <img src="images/${product.image}" alt="${product.name}" onclick="document.getElementById('product-main-img').src=this.src">
            </div>
          </div>
        </div>

        <div class="product-info">
          <span class="product-info-category">${product.category}</span>
          <h1 class="product-info-name">${product.name}</h1>
          <div class="product-info-rating">
            ${renderStars(product.rating)}
            <span class="rating-text">${product.rating} (${product.reviews} reviews)</span>
          </div>
          <div class="product-info-price">
            <span class="price-current">${formatINR(product.price)}</span>
            ${product.originalPrice ? `<span class="price-original">${formatINR(product.originalPrice)}</span>` : ''}
            ${discount ? `<span class="badge badge-sale" style="font-size:var(--fs-sm); padding: 4px 10px;">${discount}% OFF</span>` : ''}
          </div>
          <p class="product-info-desc">${product.description}</p>
          <div class="product-eco-badges">
            ${product.ecoTags.map(tag => `<span class="eco-badge">${tag}</span>`).join('')}
          </div>
          <div class="product-actions">
            <div class="quantity-selector">
              <button class="qty-btn" onclick="changeProductQty(-1)">−</button>
              <span class="qty-value" id="product-qty">1</span>
              <button class="qty-btn" onclick="changeProductQty(1)">+</button>
            </div>
            <button class="btn btn-primary btn-lg" onclick="addProductToCart(${product.id})" id="add-to-cart-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              Add to Cart
            </button>
          </div>
          <div style="margin-top: var(--space-4); padding: var(--space-4); background: var(--color-primary-50); border-radius: var(--radius-lg); font-size: var(--fs-sm); color: var(--color-primary-700);">
            🚚 Free delivery on orders above ₹2,000 &nbsp;|&nbsp; 🔄 Easy 30-day returns &nbsp;|&nbsp; ✅ GST Invoice included
          </div>
        </div>
      </div>

      ${related.length > 0 ? `
        <section class="related-products section">
          <div class="section-header">
            <span class="section-label">🛒 You may also like</span>
            <h2 class="section-title">Related Products</h2>
          </div>
          <div class="products-grid stagger-children">
            ${related.map(p => renderProductCard(p)).join('')}
          </div>
        </section>
      ` : ''}
    </div>
  </div>`;
}

let _productQty = 1;

function changeProductQty(delta) {
  _productQty = Math.max(1, _productQty + delta);
  const el = document.getElementById('product-qty');
  if (el) el.textContent = _productQty;
}

function addProductToCart(productId) {
  const product = Store.getProduct(productId);
  Store.addToCart(productId, _productQty);
  updateCartCount();
  if (product) {
    showToast(`${product.name} × ${_productQty} added to cart! 🛒`, 'success');
  }
  // Bounce the cart icon
  const cartIcon = document.querySelector('.header-action[aria-label="Cart"]');
  if (cartIcon) { cartIcon.classList.add('cart-bounce'); setTimeout(() => cartIcon.classList.remove('cart-bounce'), 600); }
  _productQty = 1;
  const el = document.getElementById('product-qty');
  if (el) el.textContent = 1;
  // Auto-open cart drawer after a tiny delay
  setTimeout(() => toggleCartDrawer(), 300);
}

// Quick add to cart from product cards with full feedback
function quickAddToCart(productId, btnEl) {
  const product = Store.getProduct(productId);
  Store.addToCart(productId);
  updateCartCount();
  // Button feedback animation
  if (btnEl) {
    btnEl.classList.add('added');
    btnEl.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
    setTimeout(() => {
      btnEl.classList.remove('added');
      btnEl.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';
    }, 1200);
  }
  // Cart icon bounce
  const cartIcon = document.querySelector('.header-action[aria-label="Cart"]');
  if (cartIcon) { cartIcon.classList.add('cart-bounce'); setTimeout(() => cartIcon.classList.remove('cart-bounce'), 600); }
  // Toast notification
  if (product) showToast(`${product.name} added to cart! 🛒`, 'success');
}

// ---- CART PAGE ----
function renderCartPage() {
  const items = Store.getCartItems();

  if (items.length === 0) {
    return `
    <div class="page-view cart-page">
      <div class="container">
        <div class="empty-state">
          <span class="empty-state-icon">🛒</span>
          <h2 class="empty-state-title">Your cart is empty</h2>
          <p class="empty-state-text">Looks like you haven't added anything yet. Discover our eco-friendly products!</p>
          <a class="btn btn-primary btn-lg" onclick="navigateTo('/shop')">Start Shopping</a>
        </div>
      </div>
    </div>`;
  }

  const shipping = Store.getShipping();
  const remaining = 2000 - Store.getCartSubtotal();

  return `
  <div class="page-view cart-page">
    <div class="container">
      <h1 class="shop-title" style="margin-bottom: var(--space-8);">Shopping Cart <span class="shop-count">(${Store.getCartCount()} items)</span></h1>
      <div class="cart-layout">
        <div class="cart-items-section" id="cart-items-section">
          ${items.map((item, i) => `
            <div class="cart-page-item" style="animation-delay: ${i * 60}ms;">
              <div class="cart-page-item-image" onclick="navigateTo('/product/${item.id}')">
                <img src="images/${item.image}" alt="${item.name}" loading="lazy">
              </div>
              <div class="cart-page-item-info">
                <h3 class="cart-page-item-name">${item.name}</h3>
                <span class="cart-page-item-category">${item.category}</span>
                <div class="cart-page-item-bottom">
                  <span class="cart-page-item-price">${formatINR(item.price * item.qty)}</span>
                  <div class="qty-control">
                    <button class="qty-btn" onclick="Store.updateQty(${item.id}, ${item.qty - 1}); renderPage();">−</button>
                    <span class="qty-value">${item.qty}</span>
                    <button class="qty-btn" onclick="Store.updateQty(${item.id}, ${item.qty + 1}); renderPage();">+</button>
                  </div>
                  <button class="cart-item-remove" onclick="Store.removeFromCart(${item.id}); renderPage();">Remove</button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="cart-summary" id="cart-summary-sidebar">
          <h2 class="cart-summary-title">Order Summary</h2>
          <div class="summary-rows">
            <div class="summary-row">
              <span>Subtotal (${Store.getCartCount()} items)</span>
              <span>${formatINR(Store.getCartSubtotal())}</span>
            </div>
            <div class="summary-row">
              <span>Delivery Charges</span>
              <span>${shipping === 0 ? '<span style="color:var(--color-primary-600);font-weight:600;">FREE</span>' : formatINR(shipping)}</span>
            </div>
            ${Store.getCartSubtotal() > 0 ? `
            <div class="summary-row" style="color:var(--color-primary-700); font-size:var(--fs-xs);">
              <span>You save</span>
              <span>${formatINR(items.reduce((s, i) => s + ((i.originalPrice || i.price) - i.price) * i.qty, 0))}</span>
            </div>` : ''}
            <div class="summary-row total">
              <span>Total Amount</span>
              <span>${formatINR(Store.getCartTotal())}</span>
            </div>
          </div>

          <div class="promo-row" style="margin-bottom: var(--space-4);">
            <input type="text" class="form-input" placeholder="Enter coupon code" id="promo-input">
            <button class="btn btn-secondary" onclick="applyCoupon()">Apply</button>
          </div>

          <button class="btn btn-primary btn-lg" style="width:100%; font-size:var(--fs-md);" onclick="navigateTo('/checkout')">
            Proceed to Pay ${formatINR(Store.getCartTotal())}
          </button>

          ${shipping > 0
            ? `<div class="free-shipping-bar">🚚 Add ${formatINR(remaining)} more for FREE delivery!</div>`
            : `<div class="free-shipping-bar">🎉 You've unlocked FREE delivery!</div>`
          }

          <div style="margin-top:var(--space-4); text-align:center; font-size:var(--fs-xs); color:var(--text-tertiary);">
            <img src="https://razorpay.com/assets/razorpay-glyph.svg" alt="Razorpay" style="height:16px; vertical-align:middle; margin-right:4px; opacity:0.6;">
            Secure payments powered by Razorpay
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

function applyCoupon() {
  const code = document.getElementById('promo-input')?.value?.trim().toUpperCase();
  if (code === 'GREEN10') {
    showToast('Coupon GREEN10 applied! 10% off 🎉', 'success');
  } else if (code === 'ECO20') {
    showToast('Coupon ECO20 applied! 20% off 🎉', 'success');
  } else if (code) {
    showToast('Invalid coupon code. Try GREEN10 or ECO20!', 'error');
  }
}

// ---- CHECKOUT PAGE ----
function renderCheckoutPage() {
  const items = Store.getCartItems();
  if (items.length === 0) {
    navigateTo('/cart');
    return '<div class="page-view"></div>';
  }

  return `
  <div class="page-view checkout-page">
    <div class="container">
      <h1 class="shop-title" style="margin-bottom: var(--space-8);">Secure Checkout</h1>
      <div class="checkout-layout">

        <!-- Left: Forms -->
        <div class="checkout-form-section">

          <!-- Step 1: Contact & Shipping -->
          <div class="checkout-step">
            <div class="checkout-step-header">
              <span class="step-number">1</span>
              <h2 class="step-title">Contact & Shipping</h2>
            </div>
            <div class="checkout-form">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label" for="co-first">First Name *</label>
                  <input type="text" class="form-input" id="co-first" placeholder="Rahul" required>
                </div>
                <div class="form-group">
                  <label class="form-label" for="co-last">Last Name *</label>
                  <input type="text" class="form-input" id="co-last" placeholder="Sharma" required>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label" for="co-email">Email *</label>
                  <input type="email" class="form-input" id="co-email" placeholder="rahul@example.com" required>
                </div>
                <div class="form-group">
                  <label class="form-label" for="co-phone">Mobile Number *</label>
                  <input type="tel" class="form-input" id="co-phone" placeholder="9876543210" pattern="[0-9]{10}" required>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label" for="co-address">Address *</label>
                <input type="text" class="form-input" id="co-address" placeholder="House No., Street, Area" required>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label" for="co-city">City *</label>
                  <input type="text" class="form-input" id="co-city" placeholder="Mumbai" required>
                </div>
                <div class="form-group">
                  <label class="form-label" for="co-state">State *</label>
                  <select class="form-input sort-select" id="co-state" required style="padding-right: 2.5rem;">
                    <option value="">Select State</option>
                    <option>Andhra Pradesh</option><option>Assam</option><option>Bihar</option>
                    <option>Delhi</option><option>Goa</option><option>Gujarat</option>
                    <option>Haryana</option><option>Karnataka</option><option>Kerala</option>
                    <option>Madhya Pradesh</option><option>Maharashtra</option><option>Odisha</option>
                    <option>Punjab</option><option>Rajasthan</option><option>Tamil Nadu</option>
                    <option>Telangana</option><option>Uttar Pradesh</option><option>West Bengal</option>
                  </select>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label" for="co-pin">PIN Code *</label>
                  <input type="text" class="form-input" id="co-pin" placeholder="400001" maxlength="6" pattern="[0-9]{6}" required>
                </div>
                <div class="form-group">
                  <label class="form-label" for="co-gstin">GSTIN (optional)</label>
                  <input type="text" class="form-input" id="co-gstin" placeholder="For GST invoice">
                </div>
              </div>
            </div>
          </div>

          <!-- Step 2: Payment -->
          <div class="checkout-step" id="payment-step">
            <div class="checkout-step-header">
              <span class="step-number">2</span>
              <h2 class="step-title">Payment Method</h2>
            </div>

            <!-- Razorpay Payment Options -->
            <div class="payment-methods">
              <div class="payment-method active" onclick="selectPayment(this, 'razorpay')" data-method="razorpay">
                <span class="payment-radio"></span>
                <div style="flex:1;">
                  <span class="payment-label">Pay Online</span>
                  <div style="font-size:var(--fs-xs); color:var(--text-tertiary); margin-top:2px;">UPI, Cards, Net Banking, Wallets</div>
                </div>
                <div style="display:flex; gap:6px; align-items:center; flex-wrap:wrap;">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/200px-UPI-Logo-vector.svg.png" alt="UPI" style="height:20px; filter: var(--upi-filter, none);">
                  <span style="font-size:1.1rem;">💳</span>
                  <span style="font-size:var(--fs-xs); background:var(--color-primary-600); color:white; padding:1px 6px; border-radius:4px; font-weight:700;">Razorpay</span>
                </div>
              </div>

              <div class="payment-method" onclick="selectPayment(this, 'cod')" data-method="cod">
                <span class="payment-radio"></span>
                <div style="flex:1;">
                  <span class="payment-label">Cash on Delivery</span>
                  <div style="font-size:var(--fs-xs); color:var(--text-tertiary); margin-top:2px;">Pay when your order arrives</div>
                </div>
                <span class="payment-icon">💵</span>
              </div>
            </div>

            <div id="razorpay-note" style="margin-top:var(--space-4); padding:var(--space-3) var(--space-4); background:var(--color-primary-50); border-radius:var(--radius-lg); font-size:var(--fs-xs); color:var(--color-primary-700);">
              🔒 Your payment is secured by <strong>Razorpay</strong> with 256-bit SSL encryption. Supports UPI (PhonePe, GPay, Paytm), all Credit/Debit cards, and 50+ Net Banking options.
            </div>
          </div>

          <!-- Place Order Button -->
          <button class="btn btn-primary btn-lg" id="place-order-btn" style="width:100%; font-size:var(--fs-md);" onclick="handleCheckoutSubmit()">
            🔒 Pay Securely ${formatINR(Store.getCartTotal())}
          </button>
          <p style="text-align:center; font-size:var(--fs-xs); color:var(--text-tertiary); margin-top:var(--space-2);">
            By placing the order, you agree to our Terms & Conditions and Privacy Policy.
          </p>
        </div>

        <!-- Right: Order Summary -->
        <div class="checkout-summary">
          <div class="cart-summary">
            <h2 class="cart-summary-title">Order Summary</h2>
            ${items.map(item => `
              <div class="cart-item">
                <div class="cart-item-image">
                  <img src="images/${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                  <span class="cart-item-name">${item.name}</span>
                  <span class="cart-item-price">${formatINR(item.price)} × ${item.qty}</span>
                </div>
              </div>
            `).join('')}
            <div class="summary-rows" style="margin-top: var(--space-4);">
              <div class="summary-row">
                <span>Subtotal</span>
                <span>${formatINR(Store.getCartSubtotal())}</span>
              </div>
              <div class="summary-row">
                <span>Delivery</span>
                <span>${Store.getShipping() === 0 ? '<span style="color:var(--color-primary-600);">FREE</span>' : formatINR(Store.getShipping())}</span>
              </div>
              <div class="summary-row total">
                <span>Total</span>
                <span>${formatINR(Store.getCartTotal())}</span>
              </div>
            </div>
            <div style="margin-top: var(--space-4); display:flex; align-items:center; justify-content:center; gap:var(--space-2); font-size:var(--fs-xs); color:var(--text-tertiary);">
              <span>🔒</span>
              <span>Secured by Razorpay</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>`;
}

// Pre-fill checkout for logged-in users
function prefillCheckoutForUser() {
  const user = UserDB.getCurrentUser();
  if (!user) return;

  const names = user.name.split(' ');
  const first = document.getElementById('co-first');
  const last = document.getElementById('co-last');
  const email = document.getElementById('co-email');
  const phone = document.getElementById('co-phone');

  if (first && !first.value) first.value = names[0] || '';
  if (last && !last.value) last.value = names.slice(1).join(' ') || '';
  if (email && !email.value) email.value = user.email || '';
  if (phone && !phone.value) phone.value = user.phone || '';

  // Fill from saved address
  if (user.addresses && user.addresses.length > 0) {
    const addr = user.addresses[0];
    const addrEl = document.getElementById('co-address');
    const cityEl = document.getElementById('co-city');
    const stateEl = document.getElementById('co-state');
    const pinEl = document.getElementById('co-pin');

    if (addrEl && !addrEl.value) addrEl.value = addr.address || '';
    if (cityEl && !cityEl.value) cityEl.value = addr.city || '';
    if (stateEl && !stateEl.value) stateEl.value = addr.state || '';
    if (pinEl && !pinEl.value) pinEl.value = addr.pin || '';
  }
}

// ---- CHECKOUT HELPERS ----
let _selectedPaymentMethod = 'razorpay';

function selectPayment(el, method) {
  document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('active'));
  el.classList.add('active');
  _selectedPaymentMethod = method;

  const note = document.getElementById('razorpay-note');
  const btn = document.getElementById('place-order-btn');
  if (method === 'cod') {
    if (note) note.style.display = 'none';
    if (btn) btn.textContent = `Place Order (Cash on Delivery) — ${formatINR(Store.getCartTotal())}`;
  } else {
    if (note) note.style.display = 'block';
    if (btn) btn.innerHTML = `🔒 Pay Securely ${formatINR(Store.getCartTotal())}`;
  }
}

function validateCheckoutForm() {
  const fields = [
    { id: 'co-first', label: 'First Name' },
    { id: 'co-last', label: 'Last Name' },
    { id: 'co-email', label: 'Email' },
    { id: 'co-phone', label: 'Mobile Number' },
    { id: 'co-address', label: 'Address' },
    { id: 'co-city', label: 'City' },
    { id: 'co-state', label: 'State' },
    { id: 'co-pin', label: 'PIN Code' },
  ];

  for (const f of fields) {
    const el = document.getElementById(f.id);
    if (!el || !el.value.trim()) {
      showToast(`Please enter your ${f.label}`, 'error');
      el && el.focus();
      return false;
    }
  }

  const phone = document.getElementById('co-phone').value.trim();
  if (!/^[0-9]{10}$/.test(phone)) {
    showToast('Please enter a valid 10-digit mobile number', 'error');
    return false;
  }

  const pin = document.getElementById('co-pin').value.trim();
  if (!/^[0-9]{6}$/.test(pin)) {
    showToast('Please enter a valid 6-digit PIN code', 'error');
    return false;
  }

  return true;
}

function handleCheckoutSubmit() {
  if (!validateCheckoutForm()) return;

  if (_selectedPaymentMethod === 'cod') {
    submitOrderSuccess('COD');
    return;
  }

  // Razorpay payment
  initiateRazorpayPayment();
}

function initiateRazorpayPayment() {
  const total = Store.getCartTotal();
  const name = (document.getElementById('co-first')?.value || '') + ' ' + (document.getElementById('co-last')?.value || '');
  const email = document.getElementById('co-email')?.value || '';
  const phone = document.getElementById('co-phone')?.value || '';

  // Check if Razorpay is loaded
  if (typeof Razorpay === 'undefined') {
    showToast('Payment gateway is loading... Please try again.', 'error');
    return;
  }

  const options = {
    key: 'rzp_test_SZt5762AfkDMoR',
    amount: total * 100,        // Amount in paise (₹1 = 100 paise)
    currency: 'INR',
    name: 'The Rooted Parcel',
    description: `Order of ${Store.getCartCount()} items`,
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🌿</text></svg>',
    // order_id: 'order_xxxxxxxxxx',  // Add this from your backend for production
    prefill: {
      name: name.trim(),
      email: email,
      contact: '91' + phone,
    },
    notes: {
      address: document.getElementById('co-address')?.value || '',
      city: document.getElementById('co-city')?.value || '',
      state: document.getElementById('co-state')?.value || '',
      pin: document.getElementById('co-pin')?.value || '',
    },
    theme: {
      color: '#16a34a',
    },
    modal: {
      ondismiss: function () {
        showToast('Payment cancelled. Your cart is safe!', 'error');
      }
    },
    handler: function (response) {
      // Payment successful
      console.log('Payment ID:', response.razorpay_payment_id);
      submitOrderSuccess(response.razorpay_payment_id);
    },
  };

  const rzp = new Razorpay(options);

  rzp.on('payment.failed', function (response) {
    showToast('Payment failed: ' + response.error.description, 'error');
    console.error('Razorpay error:', response.error);
  });

  rzp.open();
}

function submitOrderSuccess(paymentId) {
  const orderNumber = 'ECO-' + Math.random().toString(36).substr(2, 8).toUpperCase();
  const isCOD = paymentId === 'COD';
  const now = new Date().toISOString();

  // Collect shipping details
  const shipping = {
    firstName: document.getElementById('co-first')?.value || '',
    lastName:  document.getElementById('co-last')?.value  || '',
    email:     document.getElementById('co-email')?.value || '',
    phone:     document.getElementById('co-phone')?.value || '',
    address:   document.getElementById('co-address')?.value || '',
    city:      document.getElementById('co-city')?.value   || '',
    state:     document.getElementById('co-state')?.value  || '',
    pin:       document.getElementById('co-pin')?.value    || '',
    gstin:     document.getElementById('co-gstin')?.value  || '',
  };

  // Build tracking timeline
  const trackingSteps = [
    { label: 'Order Placed',      icon: '📋', desc: 'Your order has been received.',              completedAt: now },
    { label: 'Payment Confirmed', icon: '✅', desc: isCOD ? 'Cash on Delivery selected.' : 'Payment verified via Razorpay.', completedAt: isCOD ? now : now },
    { label: 'Being Packed',      icon: '📦', desc: 'Your items are being carefully packed.',      completedAt: null },
    { label: 'Shipped',           icon: '🚚', desc: 'Package handed over to delivery partner.',    completedAt: null },
    { label: 'Out for Delivery',  icon: '🏍️', desc: 'Your order is out for delivery today!',       completedAt: null },
    { label: 'Delivered',         icon: '🎉', desc: 'Package delivered successfully.',              completedAt: null },
  ];

  // Save full order to store
  const orderData = {
    id: orderNumber,
    placedAt: now,
    paymentId: paymentId,
    paymentMethod: isCOD ? 'Cash on Delivery' : 'Razorpay (Online)',
    items: Store.getCartItems().map(i => ({ id: i.id, name: i.name, image: i.image, price: i.price, qty: i.qty, category: i.category })),
    subtotal: Store.getCartSubtotal(),
    shipping: Store.getShipping(),
    total: Store.getCartTotal(),
    shippingAddress: shipping,
    currentStatus: 1,
    statusHistory: trackingSteps,
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
  };
  Store.saveOrder(orderData);

  Store.clearCart();
  updateCartCount();

  const app = document.getElementById('app-content');
  if (app) {
    app.innerHTML = `
    <div class="page-view">
      <div class="container">
        <div class="checkout-success">
          <div class="success-icon">${isCOD ? '📦' : '🎉'}</div>
          <h1 class="success-title">${isCOD ? 'Order Confirmed!' : 'Payment Successful!'}</h1>
          <p class="success-text">
            Thank you for shopping sustainably with The Rooted Parcel! 🌿<br>
            ${isCOD
              ? 'Your order will be delivered in 5–7 business days. Pay on delivery.'
              : 'Your payment was processed securely via Razorpay.'}
          </p>
          <span class="order-number">${orderNumber}</span>
          ${!isCOD ? `<p style="font-size:var(--fs-xs);color:var(--text-tertiary);margin-top:calc(-1 * var(--space-4));">Payment ID: ${paymentId}</p>` : ''}
          <div style="display:flex;gap:var(--space-3);justify-content:center;flex-wrap:wrap;margin-top:var(--space-6);">
            <a class="btn btn-primary btn-lg" onclick="navigateTo('/order/${orderNumber}')">📋 View Order Details</a>
            <a class="btn btn-secondary btn-lg" onclick="navigateTo('/track/${orderNumber}')">🚚 Track Order</a>
          </div>
          <div style="margin-top:var(--space-4);">
            <a class="btn btn-ghost" onclick="navigateTo('/orders')">← My Orders</a>
          </div>
        </div>
      </div>
    </div>` + renderFooter();
  }
}

// ---- ABOUT PAGE ----
function renderAboutPage() {
  return `
  <div class="page-view about-page">
    <div class="container">
      <div class="about-hero">
        <span class="section-label">🌍 Our Story</span>
        <h1 class="about-hero-title">Rooted in <span class="text-gradient">Purpose</span></h1>
        <p class="about-hero-desc">The Rooted Parcel was born from a simple belief: that everyday choices can create extraordinary change. We curate the finest sustainable products, connecting conscious Indian consumers with ethical producers from around the world.</p>
      </div>

      <div class="about-mission animate-fade-in-up">
        <div class="about-mission-image">
          <img src="images/about-mission.jpg" alt="Our mission - community garden">
        </div>
        <div class="about-mission-text">
          <h2>Our Mission</h2>
          <p>We believe that sustainability shouldn't mean compromise. Every product in our collection is carefully selected for its environmental impact, quality, and beauty.</p>
          <p>From organic cotton to recycled ocean plastics, we partner with artisans and brands who share our vision of a waste-free future. Together, we've already prevented over 100,000 pounds of waste from entering landfills.</p>
          <p>Our commitment extends beyond products — we donate 1% of every sale to environmental restoration projects and offset our carbon footprint with every shipment.</p>
        </div>
      </div>

      <div class="about-values">
        <div class="section-header">
          <span class="section-label">💚 Our Values</span>
          <h2 class="section-title">What We Stand For</h2>
        </div>
        <div class="values-grid stagger-children">
          <div class="value-card"><span class="value-icon">🌿</span><h3 class="value-title">Planet First</h3><p class="value-desc">Environmental impact is our top priority. We choose materials and processes that heal rather than harm.</p></div>
          <div class="value-card"><span class="value-icon">🤝</span><h3 class="value-title">Ethical Always</h3><p class="value-desc">Fair wages, safe conditions, and dignified work. Our supply chain respects people at every level.</p></div>
          <div class="value-card"><span class="value-icon">✨</span><h3 class="value-title">Quality Matters</h3><p class="value-desc">Sustainable products should be beautiful and durable. We test everything to ensure it exceeds expectations.</p></div>
          <div class="value-card"><span class="value-icon">📦</span><h3 class="value-title">Zero Waste</h3><p class="value-desc">From our warehouses to your doorstep, we eliminate plastic and minimize waste at every step.</p></div>
          <div class="value-card"><span class="value-icon">🔬</span><h3 class="value-title">Full Transparency</h3><p class="value-desc">We share every detail about our materials, sourcing, and impact. No greenwashing, ever.</p></div>
          <div class="value-card"><span class="value-icon">🇮🇳</span><h3 class="value-title">Made for India</h3><p class="value-desc">Thoughtfully priced for Indian consumers, with INR pricing, UPI support, and fast pan-India delivery.</p></div>
        </div>
      </div>

      <div class="about-impact">
        <div class="section-header">
          <span class="section-label">📊 Our Impact</span>
          <h2 class="section-title">The Numbers Speak</h2>
        </div>
        <div class="impact-grid stagger-children">
          <div><div class="impact-number">100K+</div><div class="impact-label">Lbs of Waste Prevented</div></div>
          <div><div class="impact-number">50K+</div><div class="impact-label">Happy Customers</div></div>
          <div><div class="impact-number">200+</div><div class="impact-label">Eco Products</div></div>
          <div><div class="impact-number">₹25L+</div><div class="impact-label">Donated to Causes</div></div>
        </div>
      </div>
    </div>
  </div>`;
}
