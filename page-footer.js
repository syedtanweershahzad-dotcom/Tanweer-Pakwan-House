document.addEventListener('DOMContentLoaded', () => {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `
    <div class="page-width footer-inner">
      <span>© 2026 Tanweer Pakwan House</span>
      <span>Federal B Area · Nazimabad, Karachi</span>
      <a href="contact.html">Let's plan your daawat →</a>
    </div>
  `;
  document.body.appendChild(footer);
});