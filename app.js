const menus = {
  biryani: [
    ['Special Chicken Biryani', '12kg rice + 12kg chicken, serves 35-40. Fragrant basmati layered with saffron, mint and tender chicken.', 11500, 1],
    ['VIP Beef Biryani', '12kg rice + premium beef. A rich, slow-cooked daawat biryani with deep masala flavour.', 13500, 2],
    ['Chicken Yakhni Pulao', 'Fragrant stock-cooked rice with chicken, whole spices and a clean, warming finish.', 12000, 3],
    ['Mutton Shahi Pulao', 'A royal pulao for special occasions, made with juicy mutton and aromatic stock.', 22000, 4]
  ],
  curry: [
    ['Chicken Qorma', 'Traditional creamy gravy, serves 50. Gentle spices and silky sauce made for festive tables.', 9500, 1],
    ['Beef Qorma', 'Slow-cooked beef in fragrant spices, finished with a generous, luxurious gravy.', 11000, 2],
    ['White Chicken Karahi', 'Creamy live-style karahi deg with black pepper, cream and fresh green chilli.', 10500, 3],
    ['Beef Nalli Nehari', 'Overnight slow-cooked bone marrow stew with warming spices and rich depth.', 14000, 4]
  ],
  bbq: [
    ['Chicken Tikka', 'Smoky charcoal tikka per plate, marinated overnight for juicy, fiery flavour.', 350, 1],
    ['Beef Seekh Kabab', 'Juicy hand-shaped kabab per dozen, seasoned with herbs and traditional BBQ spices.', 1200, 2],
    ['Malai Boti Live Stall', 'Freshly grilled on-site for 50 guests, with tender cream-marinated chicken bites.', 18000, 3]
  ],
  sweets: [
    ['Shahi Zafrani Kheer', 'Saffron rice pudding, serves 50. Slow simmered with cardamom, milk and fragrant saffron.', 5500, 1],
    ['Gajar Halwa', 'Special carrot halwa with khoya, nuts and the warm sweetness of winter spices.', 7000, 2],
    ['Lab-e-Shireen', 'Cool creamy vermicelli dessert layered with fruit, jelly and a celebratory finish.', 6000, 3]
  ],
  naan: [
    ['Tandoori Naan', 'Fresh from the tandoor, 100 pieces. Soft inside with a lightly charred, smoky edge.', 2000, 1],
    ['Roghni Naan', 'Sesame-topped soft naan, 100 pieces, brushed with butter for a rich finish.', 5000, 2],
    ['Taftan / Sheermal', 'Celebration breads, 100 pieces, gently sweet and perfect with qorma or kebabs.', 7000, 3]
  ],
  packages: [
    ['Shadi Package A', 'Chicken biryani, qorma, kheer and naan for 100 guests. A generous classic wedding spread.', 45000, 1],
    ['VIP Valima Package', 'Beef pulao, white karahi, BBQ and Lab-e-Shireen for 200 guests. A polished premium menu.', 110000, 2]
  ]
};

let cart = JSON.parse(localStorage.getItem('tph-cart') || '[]');

const money = value => `Rs. ${value.toLocaleString('en-PK')}`;

function saveCart() {
  localStorage.setItem('tph-cart', JSON.stringify(cart));
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
  });
}

