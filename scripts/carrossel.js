//SLIDER BANNERS
const bannerSlider = document.querySelector('.slider__banners');

new Glider(bannerSlider, {
    slidesToShow: 1,
    slidesToScroll: 1,
    scrollLock: true,
    dots: '.dots',
    arrows: {
        prev: '.btn-prev__banner',
        next: '.btn-next__banner'
    }
});

//SLIDER DESTAQUE

const destaqueGlider = document.querySelector('.destaque__glider');

new Glider(destaqueGlider, {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: {
        prev: '.btn-prev__destaques',
        next: '.btn-next__destaques'
    },
    responsive: [
        {
            breakpoint: 800,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 1350,
            settings: {
                slidesToShow: 3
            }
        }
    ]
});

