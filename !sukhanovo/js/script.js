function Tab(tabSelector) {
  const tabContainer = document.querySelector(tabSelector);
  const tabsBtn = tabContainer.querySelectorAll('.tabs__btn');
  const tabsContent = tabContainer.querySelectorAll('.tabs__content');

  tabContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('tabs__btn')) {
      const tabsPath = e.target.dataset.tabsPath;
        tabsBtn.forEach(el => {
          el.classList.remove('tabs__btn_active')
        });
        document.querySelector(`[data-tabs-path="${tabsPath}"]`).classList.add('tabs__btn_active');
      tabsHandler(tabsPath);
    }

    function tabsHandler(path) {
      tabsContent.forEach(el => {
        el.classList.remove('tabs__content_active')
      });
      tabContainer.querySelector(`[data-tabs-target="${path}"]`).classList.add('tabs__content_active');
    }
  });
};

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

//webP support

function testWebP(callback) {

  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

  if (support == true) {
    document.querySelector('body').classList.add('webp');
  } else {
    document.querySelector('body').classList.add('no-webp');
  }
});

  //Slider

  const featureSlider = new Swiper('.feature__slider', {
    loop: true,
    touchRatio: 0.3,
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

  //yBox

  if (document.querySelector('.yBox')) {
    var myYbox = new yBox();
    myYbox.init();
  };

  //accordion

  const accordions = document.querySelectorAll('.accordion'),
    allContents = document.querySelectorAll('.accordion__content'),
    mapSvg = document.querySelector('.map__svg');


  accordions.forEach(accordion => {
    accordion.addEventListener('click', (e) => {
      const self = e.currentTarget;
      const control = self.querySelector('.accordion__control');
      const content = self.querySelector('.accordion__content');

      if (!self.classList.contains('open')) {
        control.setAttribute('aria-expanded', true);
        content.setAttribute('aria-hidden', false);
        document.querySelectorAll('.accordion.open').forEach(element => {
          element.classList.remove('open')
        });
        self.classList.add('open');
        allContents.forEach(element => {
          element.style.maxHeight = null;
        });
        content.style.maxHeight = content.scrollHeight + 'px';

        //icons activity

       if (mapSvg) {
         const mapIcons = document.querySelectorAll('.map__icon');
         const currentCat = self.dataset.cat;
         
         mapIcons.forEach(icon => {
          if (icon.classList.contains('active')) {
            icon.classList.remove('active');
          }
         });
         
         mapSvg.querySelectorAll('[data-filter =' + currentCat + ']').forEach(element => {
          element.classList.add('active');
        });
       }

      } else {
        control.setAttribute('aria-expanded', false);
        content.setAttribute('aria-hidden', true);
        self.classList.remove('open');
        content.style.maxHeight = null;

        //icons activity

        if (mapSvg) {
          const mapIcons = document.querySelectorAll('.map__icon');
          mapIcons.forEach(icon => {
            if (icon.classList.contains('active')) {
              icon.classList.remove('active');
            }
          });
        }
      }
    });
  });

  // tabs

  if (document.querySelector('.index')) {
    new Tab('.howtoget__tabs');
    new Tab('.credit__tabs');
  }
  
});

