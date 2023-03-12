//Nav Bar
const btn = document.getElementById("menu-btn");
const nav = document.getElementById("menu");

btn.addEventListener("click", () => [
  btn.classList.toggle("open"),
  nav.classList.toggle("flex"),
  nav.classList.toggle("hidden"),
]);

//Top slider
var swiper = new Swiper(".mySwiper1", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
});

//For the video player
const player = new Plyr('#player');

//How to get started section
const card1 = document.getElementById('ist-card');
const card2 = document.getElementById('2nd-card');
const card3 = document.getElementById('3rd-card');
//From the second card
card2.onmouseover = () => {
   card2.style.border = "2px solid #4285F4";
   card1.style.border = "none";
};
card2.onmouseout = () => {
  card2.style.border = "none";
  card1.style.border = "2px solid #4285F4";
}
card3.onmouseover = () => {
  card3.style.border = "2px solid #4285F4";
  card1.style.border = "none";
};
card3.onmouseout = () => {
 card3.style.border = "none";
 card1.style.border = "2px solid #4285F4";
}

//For the Questions
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}

// For The Animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("unhide");
    }
  });
});
const hiddenElements = document.querySelectorAll(".hide");
hiddenElements.forEach((el) => observer.observe(el));

//Testimonial Section
var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
  },
});

