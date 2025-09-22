document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.menu-btn');
  const menuTab = document.querySelector('.menu-tab');
  if (!menuBtn || !menuTab) return;

  const open = () => {
    menuBtn.classList.add('active');
    menuBtn.setAttribute('aria-expanded', 'true');
    menuTab.setAttribute('aria-hidden', 'false');
  };
  const close = () => {
    menuBtn.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuTab.setAttribute('aria-hidden', 'true');
  };
  const toggle = (e) => {
    e.stopPropagation();
    menuBtn.classList.contains('active') ? close() : open();
  };

  menuBtn.addEventListener('click', toggle);

  document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !menuTab.contains(e.target)) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  const mq = window.matchMedia('(min-width: 769px)');
  const sync = () => close();
  mq.addEventListener ? mq.addEventListener('change', sync) : mq.addListener(sync);
});