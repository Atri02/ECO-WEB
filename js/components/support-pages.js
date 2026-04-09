/* ===== Support Pages — Contact, Shipping, Returns, FAQ ===== */

// ── CONTACT US PAGE ──────────────────────────────────────────
function renderContactPage() {
  return `
  <div class="page-view support-page contact-page">
    <div class="container">

      <!-- Hero -->
      <div class="support-hero">
        <span class="section-label">📬 Get in Touch</span>
        <h1 class="support-hero-title">Contact <span class="text-gradient">Us</span></h1>
        <p class="support-hero-desc">Have a question, suggestion, or just want to say hello? We'd love to hear from you. Our team typically responds within 24 hours.</p>
      </div>

      <div class="contact-grid">

        <!-- Contact Form -->
        <div class="contact-form-card">
          <h2 class="support-card-title">Send Us a Message</h2>
          <form class="contact-form" onsubmit="event.preventDefault(); showToast('Message sent successfully! We\\'ll get back to you within 24 hours. 💚', 'success'); this.reset();">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="contact-name">Your Name *</label>
                <input type="text" class="form-input" id="contact-name" placeholder="Rahul Sharma" required>
              </div>
              <div class="form-group">
                <label class="form-label" for="contact-email">Email Address *</label>
                <input type="email" class="form-input" id="contact-email" placeholder="rahul@example.com" required>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label" for="contact-subject">Subject *</label>
              <select class="form-input sort-select" id="contact-subject" required style="padding-right:2.5rem;">
                <option value="">Select a topic</option>
                <option>Order Inquiry</option>
                <option>Product Question</option>
                <option>Shipping & Delivery</option>
                <option>Returns & Refunds</option>
                <option>Partnership / Collaboration</option>
                <option>Feedback / Suggestion</option>
                <option>Other</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" for="contact-order">Order Number (optional)</label>
              <input type="text" class="form-input" id="contact-order" placeholder="ECO-XXXXXXXX">
            </div>
            <div class="form-group">
              <label class="form-label" for="contact-message">Message *</label>
              <textarea class="form-input" id="contact-message" rows="5" placeholder="Tell us how we can help…" required style="resize:vertical;"></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-lg" style="width:100%;">Send Message →</button>
          </form>
        </div>

        <!-- Contact Info Cards -->
        <div class="contact-info-col">

          <div class="contact-info-card">
            <span class="contact-info-icon">📧</span>
            <h3>Email Us</h3>
            <p>For general queries and support</p>
            <a href="mailto:support@therootedparcel.in" class="contact-link">support@therootedparcel.in</a>
            <p class="contact-note">We reply within 24 hours on business days.</p>
          </div>

          <div class="contact-info-card">
            <span class="contact-info-icon">📞</span>
            <h3>Call Us</h3>
            <p>Speak directly with our support team</p>
            <a href="tel:+911800123456" class="contact-link">1800-123-456 (Toll Free)</a>
            <p class="contact-note">Mon – Sat, 9:00 AM – 7:00 PM IST</p>
          </div>

          <div class="contact-info-card">
            <span class="contact-info-icon">💬</span>
            <h3>Live Chat</h3>
            <p>Quick answers in real-time</p>
            <span class="contact-link">Available on our app & website</span>
            <p class="contact-note">Mon – Fri, 10:00 AM – 6:00 PM IST</p>
          </div>

          <div class="contact-info-card">
            <span class="contact-info-icon">📍</span>
            <h3>Visit Us</h3>
            <p>Our office address</p>
            <span class="contact-link">The Rooted Parcel Pvt. Ltd.</span>
            <p class="contact-note">42, Green Lane, Koramangala,<br>Bengaluru, Karnataka 560095, India</p>
          </div>

        </div>
      </div>

    </div>
  </div>`;
}


