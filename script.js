const filterButtons = [...document.querySelectorAll('.filter-button')];
const artCards = [...document.querySelectorAll('.art-card')];
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxTitle = document.querySelector('#lightbox-title');
const lightboxMeta = document.querySelector('.lightbox-meta');
const closeButton = document.querySelector('.lightbox-close');
const menuButton = document.querySelector('.menu-button');
const siteNav = document.querySelector('.site-nav');
let lastFocusedElement = null;

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isSelected = item === button;
      item.classList.toggle('is-active', isSelected);
      item.setAttribute('aria-pressed', String(isSelected));
    });

    artCards.forEach((card) => {
      const categories = card.dataset.category.split(' ');
      card.hidden = selectedFilter !== 'all' && !categories.includes(selectedFilter);
    });
  });
});

document.querySelectorAll('.art-button').forEach((button) => {
  button.addEventListener('click', () => {
    lastFocusedElement = button;
    const thumbnail = button.querySelector('img');
    lightboxImage.src = button.dataset.full;
    lightboxImage.alt = thumbnail.alt;
    lightboxTitle.textContent = button.dataset.title;
    lightboxMeta.textContent = button.dataset.meta;
    lightbox.showModal();
    document.body.classList.add('is-locked');
  });
});

function closeLightbox() {
  if (!lightbox.open) return;
  lightbox.close();
  document.body.classList.remove('is-locked');
  lightboxImage.src = '';
  lastFocusedElement?.focus();
}

closeButton.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});
lightbox.addEventListener('close', () => document.body.classList.remove('is-locked'));

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  siteNav.classList.toggle('is-open', !isOpen);
});

siteNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    siteNav.classList.remove('is-open');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();


const backToTopLink = document.querySelector('.site-footer a[href="#top"]');
backToTopLink?.addEventListener('click', (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  history.replaceState(null, '', `${location.pathname}${location.search}`);
});
