document.addEventListener('DOMContentLoaded', () => {
  // Create and insert header safely at the top of the body
  const header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML = `
    <div class="topbar page-width">
      <a class="brand" href="index.html">
        <span class="brand-mark">TPH</span>
        <span>Tanweer <b>Pakwan House</b></span>
      </a>
      <a class="phone-link" href="tel:+923001234567">Call +92 300 1234567</a>
    </div>
    <nav class="navigation">
      <div class="page-width nav-inner">
        <a class="nav-link" href="index.html">Home</a>
        <a class="nav-link" href="biryani.html">Biryani & Pulao</a>
        <a class="nav-link" href="curry.html">Korma & Karahi</a>
        <a class="nav-link" href="bbq.html">BBQ Specials</a>
        <a class="nav-link" href="sweets.html">Sweets</a>
        <a class="nav-link" href="naan.html">Naan & Tandoor</a>
        <a class="nav-link" href="packages.html">Packages</a>
        <a class="nav-link" href="calculator.html">Deg Calculator</a>
        <a class="nav-link nav-order" href="invoice.html">Order Invoice <span class="cart-count">0</span></a>
        <a class="nav-link" href="about.html">About</a>
        <a class="nav-link" href="contact.html">Contact</a>
      </div>
    </nav>
  `;
  document.body.prepend(header);

  // Set active link highlight based on URL path
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  header.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // Sync initial cart counter value from localStorage
  const cart = JSON.parse(localStorage.getItem('tph-cart') || '[]');
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  header.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = cartCount;
  });
});