// ── SHIPPING INFO PAGE ───────────────────────────────────────
function renderShippingPage() {
  return `
  <div class="page-view support-page shipping-page">
    <div class="container">

      <div class="support-hero">
        <span class="section-label">🚚 Delivery</span>
        <h1 class="support-hero-title">Shipping <span class="text-gradient">Information</span></h1>
        <p class="support-hero-desc">We ship across India with eco-friendly packaging. Every shipment is carbon-neutral thanks to our partnership with reforestation projects.</p>
      </div>

      <!-- Highlight Bar -->
      <div class="shipping-highlights">
        <div class="shipping-highlight-item">
          <span class="sh-icon">🆓</span>
          <div>
            <strong>Free Shipping</strong>
            <span>On orders above ₹2,000</span>
          </div>
        </div>
        <div class="shipping-highlight-item">
          <span class="sh-icon">🌱</span>
          <div>
            <strong>Carbon Neutral</strong>
            <span>Every shipment offset</span>
          </div>
        </div>
        <div class="shipping-highlight-item">
          <span class="sh-icon">📦</span>
          <div>
            <strong>Eco Packaging</strong>
            <span>100% plastic-free</span>
          </div>
        </div>
        <div class="shipping-highlight-item">
          <span class="sh-icon">🔒</span>
          <div>
            <strong>Secure Handling</strong>
            <span>Insured transit</span>
          </div>
        </div>
      </div>

      <!-- Delivery Zones -->
      <div class="support-section">
        <h2 class="support-section-title">Delivery Zones & Timelines</h2>
        <div class="support-table-wrapper">
          <table class="support-table">
            <thead>
              <tr>
                <th>Zone</th>
                <th>Regions Covered</th>
                <th>Standard Delivery</th>
                <th>Express Delivery</th>
                <th>Shipping Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span class="zone-badge zone-a">Zone A</span></td>
                <td>Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Pune, Kolkata</td>
                <td>2 – 4 business days</td>
                <td>1 – 2 business days</td>
                <td>₹49 / Free above ₹2,000</td>
              </tr>
              <tr>
                <td><span class="zone-badge zone-b">Zone B</span></td>
                <td>Jaipur, Ahmedabad, Lucknow, Chandigarh, Kochi, Indore, Bhopal, Nagpur</td>
                <td>3 – 5 business days</td>
                <td>2 – 3 business days</td>
                <td>₹69 / Free above ₹2,000</td>
              </tr>
              <tr>
                <td><span class="zone-badge zone-c">Zone C</span></td>
                <td>Tier-2 & Tier-3 cities, semi-urban areas</td>
                <td>5 – 7 business days</td>
                <td>3 – 5 business days</td>
                <td>₹99 / Free above ₹2,000</td>
              </tr>
              <tr>
                <td><span class="zone-badge zone-d">Zone D</span></td>
                <td>North-East India, Jammu & Kashmir, Ladakh, Andaman & Nicobar, Lakshadweep</td>
                <td>7 – 10 business days</td>
                <td>5 – 7 business days</td>
                <td>₹149 / Free above ₹3,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Additional Info Cards -->
      <div class="shipping-info-grid">

        <div class="support-info-card">
          <span class="support-info-icon">📋</span>
          <h3>Order Processing</h3>
          <p>Orders placed before <strong>2:00 PM IST</strong> on business days are processed the same day. Orders placed after 2 PM or on weekends/holidays are processed the next business day.</p>
        </div>

        <div class="support-info-card">
          <span class="support-info-icon">📱</span>
          <h3>Order Tracking</h3>
          <p>Once shipped, you'll receive an email and SMS with your tracking number. You can also track your order anytime from the <a onclick="navigateTo('/orders')" style="color:var(--color-primary-600);cursor:pointer;font-weight:600;">My Orders</a> page.</p>
        </div>

        <div class="support-info-card">
          <span class="support-info-icon">🏢</span>
          <h3>Delivery Partners</h3>
          <p>We work with trusted partners including Delhivery, Blue Dart, and India Post to ensure your orders reach you safely and sustainably.</p>
        </div>

        <div class="support-info-card">
          <span class="support-info-icon">⚠️</span>
          <h3>Shipping Restrictions</h3>
          <p>Certain items (liquids, aerosols, fragile goods) may have additional packaging requirements and slightly longer processing times. We currently ship only within India.</p>
        </div>

        <div class="support-info-card">
          <span class="support-info-icon">🎁</span>
          <h3>Gift Orders</h3>
          <p>Want to send a gift? Add a personalized message at checkout, and we'll include a handwritten note on recycled paper — no invoice included in gift orders.</p>
        </div>

        <div class="support-info-card">
          <span class="support-info-icon">🔄</span>
          <h3>Failed Delivery</h3>
          <p>If delivery fails after 3 attempts, the package will be returned to our warehouse. We'll notify you and reship for free or issue a full refund — your choice.</p>
        </div>
      </div>

      <div class="support-cta">
        <p>Still have questions about shipping? <a onclick="navigateTo('/contact')" style="cursor:pointer;">Contact our support team →</a></p>
      </div>

    </div>
  </div>`;
}


