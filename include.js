document.addEventListener('DOMContentLoaded', async () => {
  const slots = document.querySelectorAll('[data-include]');
  for (const el of slots) {
    const url = el.getAttribute('data-include');
    const html = await fetch(url).then(r => r.text());
    el.outerHTML = html;
  }
});