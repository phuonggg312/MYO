
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

  const tabs = [...root.querySelectorAll('.p-tabs__tab')];
  const panels = [...root.querySelectorAll('[role="tabpanel"]')];
  const isMobile = window.innerWidth <= 768;

  function activateDesktop(id) {
    // Desktop behavior - show/hide panels
    tabs.forEach(t => {
      const on = t.dataset.target === id;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
    });
    
    panels.forEach(p => {
      p.hidden = (p.id !== id);
    });
  }

  function activateMobile(id) {
    // Mobile behavior - accordion
    tabs.forEach(t => {
      const isTarget = t.dataset.target === id;
      const wasOpen = t.classList.contains('is-open');
      
      // Close all first
      t.classList.remove('is-open');
      t.classList.remove('is-active');
      t.setAttribute('aria-selected', 'false');
      
      // Open target if it wasn't already open
      if (isTarget && !wasOpen) {
        t.classList.add('is-open');
        t.classList.add('is-active');
        t.setAttribute('aria-selected', 'true');
      }
    });
    
    panels.forEach(p => {
      const isTarget = p.id === id;
      const wasOpen = p.classList.contains('is-open');
      
      p.classList.remove('is-open');
      p.hidden = true;
      
      if (isTarget && !wasOpen) {
        p.classList.add('is-open');
        p.hidden = false;
      }
    });
  }

  function handleTabClick(btn) {
    if (isMobile) {
      activateMobile(btn.dataset.target);
    } else {
      activateDesktop(btn.dataset.target);
    }
  }

  // Event listeners
  root.addEventListener('click', e => {
    const btn = e.target.closest('.p-tabs__tab'); 
    if(!btn) return;
    handleTabClick(btn);
  });

  // Keyboard navigation
  root.addEventListener('keydown', e => {
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
    handleTabClick(tabs[j]);
  });

  // Handle resize
  function handleResize() {
    const newIsMobile = window.innerWidth <= 768;
    if (newIsMobile !== isMobile) {
      // Reset to first tab on resize
      const firstId = tabs[0].dataset.target;
      if (newIsMobile) {
        activateMobile(firstId);
      } else {
        activateDesktop(firstId);
      }
    }
  }

  // Initial setup
  const hash = location.hash.replace('#','');
  const firstId = tabs[0].dataset.target;
  const targetId = panels.some(p => p.id === hash) ? hash : firstId;
  
  if (isMobile) {
    activateMobile(targetId);
  } else {
    activateDesktop(targetId);
  }

  window.addEventListener('resize', handleResize);
})();