// ── RETURNS & REFUNDS PAGE ───────────────────────────────────
function renderReturnsPage() {
  return `
  <div class="page-view support-page returns-page">
    <div class="container">

      <div class="support-hero">
        <span class="section-label">🔄 Easy Returns</span>
        <h1 class="support-hero-title">Returns & <span class="text-gradient">Refunds</span></h1>
        <p class="support-hero-desc">Not happy with your purchase? No worries! We offer a hassle-free 30-day return policy on all products.</p>
      </div>

      <!-- Policy Highlights -->
      <div class="shipping-highlights">
        <div class="shipping-highlight-item">
          <span class="sh-icon">📅</span>
          <div>
            <strong>30-Day Window</strong>
            <span>From date of delivery</span>
          </div>
        </div>
        <div class="shipping-highlight-item">
          <span class="sh-icon">🆓</span>
          <div>
            <strong>Free Return Pickup</strong>
            <span>We collect from your door</span>
          </div>
        </div>
        <div class="shipping-highlight-item">
          <span class="sh-icon">💰</span>
          <div>
            <strong>Full Refund</strong>
            <span>Within 5–7 business days</span>
          </div>
        </div>
        <div class="shipping-highlight-item">
          <span class="sh-icon">🔁</span>
          <div>
            <strong>Easy Exchange</strong>
            <span>Swap for another product</span>
          </div>
        </div>
      </div>

      <!-- Return Process Steps -->
      <div class="support-section">
        <h2 class="support-section-title">How Returns Work</h2>
        <div class="return-steps">
          <div class="return-step">
            <span class="return-step-num">1</span>
            <div class="return-step-content">
              <h3>Initiate Your Return</h3>
              <p>Go to <a onclick="navigateTo('/orders')" style="color:var(--color-primary-600);cursor:pointer;font-weight:600;">My Orders</a>, select the order, and click "Request Return". Choose whether you'd like a refund or exchange.</p>
            </div>
          </div>
          <div class="return-step">
            <span class="return-step-num">2</span>
            <div class="return-step-content">
              <h3>Pack the Item</h3>
              <p>Place the product in its original packaging (if available) or any secure packaging. Include all accessories, tags, and the invoice. No need to print a label — our partner will handle it.</p>
            </div>
          </div>
          <div class="return-step">
            <span class="return-step-num">3</span>
            <div class="return-step-content">
              <h3>Schedule Pickup</h3>
              <p>Choose a convenient date and time slot for our delivery partner to pick up the item from your address. You'll receive a confirmation SMS and email.</p>
            </div>
          </div>
          <div class="return-step">
            <span class="return-step-num">4</span>
            <div class="return-step-content">
              <h3>Quality Check</h3>
              <p>Once we receive the item at our warehouse, our team inspects it within 48 hours. Products must be unused and in resalable condition.</p>
            </div>
          </div>
          <div class="return-step">
            <span class="return-step-num">5</span>
            <div class="return-step-content">
              <h3>Refund Processed</h3>
              <p>After approval, your refund is initiated immediately. UPI/wallet refunds arrive within 24 hours; card/net banking refoffs take 5–7 business days depending on your bank.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Refund Methods -->
      <div class="support-section">
        <h2 class="support-section-title">Refund Methods & Timelines</h2>
        <div class="support-table-wrapper">
          <table class="support-table">
            <thead>
              <tr>
                <th>Original Payment Method</th>
                <th>Refund Method</th>
                <th>Timeline</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>UPI (GPay, PhonePe, Paytm)</td><td>Back to UPI ID</td><td>24 – 48 hours</td></tr>
              <tr><td>Credit / Debit Card</td><td>Back to card</td><td>5 – 7 business days</td></tr>
              <tr><td>Net Banking</td><td>Back to bank account</td><td>5 – 7 business days</td></tr>
              <tr><td>Wallet (Paytm / Amazon Pay)</td><td>Back to wallet</td><td>24 – 48 hours</td></tr>
              <tr><td>Cash on Delivery</td><td>Bank transfer (NEFT)</td><td>5 – 7 business days</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Non-Returnable -->
      <div class="support-section">
        <h2 class="support-section-title">Non-Returnable Items</h2>
        <div class="non-return-grid">
          <div class="non-return-item">
            <span>🧴</span>
            <p><strong>Personal care products</strong> that have been opened or used (for hygiene reasons)</p>
          </div>
          <div class="non-return-item">
            <span>🎁</span>
            <p><strong>Gift cards</strong> and store credits are non-refundable</p>
          </div>
          <div class="non-return-item">
            <span>🏷️</span>
            <p><strong>Items on final sale</strong> marked as "Non-returnable" on the product page</p>
          </div>
          <div class="non-return-item">
            <span>📦</span>
            <p><strong>Damaged by misuse</strong> — items damaged after delivery due to mishandling</p>
          </div>
        </div>
      </div>

      <div class="support-cta">
        <p>Need help with a return? <a onclick="navigateTo('/contact')" style="cursor:pointer;">Contact our support team →</a></p>
      </div>

    </div>
  </div>`;
}


