

document.addEventListener('DOMContentLoaded', function () {
  // Menu burger
  const iconMenu = document.querySelector('.menu__icon');
  const menuBody = document.querySelector('.menu__body');
  const disableBodyScroll = bodyScrollLock.disableBodyScroll;
  const enableBodyScroll = bodyScrollLock.enableBodyScroll;

  if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
      document.body.classList.toggle('_lock');
      iconMenu.classList.toggle('_active');
      menuBody.classList.toggle('_active');

      if (e.target.classList.contains('_active')) {
        disableBodyScroll(document.body);
        menuOpen();
      } else {
        enableBodyScroll(document.body);
      }
    });
  }

  //header

  const
    header = document.querySelector('.header');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', () => {
    let scrollDistance = window.scrollY;
    
    if (scrollDistance > lastScrollTop) {
      header.classList.remove('translated');

      setTimeout(() => {
        header.classList.remove('scrollable');
        header.classList.remove('fixed');
      }, 400);

      
    } else {
      header.classList.add('fixed');
      header.classList.add('scrollable');
      header.classList.add('translated');
    }

    lastScrollTop = scrollDistance;

    if (lastScrollTop < 100) {
      header.classList.remove('scrollable');
      header.classList.remove('fixed');
      header.classList.remove('translated');
     
      //  header.style.opacity = "";
      //  header.style.transform = 'translateY(0)';
    }
  })

  
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
  const myAudio = document.querySelector('#audio');

  if (audioBtn) {
    audioBtn.addEventListener('click', (e) => {
      e.target.classList.toggle('playing');
      if (!myAudio.classList.contains('playing')) {
        myAudio.play();
        myAudio.classList.add('playing')
      } else {
          myAudio.classList.remove('playing')
          myAudio.pause();
      }
    });

    audio.addEventListener('ended', (event) => {
     audioBtn.classList.remove('playing')
    });
  }
  

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

  // spollers
  const spollersArray = document.querySelectorAll('[data-spollers]');
  if (spollersArray.length > 0) {
    // Получение обычных слойлеров
    const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
      return !item.dataset.spollers.split(",")[0];
    });
    // Инициализация обычных слойлеров
    if (spollersRegular.length > 0) {
      initSpollers(spollersRegular);
    }

    // Получение слойлеров с медиа запросами
    const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
      return item.dataset.spollers.split(",")[0];
    });

    // Инициализация слойлеров с медиа запросами
    if (spollersMedia.length > 0) {
      const breakpointsArray = [];
      spollersMedia.forEach(item => {
        const params = item.dataset.spollers;
        const breakpoint = {};
        const paramsArray = params.split(",");
        breakpoint.value = paramsArray[0];
        breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
        breakpoint.item = item;
        breakpointsArray.push(breakpoint);
      });

      // Получаем уникальные брейкпоинты
      let mediaQueries = breakpointsArray.map(function (item) {
        return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
      });
      mediaQueries = mediaQueries.filter(function (item, index, self) {
        return self.indexOf(item) === index;
      });

      // Работаем с каждым брейкпоинтом
      mediaQueries.forEach(breakpoint => {
        const paramsArray = breakpoint.split(",");
        const mediaBreakpoint = paramsArray[1];
        const mediaType = paramsArray[2];
        const matchMedia = window.matchMedia(paramsArray[0]);

        // Объекты с нужными условиями
        const spollersArray = breakpointsArray.filter(function (item) {
          if (item.value === mediaBreakpoint && item.type === mediaType) {
            return true;
          }
        });
        // Событие
        matchMedia.addListener(function () {
          initSpollers(spollersArray, matchMedia);
        });
        initSpollers(spollersArray, matchMedia);
      });
    }
    // Инициализация
    function initSpollers(spollersArray, matchMedia = false) {
      spollersArray.forEach(spollersBlock => {
        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
        if (matchMedia.matches || !matchMedia) {
          spollersBlock.classList.add('_init');
          initSpollerBody(spollersBlock);
          spollersBlock.addEventListener("click", setSpollerAction);
        } else {
          spollersBlock.classList.remove('_init');
          initSpollerBody(spollersBlock, false);
          spollersBlock.removeEventListener("click", setSpollerAction);
        }
      });
    }
    // Работа с контентом
    function initSpollerBody(spollersBlock, hideSpollerBody = true) {
      const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
      if (spollerTitles.length > 0) {
        spollerTitles.forEach(spollerTitle => {
          if (hideSpollerBody) {
            spollerTitle.removeAttribute('tabindex');
            if (!spollerTitle.classList.contains('_active')) {
              spollerTitle.nextElementSibling.hidden = true;
            }
          } else {
            spollerTitle.setAttribute('tabindex', '-1');
            spollerTitle.nextElementSibling.hidden = false;
          }
        });
      }
    }

    function setSpollerAction(e) {
      const el = e.target;
      if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
        const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
        const spollersBlock = spollerTitle.closest('[data-spollers]');
        const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
        if (!spollersBlock.querySelectorAll('._slide').length) {
          if (oneSpoller && !spollerTitle.classList.contains('_active')) {
            hideSpollersBody(spollersBlock);
          }
          spollerTitle.classList.toggle('_active');
          _slideToggle(spollerTitle.nextElementSibling, 500);
        }
        e.preventDefault();
      }
    }

    function hideSpollersBody(spollersBlock) {
      const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
      if (spollerActiveTitle) {
        spollerActiveTitle.classList.remove('_active');
        _slideUp(spollerActiveTitle.nextElementSibling, 500);
      }
    }
  }
  //========================================================================================================================================================
  //SlideToggle
  let _slideUp = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
      target.classList.add('_slide');
      target.style.transitionProperty = 'height, margin, padding';
      target.style.transitionDuration = duration + 'ms';
      target.style.height = target.offsetHeight + 'px';
      target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      window.setTimeout(() => {
        target.hidden = true;
        target.style.removeProperty('height');
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        target.classList.remove('_slide');
      }, duration);
    }
  }
  let _slideDown = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
      target.classList.add('_slide');
      if (target.hidden) {
        target.hidden = false;
      }
      let height = target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      target.offsetHeight;
      target.style.transitionProperty = "height, margin, padding";
      target.style.transitionDuration = duration + 'ms';
      target.style.height = height + 'px';
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      window.setTimeout(() => {
        target.style.removeProperty('height');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        target.classList.remove('_slide');
      }, duration);
    }
  }
  let _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
      return _slideDown(target, duration);
    } else {
      return _slideUp(target, duration);
    }
  }

  //materials slider 

  if (document.querySelector('.materials__wrapper')) {
    const breakpoint = window.matchMedia('(min-width:1180px)'); //слайдер только ниже 
    let mySwiper;

     const breakpointChecker = function () {
       if (breakpoint.matches === true) {
         if (mySwiper !== undefined) mySwiper.destroy(true, true);
         document.querySelector('.materials__wrapper').classList.remove('swiper-wrapper');
         document.querySelector('.materials__wrapper').classList.add('materials__wrapper');
         document.querySelector('.materials__container').classList.remove('swiper-container');
         document.querySelectorAll('.materials__card').forEach(card => {
           card.classList.remove('swiper-slide')
         });
         return;
       } else if (breakpoint.matches === false) {
         document.querySelector('.materials__wrapper').classList.add('swiper-wrapper');
         document.querySelector('.materials__wrapper').classList.remove('materials__wrapper');
         document.querySelector('.materials__container').classList.add('swiper-container');
         document.querySelectorAll('.materials__card').forEach(card => {
           card.classList.add('swiper-slide')
         });
         return enableSwiper();
       }
     };
    
     const enableSwiper = function () {
    mySwiper = new Swiper('.materials__container', {
      grabCursor: true,
      loop: true,
      navigation: {
        nextEl: '.controls__btns .controls__next',
        prevEl: '.controls__btns .controls__prev',
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          centeredSlides: true,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 10
        }
      }
    });
  };

  breakpoint.addListener(breakpointChecker);
  breakpointChecker();
  }

  //plan
  
  if (document.querySelector('.plan')) {
        document.querySelectorAll('[data-free="продан"], [data-free="зарезервирован"]').forEach(element => {
          element.removeAttribute("xlink:href");
          element.style.cursor = "not-allowed"
        });

      const instances = tippy(document.querySelectorAll('.house'), {
        content: (instances) => `
      <div class="tip">
        <span class="tip__number"> Дом номер ${instances.getAttribute('data-number')}</span>
        <span class="tip__secion"> Секция ${instances.getAttribute('data-section')}</span>
        <p class="tip__square" style=" text-align:center">Площадь ${instances.getAttribute('data-sqaure')} кв.м.</p>
        <p class="tip__avaliable" style="text-align:center">${instances.getAttribute('data-free')}</p>
      </div>  
        `,
        allowHTML: true,
        animation: 'scale'
      });
    
    new OuterTab('.outer-tabs');
    if (document.querySelector('.compare-block')) {
      new Tab('.compare-block__tabs_first');
    }
    if (document.querySelector('.compare-block')) {
      new Tab('.compare-block__tabs_sec');
    }
    new BeerSlider(document.querySelector(".beer-slider"), {
      start: 50
    });
  }

  //before-after slider

  if (document.querySelector('.duplexes')) {
    if (document.querySelector('.compare-block')) {
     new BeerSlider(document.querySelector(".beer-slider"), {
       start: 50
     });
    }

    if (document.querySelector('.compare-block')) {
      new Tab('.compare-block__tabs_first');
    }
    if (document.querySelector('.compare-block')) {
      new Tab('.compare-block__tabs_sec');
    }
    if (document.querySelector('.outer-tabs')) {
      new OuterTab('.outer-tabs');
    }
  }

  if (document.querySelector('.page-inner')) {
    if (document.querySelector('.compare-block')) {
      new BeerSlider(document.querySelector(".beer-slider"), {
        start: 50
      });
    }
  }
  
  if (document.querySelector('.contacts')) {
    new Tab('.howtoget__tabs');
  }

  if (document.querySelector('.page-inner')) {

    tippy('.houseprops__question', {
      placement: 'bottom-start',
    });

    if (document.querySelector('.compare-block')) {
        new Tab('.compare-block__tabs_first');
      }

    const instances = tippy(document.querySelectorAll('.houseprops__svg'), {
      content: (instances) => `
        <div class="tip">
          <span class="tip__number"> Дом номер ${instances.getAttribute('data-number')}</span>
          <span class="tip__secion"> Секция ${instances.getAttribute('data-section')}</span>
          <p class="tip__square" style=" text-align:center">Площадь ${instances.getAttribute('data-sqaure')} кв.м.</p>
          <p class="tip__avaliable" style="text-align:center">${instances.getAttribute('data-free')}</p>
        </div>  
      `,
      allowHTML: true,
      animation: 'scale',
      followCursor: true,
    });
  }


  //animations

  let tl = gsap.timeline({

  });

  tl
    .staggerFromTo('.menu__list li', 0.3, {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
    }, 0.03)
    .from('.offer__title', {
      opacity: 0,
      y: 30
    }, "-=0.3")
    .from('.offer__subtitle', {
      opacity: 0,
      y: 20
    }, "-=0.3")
    .from('.offer__btn', {
      opacity: 0,
      y: 20
    }, "-=0.3")
    .from('.offer__bottom', {
      opacity: 0,
      y: 20
    }, "-=0.3")
    ;
  
  

  //mobile menu animation
  function menuOpen() {
      let tlm = gsap.timeline({

      });
    
      tlm.staggerFromTo('.menu__body._active li, .menu__body._active .phones__link', 0.7, {
        opacity: 0,
        y: 30
      }, {
        opacity: 1,
        y: 0,
      }, 0.03)
    }
    

  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.icon-dream', {
    scrollTrigger: {
      trigger: '.icon-dream',
      start: '20px 80%',
    },
    y: 30,
    opacity: 0
  });

  gsap.from('.map__wrapper', {
    scrollTrigger: {
      trigger: '.map__wrapper',
      end: 'center 20%',
      start: '10%, 70%',
      scrub: true,
    },
    x: -50,
    opacity: 0.3,
  });

  gsap.from('.gifts__container img', {
    scrollTrigger: {
      trigger: '.gifts__container img',
      end: 'center 70%',
      start: '20px, 80%',
    },
    x: -40,
    scale: 0.95,
    opacity: 0,
  });

  gsap.from('.credit__media img', {
    scrollTrigger: {
      trigger: '.credit__media img',
      end: 'center 70%',
      start: '20px, 80%'
    },
    x: 40,
    scale: 0.95,
    opacity: 0,
  });

  //social-buttons-at-the-bottom

  const socBtns = document.querySelector('.buttons__image');

  socBtns.addEventListener('click', () => {
    document.querySelectorAll('.buttons__wrapper li').forEach(element => {
      element.classList.toggle('visible')
    });
  })

});