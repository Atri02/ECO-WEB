/* ===== Store: Product Data & Cart Logic ===== */

const Store = {
  // ---- Products Database ----
  products: [
    // Reusable Kitchen
    {
      id: 1,
      name: "Organic Beeswax Wrap Set",
      category: "Reusable Kitchen",
      price: 1999,
      originalPrice: 2899,
      description: "Replace single-use plastic wrap with these beautiful, reusable beeswax wraps. Made from organic cotton, sustainably sourced beeswax, jojoba oil, and tree resin. Set includes 3 sizes (S, M, L) in botanical prints. Naturally antibacterial, washable, and compostable at end of life.",
      rating: 4.8,
      reviews: 342,
      badges: ["bestseller"],
      ecoTags: ["🌿 Organic", "♻️ Compostable", "🐝 Beeswax"],
      image: "beeswax-wraps.jpg",
      inStock: true
    },
    {
      id: 2,
      name: "Bamboo Cutlery Travel Set",
      category: "Reusable Kitchen",
      price: 1399,
      originalPrice: null,
      description: "Ditch disposable utensils with this elegant bamboo cutlery set. Includes fork, knife, spoon, chopsticks, and a straw with cleaner — all nestled in a roll-up organic cotton pouch. Lightweight, durable, and naturally antimicrobial. Perfect for work lunches, picnics, and travel.",
      rating: 4.6,
      reviews: 218,
      badges: ["new"],
      ecoTags: ["🎋 Bamboo", "🌍 Zero Waste", "🌱 Plant-Based"],
      image: "bamboo-cutlery.jpg",
      inStock: true
    },
    {
      id: 3,
      name: "Reusable Produce Bags (6-Pack)",
      category: "Reusable Kitchen",
      price: 1199,
      originalPrice: 1699,
      description: "Say goodbye to plastic produce bags. These mesh bags are made from 100% organic cotton with a tare weight tag for easy checkout. Set of 6 in varying sizes perfect for fruits, vegetables, bulk goods, and more. Machine washable and incredibly durable.",
      rating: 4.7,
      reviews: 156,
      badges: ["sale"],
      ecoTags: ["🌿 Organic Cotton", "♻️ Reusable", "🌍 Zero Waste"],
      image: "produce-bags.jpg",
      inStock: true
    },

    // Personal Care
    {
      id: 4,
      name: "Bamboo Toothbrush Pack (4)",
      category: "Personal Care",
      price: 999,
      originalPrice: null,
      description: "Switch to a sustainable smile with these charcoal-infused bamboo toothbrushes. Ergonomic handles made from Moso bamboo (the fastest growing plant on earth), with BPA-free nylon bristles. Each brush is color-coded for family use. Biodegradable handles can be composted.",
      rating: 4.5,
      reviews: 489,
      badges: ["bestseller"],
      ecoTags: ["🎋 Bamboo", "💚 BPA-Free", "🌍 Biodegradable"],
      image: "bamboo-toothbrush.jpg",
      inStock: true
    },
    {
      id: 5,
      name: "Lavender Shampoo Bar",
      category: "Personal Care",
      price: 1099,
      originalPrice: null,
      description: "One bar replaces 2-3 bottles of liquid shampoo. Handcrafted with organic lavender essential oil, coconut oil, and shea butter. Sulfate-free, paraben-free, and packaged in compostable paper. Suitable for all hair types. Lasts 60-80 washes.",
      rating: 4.9,
      reviews: 267,
      badges: ["bestseller"],
      ecoTags: ["🌸 Organic", "🧴 Plastic-Free", "🐰 Cruelty-Free"],
      image: "shampoo-bar.jpg",
      inStock: true
    },
    {
      id: 6,
      name: "Natural Charcoal Deodorant",
      category: "Personal Care",
      price: 949,
      originalPrice: 1299,
      description: "Stay fresh naturally with this activated charcoal deodorant stick. Formulated with coconut oil, shea butter, and baking soda for 24-hour odor protection. Free from aluminum, parabens, and synthetic fragrances. Packaged in a compostable cardboard tube.",
      rating: 4.4,
      reviews: 194,
      badges: ["sale"],
      ecoTags: ["🌿 Natural", "🧴 Plastic-Free", "🐰 Cruelty-Free"],
      image: "natural-deodorant.jpg",
      inStock: true
    },

    // Home & Living
    {
      id: 7,
      name: "Hand-Poured Soy Candle",
      category: "Home & Living",
      price: 2399,
      originalPrice: null,
      description: "Create cozy ambiance with this hand-poured soy wax candle. Scented with pure essential oils (choose from Cedarwood, Vanilla, or Eucalyptus). 60+ hour burn time in a reusable amber glass jar. Lead-free cotton wick for a clean, even burn.",
      rating: 4.8,
      reviews: 321,
      badges: ["new"],
      ecoTags: ["🕯️ Soy Wax", "🌿 Essential Oils", "♻️ Reusable Jar"],
      image: "soy-candle.jpg",
      inStock: true
    },
    {
      id: 8,
      name: "Organic Cotton Bath Towel Set",
      category: "Home & Living",
      price: 3999,
      originalPrice: 5299,
      description: "Wrap yourself in luxury with these GOTS-certified organic cotton towels. Set includes 2 bath towels and 2 hand towels in natural undyed cotton. 700 GSM weight provides exceptional softness and absorbency. Low-impact dye process, fair-trade certified.",
      rating: 4.7,
      reviews: 183,
      badges: ["sale"],
      ecoTags: ["🌿 Organic Cotton", "🏷️ Fair Trade", "🌍 GOTS Certified"],
      image: "organic-towels.jpg",
      inStock: true
    },
    {
      id: 9,
      name: "Recycled Glass Tumbler Set",
      category: "Home & Living",
      price: 2699,
      originalPrice: null,
      description: "Beautiful tumblers handcrafted from 100% post-consumer recycled glass. Set of 4 in ocean-inspired hues. Each piece is unique with slight variations that showcase the artisanal process. Dishwasher safe, 12 oz capacity. Supports glass recycling initiatives.",
      rating: 4.6,
      reviews: 128,
      badges: ["eco"],
      ecoTags: ["♻️ Recycled Glass", "🎨 Handcrafted", "🌊 Ocean-Inspired"],
      image: "recycled-glassware.jpg",
      inStock: true
    },

    // Fashion
    {
      id: 10,
      name: "Organic Cotton Essential Tee",
      category: "Fashion",
      price: 2849,
      originalPrice: null,
      description: "The perfect everyday tee made from 100% GOTS-certified organic cotton. Pre-shrunk, garment-dyed using low-impact dyes. Relaxed fit with reinforced stitching for durability. Available in Earth, Sage, Cloud, and Charcoal. Carbon-neutral shipping included.",
      rating: 4.7,
      reviews: 412,
      badges: ["bestseller"],
      ecoTags: ["🌿 Organic Cotton", "🏷️ Fair Trade", "🌍 Carbon Neutral"],
      image: "organic-tee.jpg",
      inStock: true
    },
    {
      id: 11,
      name: "Hemp Canvas Backpack",
      category: "Fashion",
      price: 6499,
      originalPrice: 8199,
      description: "Adventure awaits with this rugged hemp canvas backpack. Water-resistant, naturally antimicrobial, and incredibly strong. Features padded laptop sleeve, multiple pockets, and adjustable straps. Hemp requires 50% less water to grow than cotton and enriches the soil.",
      rating: 4.8,
      reviews: 197,
      badges: ["sale"],
      ecoTags: ["🌿 Hemp", "💧 Water-Resistant", "🌱 Soil-Enriching"],
      image: "hemp-backpack.jpg",
      inStock: true
    },
    {
      id: 12,
      name: "Recycled Ocean Sneakers",
      category: "Fashion",
      price: 7399,
      originalPrice: null,
      description: "Walk lighter on the planet with these sleek sneakers made from recycled ocean plastics. Each pair removes 11 plastic bottles from coastal waters. Algae-based midsole, natural rubber outsole, and organic cotton laces. Comfortable, breathable, and stylish.",
      rating: 4.9,
      reviews: 356,
      badges: ["new", "eco"],
      ecoTags: ["🌊 Ocean Plastic", "♻️ Recycled", "🌿 Algae-Based"],
      image: "recycled-sneakers.jpg",
      inStock: true
    }
  ],

  // ---- Categories ----
  categories: [
    { name: "Reusable Kitchen", icon: "🍃", count: 3 },
    { name: "Personal Care", icon: "🧴", count: 3 },
    { name: "Home & Living", icon: "🏡", count: 3 },
    { name: "Fashion", icon: "👕", count: 3 }
  ],

  // ---- Cart ----
  cart: [],

  initCart() {
    const saved = localStorage.getItem('ecohaven_cart');
    if (saved) {
      try { this.cart = JSON.parse(saved); } catch { this.cart = []; }
    }
    this.emitCartChange();
  },

  saveCart() {
    localStorage.setItem('ecohaven_cart', JSON.stringify(this.cart));
    this.emitCartChange();
  },

  addToCart(productId, qty = 1) {
    const product = this.products.find(p => p.id === productId);
    if (!product) return;

    const existing = this.cart.find(item => item.id === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      this.cart.push({ id: productId, qty });
    }
    this.saveCart();
    showToast(`${product.name} added to cart!`, 'success');
  },

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCart();
  },

  updateQty(productId, qty) {
    if (qty <= 0) {
      this.removeFromCart(productId);
      return;
    }
    const item = this.cart.find(item => item.id === productId);
    if (item) {
      item.qty = qty;
      this.saveCart();
    }
  },

  clearCart() {
    this.cart = [];
    this.saveCart();
  },

  getCartItems() {
    return this.cart.map(item => {
      const product = this.products.find(p => p.id === item.id);
      return { ...product, qty: item.qty };
    }).filter(Boolean);
  },

  getCartCount() {
    return this.cart.reduce((sum, item) => sum + item.qty, 0);
  },

  getCartSubtotal() {
    return this.getCartItems().reduce((sum, item) => sum + (item.price * item.qty), 0);
  },

  getShipping() {
    return this.getCartSubtotal() >= 2000 ? 0 : 99;
  },

  getCartTotal() {
    return this.getCartSubtotal() + this.getShipping();
  },

  // ---- Product Queries ----
  getProduct(id) {
    return this.products.find(p => p.id === id);
  },

  getProductsByCategory(category) {
    if (!category || category === 'All') return this.products;
    return this.products.filter(p => p.category === category);
  },

  searchProducts(query) {
    const q = query.toLowerCase();
    return this.products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  },

  sortProducts(products, sortBy) {
    const sorted = [...products];
    switch (sortBy) {
      case 'price-low': return sorted.sort((a, b) => a.price - b.price);
      case 'price-high': return sorted.sort((a, b) => b.price - a.price);
      case 'rating': return sorted.sort((a, b) => b.rating - a.rating);
      case 'name': return sorted.sort((a, b) => a.name.localeCompare(b.name));
      default: return sorted;
    }
  },

  getRelatedProducts(productId, limit = 4) {
    const product = this.getProduct(productId);
    if (!product) return [];
    return this.products
      .filter(p => p.id !== productId && p.category === product.category)
      .concat(this.products.filter(p => p.id !== productId && p.category !== product.category))
      .slice(0, limit);
  },

  getFeaturedProducts(limit = 4) {
    return this.products.filter(p => p.badges.includes('bestseller')).slice(0, limit);
  },

  // ---- Order Management ----
  saveOrder(orderData) {
    // Associate with logged-in user
    const user = UserDB.getCurrentUser();
    if (user) orderData.userId = user.id;
    const orders = this.getAllOrders();
    orders.unshift(orderData); // newest first
    localStorage.setItem('ecohaven_orders', JSON.stringify(orders));
    return orderData;
  },

  getAllOrders() {
    try {
      return JSON.parse(localStorage.getItem('ecohaven_orders') || '[]');
    } catch { return []; }
  },

  getOrdersForUser(userId) {
    return this.getAllOrders().filter(o => o.userId === userId);
  },

  getOrder(orderId) {
    return this.getAllOrders().find(o => o.id === orderId) || null;
  },

  updateOrder(orderId, updates) {
    const orders = this.getAllOrders();
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx !== -1) {
      Object.assign(orders[idx], updates);
      localStorage.setItem('ecohaven_orders', JSON.stringify(orders));
    }
  },

  updateOrderStatus(orderId, statusIndex) {
    const orders = this.getAllOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.currentStatus = statusIndex;
      order.statusHistory[statusIndex].completedAt = new Date().toISOString();
      localStorage.setItem('ecohaven_orders', JSON.stringify(orders));
    }
  },

  // ---- Event System ----
  _listeners: [],

  onCartChange(fn) {
    this._listeners.push(fn);
  },

  emitCartChange() {
    this._listeners.forEach(fn => fn(this.getCartCount(), this.getCartTotal()));
  }
};