// ── FAQ PAGE ─────────────────────────────────────────────────
function renderFAQPage() {
  const faqSections = [
    {
      title: '🛒 Orders & Shopping',
      items: [
        {
          q: 'How do I place an order?',
          a: 'Browse our products, add items to your cart, and proceed to checkout. You can pay via UPI, credit/debit card, net banking, or choose Cash on Delivery. Once your order is confirmed, you\'ll receive an email and SMS with your order details.'
        },
        {
          q: 'Can I modify or cancel my order after placing it?',
          a: 'You can cancel your order within 1 hour of placing it by visiting <strong>My Orders</strong> and clicking "Cancel". After 1 hour, if the order hasn\'t been shipped yet, please contact our support team and we\'ll do our best to help. Once shipped, cancellation is not possible — but you can still return the item after delivery.'
        },
        {
          q: 'Do you offer gift wrapping?',
          a: 'Yes! During checkout, you can opt for eco-friendly gift wrapping made from recycled kraft paper and twine. You can also add a personalized handwritten note at no extra cost.'
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept UPI (GPay, PhonePe, Paytm), all major credit and debit cards (Visa, Mastercard, RuPay, Amex), Net Banking with 50+ banks, mobile wallets, and Cash on Delivery. All online payments are secured through Razorpay with 256-bit SSL encryption.'
        },
      ]
    },
    {
      title: '🚚 Shipping & Delivery',
      items: [
        {
          q: 'How long does delivery take?',
          a: 'Delivery times depend on your location: <strong>Metro cities</strong> (2–4 business days), <strong>Tier-2 cities</strong> (3–5 days), <strong>Other areas</strong> (5–7 days), and <strong>Remote regions</strong> (7–10 days). Express delivery is available for faster service. Visit our <a onclick="navigateTo(\'/shipping\')" style="color:var(--color-primary-600);cursor:pointer;font-weight:600;">Shipping Info</a> page for full details.'
        },
        {
          q: 'Is shipping free?',
          a: 'Yes! Standard shipping is free on all orders above ₹2,000. For orders below ₹2,000, a small shipping fee of ₹49–₹149 applies depending on your location. For remote regions (North-East, J&K, islands), free shipping threshold is ₹3,000.'
        },
        {
          q: 'How can I track my order?',
          a: 'Once your order is shipped, you\'ll receive an email and SMS with your tracking number and link. You can also go to <a onclick="navigateTo(\'/orders\')" style="color:var(--color-primary-600);cursor:pointer;font-weight:600;">My Orders</a> to view real-time tracking status with estimated delivery date.'
        },
        {
          q: 'Do you ship outside India?',
          a: 'Currently, we only ship within India. International shipping is coming soon! Sign up for our newsletter to be the first to know when we launch worldwide delivery.'
        },
      ]
    },
    {
      title: '🔄 Returns & Refunds',
      items: [
        {
          q: 'What is your return policy?',
          a: 'We offer a 30-day return policy from the date of delivery. Items must be unused, in original packaging, and with all tags attached. Personal care products that have been opened cannot be returned for hygiene reasons. See our full <a onclick="navigateTo(\'/returns\')" style="color:var(--color-primary-600);cursor:pointer;font-weight:600;">Returns Policy</a> for details.'
        },
        {
          q: 'How do I return an item?',
          a: 'Go to <strong>My Orders</strong>, select the order, and click "Request Return". Choose a refund or exchange, pack the item, and schedule a free pickup from your doorstep. Our delivery partner will collect it at your chosen time slot.'
        },
        {
          q: 'When will I receive my refund?',
          a: 'After we receive and inspect the returned item (within 48 hours), your refund is initiated. UPI and wallet refunds arrive within 24–48 hours. Card and net banking refunds take 5–7 business days depending on your bank.'
        },
        {
          q: 'Can I exchange an item instead of returning it?',
          a: 'Absolutely! When initiating a return, simply choose "Exchange" and select the product you\'d like instead. If there\'s a price difference, we\'ll charge or refund the difference accordingly.'
        },
      ]
    },
    {
      title: '🌿 Sustainability & Products',
      items: [
        {
          q: 'Are all your products truly sustainable?',
          a: 'Yes. Every product at The Rooted Parcel goes through our rigorous vetting process. We evaluate materials (organic, recycled, renewable), manufacturing practices (fair trade, low carbon), packaging (plastic-free, compostable), and overall lifecycle impact. Products that don\'t meet our standards are never listed.'
        },
        {
          q: 'What packaging do you use for shipping?',
          a: 'All our shipments use 100% plastic-free packaging. We use recycled cardboard boxes, compostable cornstarch mailers, paper tape, and shredded recycled paper for padding. Even our invoices are printed on recycled paper with soy-based inks.'
        },
        {
          q: 'Do you offset your carbon emissions?',
          a: 'Yes. Every shipment is carbon-neutral. We calculate the carbon footprint of each delivery and offset it through verified reforestation and renewable energy projects in India. We\'ve offset over 50 tonnes of CO₂ to date.'
        },
        {
          q: 'How do you choose your suppliers and artisans?',
          a: 'We partner with suppliers who meet strict criteria for environmental impact, fair labor practices, material sourcing, and product quality. Many of our products come from Indian artisans and small businesses committed to traditional, eco-friendly craft methods.'
        },
      ]
    },
    {
      title: '👤 Account & Privacy',
      items: [
        {
          q: 'Do I need an account to shop?',
          a: 'No account is required! You can shop as a guest. However, creating an account lets you track orders, save your address for faster checkout, manage returns, and earn loyalty rewards in the future.'
        },
        {
          q: 'Is my personal information safe?',
          a: 'Absolutely. We use industry-standard encryption and never sell or share your personal data with third parties. Payment processing is handled by Razorpay, a PCI-DSS compliant payment gateway. See our Privacy Policy for complete details.'
        },
        {
          q: 'How do I unsubscribe from marketing emails?',
          a: 'Every marketing email includes an "Unsubscribe" link at the bottom. Click it and you\'ll be removed from our mailing list within 24 hours. Transactional emails (order confirmations, shipping updates) will still be sent.'
        },
      ]
    }
  ];

  return `
  <div class="page-view support-page faq-page">
    <div class="container">

      <div class="support-hero">
        <span class="section-label">❓ Help Center</span>
        <h1 class="support-hero-title">Frequently Asked <span class="text-gradient">Questions</span></h1>
        <p class="support-hero-desc">Find quick answers to common questions about orders, shipping, returns, and more.</p>
      </div>

      <div class="faq-sections">
        ${faqSections.map((section, si) => `
          <div class="faq-section">
            <h2 class="faq-section-title">${section.title}</h2>
            <div class="faq-list">
              ${section.items.map((item, qi) => `
                <div class="faq-item" id="faq-${si}-${qi}">
                  <button class="faq-question" onclick="toggleFAQ('faq-${si}-${qi}')">
                    <span>${item.q}</span>
                    <span class="faq-chevron">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                    </span>
                  </button>
                  <div class="faq-answer">
                    <p>${item.a}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>

      <div class="support-cta">
        <div class="support-cta-card">
          <span style="font-size:2rem;">🤔</span>
          <h3>Didn't find your answer?</h3>
          <p>Our support team is ready to help with any questions not covered here.</p>
          <div style="display:flex;gap:var(--space-3);justify-content:center;flex-wrap:wrap;">
            <a class="btn btn-primary" onclick="navigateTo('/contact')">Contact Support</a>
            <a class="btn btn-secondary" href="mailto:support@therootedparcel.in">Email Us</a>
          </div>
        </div>
      </div>

    </div>
  </div>`;
}

// FAQ accordion toggle
function toggleFAQ(id) {
  const item = document.getElementById(id);
  if (!item) return;
  const isOpen = item.classList.contains('open');
  // Close all others in same section
  const section = item.closest('.faq-list');
  if (section) {
    section.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
  }
  if (!isOpen) {
    item.classList.add('open');
  }
}
