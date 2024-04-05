// Initialiseer slideshows

let movieSlider = new Swiper(".movies", {
    grabCursor: true,
    slidesPerView: 6.5,
    spaceBetween: 50,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
});

let trendingMovies = new Swiper(".trendingMovies", {
    grabCursor: true,
    slidesPerView: 6.5,
    spaceBetween: 50,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
});

window.addEventListener('scroll', function() {
    var scrollPosition = window.scrollY;
    var header = document.querySelector('header');
    
    if (scrollPosition > 0) {
        header.style.backgroundColor = '#0e1122'; // Als er wordt gescrold, verander de achtergrond naar zwart
    } else {
        header.style.backgroundColor = 'transparent'; // Als er niet wordt gescrold, houd de achtergrond transparant
    }
});