function addToInvoice(name, price) {
  const item = cart.find(entry => entry.name === name);
  if (item) {
    item.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  saveCart();
  // Optional: Alert or small feedback UI instead of hard redirect
  window.location.href = 'invoice.html';
}

function updateQty(index, qty) {
  const parsedQty = parseInt(qty, 10);
  if (isNaN(parsedQty) || parsedQty < 1) {
    cart.splice(index, 1);
  } else {
    cart[index].qty = parsedQty;
  }
  saveCart();
  renderInvoice();
}

function getPageImages() {
  return [...document.querySelectorAll('[data-page-images] img')];
}

function renderHero(category) {
  const intro = document.querySelector('.page-intro');
  const image = getPageImages()[0];
  if (!intro || !image) return;

  const figure = document.createElement('figure');
  figure.className = 'page-intro-image';
  figure.innerHTML = `<img src="${image.src}" alt="${image.alt}"><figcaption>${image.dataset.caption || image.alt}</figcaption>`;
  intro.appendChild(figure);
}

function renderGallery(category) {
  const main = document.querySelector('main');
  const images = getPageImages();
  // Fixed logic: Start gallery from 2nd image onwards safely
  const gallery = images.length > 1 ? images.slice(1) : [];
  if (!main || !gallery.length) return;

  const section = document.createElement('section');
  section.className = 'image-gallery page-width';
  section.innerHTML = `
    <div class="section-heading">
      <div>
        <p class="eyebrow">Made for your table</p>
        <h2>More from our kitchen</h2>
      </div>
      <p class="gallery-intro">Every image tells a little story about the food, care and hospitality behind your daawat.</p>
    </div>
    <div class="gallery-grid">
      ${gallery.map(item => `
        <article class="gallery-card">
          <img src="${item.src}" alt="${item.alt}">
          <div>
            <h3>${item.alt}</h3>
            <p>${item.dataset.description || 'Prepared fresh with care for your daawat.'}</p>
          </div>
        </article>
      `).join('')}
    </div>
  `;
  main.appendChild(section);
}

function renderMenu(category) {
  const container = document.querySelector('[data-menu]');
  if (!container || !menus[category]) return;
  const menuImages = getPageImages();

  container.innerHTML = menus[category].map((item, idx) => `
    <article class="menu-card">
      <img class="menu-card-image" src="${menuImages[idx + 1]?.src || menuImages[0]?.src || ''}" alt="${item[0]}">
      <div class="menu-card-body">
        <div>
          <h3>${item[0]}</h3>
          <p>${item[1]}</p>
        </div>
        <div>
          <span class="price">${money(item[2])}</span>
          <button class="add-button" data-name="${encodeURIComponent(item[0])}" data-price="${item[2]}">Add to invoice +</button>
        </div>
      </div>
    </article>
  `).join('');

  container.querySelectorAll('.add-button').forEach(button => {
    button.addEventListener('click', () => {
      const name = decodeURIComponent(button.dataset.name);
      const price = Number(button.dataset.price);
      addToInvoice(name, price);
    });
  });
}

function renderInvoice() {
  const body = document.querySelector('#invoice-rows');
  if (!body) return;

  let subtotal = 0;
  body.innerHTML = '';

  if (cart.length === 0) {
    body.innerHTML = '<tr><td colspan="5" class="empty-state">Your invoice is empty. Add something delicious from the menu.</td></tr>';
  } else {
    cart.forEach((item, index) => {
      const total = item.price * item.qty;
      subtotal += total;

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.name}</td>
        <td><input class="qty-input" type="number" min="1" value="${item.qty}"></td>
        <td>${money(item.price)}</td>
        <td>${money(total)}</td>
        <td><button class="remove-button">Remove</button></td>
      `;

      // Event listeners for clean & safe event handling
      row.querySelector('.qty-input').addEventListener('change', (e) => {
        updateQty(index, e.target.value);
      });

      row.querySelector('.remove-button').addEventListener('click', () => {
        updateQty(index, 0);
      });

      body.appendChild(row);
    });
  }

  const delivery = subtotal ? 1000 : 0;
  const subtotalEl = document.querySelector('#subtotal');
  const deliveryEl = document.querySelector('#delivery');
  const grandTotalEl = document.querySelector('#grandtotal');
  const dateEl = document.querySelector('#inv-date');

  if (subtotalEl) subtotalEl.textContent = money(subtotal);
  if (deliveryEl) deliveryEl.textContent = money(delivery);
  if (grandTotalEl) grandTotalEl.textContent = money(subtotal + delivery);
  if (dateEl) dateEl.textContent = new Date().toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' });
}

function calculateDegs() {
  const guests = Number(document.querySelector('#guestCount')?.value || 0);
  const result = document.querySelector('#calcResult');
  if (result) {
    result.textContent = guests > 0 
      ? `For ${guests} guests, plan approximately ${Math.ceil(guests / 38)} deg(s) of biryani or pulao.` 
      : 'Enter your guest count to get an estimate.';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const category = document.body.dataset.category;
  if (category) {
    renderHero(category);
    renderMenu(category);
    renderGallery(category);
  }
  renderInvoice();
  saveCart();
  document.querySelector('#guestCount')?.addEventListener('input', calculateDegs);
});