/* ===== UserDB: Authentication & User Management ===== */

const UserDB = {
  _KEY: 'ecohaven_users',
  _SESSION_KEY: 'ecohaven_current_user',

  _getAll() {
    try { return JSON.parse(localStorage.getItem(this._KEY) || '[]'); }
    catch { return []; }
  },

  _save(users) {
    localStorage.setItem(this._KEY, JSON.stringify(users));
  },

  // Seed default accounts on first load
  seed() {
    const users = this._getAll();
    if (users.length === 0) {
      this._save([
        {
          id: 'USR-ADMIN-001',
          name: 'The Rooted Parcel Admin',
          email: 'admin@therootedparcel.in',
          phone: '9000000001',
          password: 'admin123',
          role: 'admin',
          createdAt: new Date().toISOString(),
          addresses: [{
            label: 'Office',
            address: '42, Green Lane, Koramangala',
            city: 'Bengaluru',
            state: 'Karnataka',
            pin: '560095'
          }]
        },
        {
          id: 'USR-DEMO-001',
          name: 'Rahul Sharma',
          email: 'demo@therootedparcel.in',
          phone: '9876543210',
          password: 'demo123',
          role: 'user',
          createdAt: new Date().toISOString(),
          addresses: [{
            label: 'Home',
            address: '12, MG Road, Indiranagar',
            city: 'Bengaluru',
            state: 'Karnataka',
            pin: '560038'
          }]
        }
      ]);
    }
  },

  register(name, email, phone, password) {
    const users = this._getAll();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'An account with this email already exists.' };
    }
    const user = {
      id: 'USR-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substr(2, 4).toUpperCase(),
      name,
      email: email.toLowerCase(),
      phone,
      password,
      role: 'user',
      createdAt: new Date().toISOString(),
      addresses: []
    };
    users.push(user);
    this._save(users);
    return { success: true, user };
  },

  login(email, password) {
    const users = this._getAll();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) return { success: false, error: 'Invalid email or password.' };
    localStorage.setItem(this._SESSION_KEY, user.id);
    return { success: true, user };
  },

  logout() {
    localStorage.removeItem(this._SESSION_KEY);
  },

  getCurrentUser() {
    const id = localStorage.getItem(this._SESSION_KEY);
    if (!id) return null;
    return this._getAll().find(u => u.id === id) || null;
  },

  isLoggedIn() {
    return !!this.getCurrentUser();
  },

  isAdmin() {
    const user = this.getCurrentUser();
    return user && user.role === 'admin';
  },

  getUser(userId) {
    return this._getAll().find(u => u.id === userId) || null;
  },

  getAllUsers() {
    return this._getAll();
  },

  updateUser(userId, updates) {
    const users = this._getAll();
    const idx = users.findIndex(u => u.id === userId);
    if (idx !== -1) {
      // Don't allow changing role or id
      delete updates.id;
      delete updates.role;
      Object.assign(users[idx], updates);
      this._save(users);
      return { success: true, user: users[idx] };
    }
    return { success: false, error: 'User not found.' };
  },

  getUserCount() {
    return this._getAll().filter(u => u.role === 'user').length;
  }
};


