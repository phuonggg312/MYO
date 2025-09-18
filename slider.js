$(document).ready(function () {
    $('.hero-slider').slick({
        arrows: true,
        dots: true,
        autoplay: true,
        autoplaySpeed: 4500,
        speed: 700,
        fade: true,
        cssEase: 'linear',
        pauseOnHover: false,
        adaptiveHeight: false
    });

    $('.cate-slider,.brew-grid').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: false,
        arrows: true,
        dots: true,
        speed: 500,
        prevArrow:
            '<button type="button" class="cate-arrow cate-prev" aria-label="Previous"><i class="fa-solid fa-chevron-left"></i></button>',
        nextArrow:
            '<button type="button" class="cate-arrow cate-next" aria-label="Next"><i class="fa-solid fa-chevron-right"></i></button>',
        responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 4 } },
            { breakpoint: 992, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } }
            
        ]
    });
    $('.brands-slider').slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    infinite: false,
    arrows: false,
    dots: false,
    responsive: [
        {
            breakpoint: 768, // Mobile view
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                arrows: true,
                dots: true,
                prevArrow:
                    '<button type="button" class="brands-arrow slick-prev" aria-label="Previous"><i class="fa-solid fa-chevron-left"></i></button>',
                nextArrow:
                    '<button type="button" class="brands-arrow slick-next" aria-label="Next"><i class="fa-solid fa-chevron-right"></i></button>',
            },
        },
    ],
});

    $('.hero-in-section').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        arrows: true,
        dots: true,
        speed: 600,
        prevArrow:
            '<button type="button" class="hin-arrow slick-prev" aria-label="Previous"><i class="fa-solid fa-chevron-left"></i></button>',
        nextArrow:
            '<button type="button" class="hin-arrow slick-next" aria-label="Next"><i class="fa-solid fa-chevron-right"></i></button>',
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });


     $('.t-track').not('.slick-initialized').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    arrows: true,
    dots: true,
    speed: 500,
    prevArrow:
      '<button type="button" class="t-arrow t-prev" aria-label="Previous"><i class="fa-solid fa-chevron-left"></i></button>',
    nextArrow:
      '<button type="button" class="t-arrow t-next" aria-label="Next"><i class="fa-solid fa-chevron-right"></i></button>',
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } }
    ]
  });
});



