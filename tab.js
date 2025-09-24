
$(function(){
  const $slider = $('.cate-slider,.brew-grid');

  function applyFilter(filter){
    $slider.slick('slickUnfilter');

    if (filter !== 'all') {
      $slider.slick('slickFilter', '.cate-item[data-cat="'+filter+'"]');
    }

    $slider.slick('slickGoTo', 0, true);
  }

  $('.cate-nav').on('click', '[data-filter]', function(){
    const $btn = $(this);
    const filter = $btn.data('filter');

    // UI state + ARIA
    $btn.addClass('is-active').attr('aria-selected','true')
        .siblings('[data-filter]').removeClass('is-active').attr('aria-selected','false');

    applyFilter(filter);
  });
});

$(function () {
    const $brew = $('.brew-grid');

    function applyBrewFilter(filter){
      $brew.slick('slickUnfilter');

      $brew.slick('slickFilter', function(_, el){
        const tokens = ($(el).attr('data-cat') || '').toLowerCase().split(/\s+/);
        return tokens.includes(filter);
      });

      $brew.slick('slickGoTo', 0, true);
    }

    applyBrewFilter('featured');

    $('.brew-tabs').on('click', '[data-filter]', function(){
      const $btn = $(this);
      const filter = $btn.data('filter');

      // UI/ARIA
      $btn.addClass('is-active').attr('aria-selected','true')
          .siblings('[data-filter]').removeClass('is-active').attr('aria-selected','false');

      applyBrewFilter(filter);
    });
  });
(function(){
  const root = document.querySelector('#product-tabs');
  if(!root) return;

  const tabs   = [...root.querySelectorAll('.p-tabs__tab')];
  const panels = [...root.querySelectorAll('[role="tabpanel"]')];

  function activate(id){
    tabs.forEach(t=>{
      const on = t.dataset.target === id;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
    });
    panels.forEach(p=>{
      p.hidden = (p.id !== id);
    });
  }

  root.addEventListener('click', e=>{
    const btn = e.target.closest('.p-tabs__tab'); if(!btn) return;
    activate(btn.dataset.target);
    history.replaceState(null, "", "#" + btn.dataset.target);
  });

  root.addEventListener('keydown', e=>{
    const current = document.activeElement;
    if(!current.classList.contains('p-tabs__tab')) return;
    const i = tabs.indexOf(current);
    let j = i;
    if(e.key === 'ArrowRight') j = (i+1) % tabs.length;
    else if(e.key === 'ArrowLeft') j = (i-1+tabs.length) % tabs.length;
    else if(e.key === 'Home') j = 0;
    else if(e.key === 'End') j = tabs.length-1;
    else return;
    e.preventDefault();
    tabs[j].focus();
    tabs[j].click();
  });

  const hash = location.hash.replace('#','');
  const firstId = tabs[0].dataset.target;
  const targetId = panels.some(p=>p.id===hash) ? hash : firstId;
  activate(targetId);
})();
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.p-tabs__tab');
    if (!btn) return;

    // tabs
    document.querySelectorAll('.p-tabs__tab').forEach(t => {
      t.classList.toggle('is-active', t === btn);
      t.setAttribute('aria-selected', t === btn ? 'true' : 'false');
      t.tabIndex = t === btn ? 0 : -1;
    });

    // panels
    const targetId = btn.dataset.target;
    document.querySelectorAll('.p-tabs [role="tabpanel"]').forEach(p => {
      p.hidden = p.id !== targetId;
    });
  });

  // hỗ trợ bàn phím
  document.querySelectorAll('.p-tabs__tab').forEach(tab => {
    tab.addEventListener('keydown', (e) => {
      if (!['ArrowLeft','ArrowRight','Home','End'].includes(e.key)) return;
      const tabs = [...document.querySelectorAll('.p-tabs__tab')];
      let i = tabs.indexOf(e.currentTarget);
      if (e.key === 'ArrowLeft') i = (i - 1 + tabs.length) % tabs.length;
      if (e.key === 'ArrowRight') i = (i + 1) % tabs.length;
      if (e.key === 'Home') i = 0;
      if (e.key === 'End') i = tabs.length - 1;
      tabs[i].click();
      tabs[i].focus();
    });
  });