let navToggle = document.querySelector(".nav__toggle");
let navWrapper = document.querySelector(".nav__wrapper");

navToggle.addEventListener("click", function () {
	if (navWrapper.classList.contains("active")) {
		this.setAttribute("aria-expanded", "false");
		this.setAttribute("aria-label", "menu");
		navWrapper.classList.remove("active");
		document.querySelector('.nav-icon1').classList.remove('open');
	} else {
		navWrapper.classList.add("active");
		this.setAttribute("aria-label", "close menu");
		this.setAttribute("aria-expanded", "true");
		document.querySelector('.nav-icon1').classList.add('open');
		navWrapper.style.paddingBottom = height + "px";
	}
});

//===========class with scroll============

//use window.scrollY
let scrollpos = window.scrollY;
let header = document.getElementById("header");


function add_class_on_scroll() {
	header.classList.add("scrollable");
}

function remove_class_on_scroll() {
	header.classList.remove("scrollable");
}

window.addEventListener('scroll', function () {
	//Here you forgot to update the value
	scrollpos = window.scrollY;

	if (scrollpos > 10) {
		add_class_on_scroll();
	} else {
		remove_class_on_scroll();
	}
	console.log(scrollpos);
});

//===========onClick forEach============

document.querySelectorAll('.btn').forEach((element) => {
    element.addEventListener('click', function () {
       alert(this.innerHTML); 
    });
});

 // button info into the form
 //1) установить невидимый инпут в форму 2) установить аттрибуты value инпуту и кнопке

 const formButtonInfo = document.querySelectorAll('.content__footer-btn');
 const franchiseTypeFormInput = document.querySelector('.franchise');
 formButtonInfo.forEach((element) => {
   element.addEventListener('click', function () {
     franchiseTypeFormInput.setAttribute('value', this.getAttribute('value'));
   });
 });

//  swiper on breakpoint

const breakpoint = window.matchMedia('(max-width:992px)');
let mySwiper;

const breakpointChecker = function () {
  if (breakpoint.matches === true) {
    if (mySwiper !== undefined) mySwiper.destroy(true, true);
    document.querySelector('.projects__container').classList.add('swiper-container');
    document.querySelector('.projects__list').classList.add('swiper-wrapper');
    document.querySelectorAll('.projects__card').forEach(element => {
      element.classList.add('swiper-slide');
    });
    return enableSwiper();

  } else if (breakpoint.matches === false) {
    document.querySelector('.projects__container').classList.remove('swiper-container');
    document.querySelector('.projects__list').classList.remove('swiper-wrapper');
    document.querySelectorAll('.projects__card').forEach(element => {
      element.classList.remove('swiper-slide');
    });
    return;
  }
};

const enableSwiper = function () {
  mySwiper = new Swiper('.projects__container', {

  });
};

breakpoint.addListener(breakpointChecker);
breakpointChecker();