function loadModule(module) {
  const content = document.getElementById('content');

  fetch(`modules/${module}.html`)
    .then(res => res.text())
    .then(html => {
      content.innerHTML = html;

      // CSS específico
      if (module === 'sales/new') {
        loadCSS('assets/css/new.css');
      }
    });
}

function loadCSS(href) {
  if (!document.querySelector(`link[href="${href}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }
}

document.querySelectorAll('.menu-title').forEach(title => {
  title.addEventListener('click', () => {
    const group = title.parentElement;
    group.classList.toggle('open');
  });
});
function newSale() {
  loadModule('sales/new');
}

function backSales() {
  loadModule('sales');
}

