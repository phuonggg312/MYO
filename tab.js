
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
