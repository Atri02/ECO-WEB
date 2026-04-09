/* ===== Footer Component ===== */

function renderFooter() {
  return `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a class="logo" onclick="navigateTo('/')">
            <span class="logo-icon">🌿</span>
            <span class="logo-text"><span>The Rooted</span> Parcel</span>
          </a>
          <p class="footer-desc">Curating sustainable products for conscious living. Every purchase supports a healthier planet and ethical producers worldwide.</p>
        </div>

        <div class="footer-col">
          <h4>Shop</h4>
          <a onclick="navigateTo('/shop?category=Reusable Kitchen')">Reusable Kitchen</a>
          <a onclick="navigateTo('/shop?category=Personal Care')">Personal Care</a>
          <a onclick="navigateTo('/shop?category=Home %26 Living')">Home & Living</a>
          <a onclick="navigateTo('/shop?category=Fashion')">Fashion</a>
        </div>

        <div class="footer-col">
          <h4>Support</h4>
          <a onclick="navigateTo('/contact')">Contact Us</a>
          <a onclick="navigateTo('/shipping')">Shipping Info</a>
          <a onclick="navigateTo('/returns')">Returns & Refunds</a>
          <a onclick="navigateTo('/faq')">FAQ</a>
        </div>

        <div class="footer-col">
          <h4>Account</h4>
          <a onclick="navigateTo('/login')">Log In / Register</a>
          <a onclick="navigateTo('/orders')">Track My Order</a>
          <a onclick="navigateTo('/about')">About Us</a>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} The Rooted Parcel. All rights reserved.</p>
        <div class="footer-badges">
          <span class="footer-badge">🌱 Carbon Neutral</span>
          <span class="footer-badge">📦 Eco Packaging</span>
          <span class="footer-badge">🤝 Fair Trade</span>
        </div>
      </div>
    </div>
  </footer>`;
}