/* ===== ReturnDB: Return & Refund Management ===== */

const ReturnDB = {
  _KEY: 'ecohaven_returns',

  _getAll() {
    try { return JSON.parse(localStorage.getItem(this._KEY) || '[]'); }
    catch { return []; }
  },

  _save(returns) {
    localStorage.setItem(this._KEY, JSON.stringify(returns));
  },

  createReturn(orderId, items, reason, refundMethod, notes) {
    const order = Store.getOrder(orderId);
    if (!order) return { success: false, error: 'Order not found.' };

    const user = UserDB.getCurrentUser();
    const ret = {
      id: 'RET-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substr(2, 4).toUpperCase(),
      orderId,
      userId: user ? user.id : null,
      items,
      reason,
      refundMethod,
      notes: notes || '',
      refundAmount: items.reduce((sum, it) => sum + (it.price * it.qty), 0),
      status: 'requested',     // requested → approved → pickup_scheduled → picked_up → inspected → refunded  |  rejected
      statusHistory: [
        { status: 'requested', label: 'Return Requested', icon: '📋', timestamp: new Date().toISOString(), note: 'Your return request has been submitted.' }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const returns = this._getAll();
    returns.unshift(ret);
    this._save(returns);

    // Mark order as having a return
    Store.updateOrder(orderId, { returnId: ret.id, returnStatus: 'requested' });

    return { success: true, returnRequest: ret };
  },

  getReturn(returnId) {
    return this._getAll().find(r => r.id === returnId) || null;
  },

  getReturnForOrder(orderId) {
    return this._getAll().find(r => r.orderId === orderId) || null;
  },

  getReturnsForUser(userId) {
    return this._getAll().filter(r => r.userId === userId);
  },

  getAllReturns() {
    return this._getAll();
  },

  updateReturnStatus(returnId, newStatus, note) {
    const returns = this._getAll();
    const ret = returns.find(r => r.id === returnId);
    if (!ret) return false;

    const statusLabels = {
      'requested':        { label: 'Return Requested',     icon: '📋' },
      'approved':         { label: 'Return Approved',      icon: '✅' },
      'pickup_scheduled': { label: 'Pickup Scheduled',     icon: '📅' },
      'picked_up':        { label: 'Item Picked Up',       icon: '📦' },
      'inspected':        { label: 'Quality Inspected',    icon: '🔍' },
      'refunded':         { label: 'Refund Processed',     icon: '💰' },
      'rejected':         { label: 'Return Rejected',      icon: '❌' }
    };

    ret.status = newStatus;
    ret.updatedAt = new Date().toISOString();
    ret.statusHistory.push({
      status: newStatus,
      label: statusLabels[newStatus]?.label || newStatus,
      icon: statusLabels[newStatus]?.icon || '📋',
      timestamp: new Date().toISOString(),
      note: note || statusLabels[newStatus]?.label || ''
    });

    this._save(returns);

    // Update order return status too
    Store.updateOrder(ret.orderId, { returnStatus: newStatus });

    return true;
  },

  getReturnCount() {
    return this._getAll().length;
  },

  getPendingCount() {
    return this._getAll().filter(r => r.status === 'requested').length;
  }
};
