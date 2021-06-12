document.addEventListener('DOMContentLoaded', function () {
  // Menu burger
  const iconMenu = document.querySelector('.menu__icon');
  const menuBody = document.querySelector('.menu__body');
  if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
      document.body.classList.toggle('_lock');
      iconMenu.classList.toggle('_active');
      menuBody.classList.toggle('_active');
    });
  }

  //Slider

  const featureSlider = new Swiper('.feature__slider', {
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  //audio

  const audioBtn = document.querySelector('.audio-btn');
  audioBtn.addEventListener('click', (e) => {
    e.target.classList.toggle('playing');
  })
});