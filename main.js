const togle_button = document.querySelector('.togle-button');
const navs = document.querySelector('.navbar');

togle_button.addEventListener('click', function(){
    navs.classList.toggle('active')
})


// Hero section 
  const mainContainer = document.querySelector('.main');
  
  const images = [
      'image1.png',
      'image2.png',
      'img_5.jpg',
      'img_6.jpg'
  ];
  
  let currentIndex = 0;
  function changeImage() {
      currentIndex = (currentIndex + 1) % images.length; 
      mainContainer.style.backgroundImage = `url(${images[currentIndex]})`;
  }

  changeImage();
  setInterval(changeImage, 3000);
   



// Section four 

let currentSlide = 0;
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.remove('active');
    });
    testimonials[index].classList.add('active');

    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

function nextTestimonial() {
    currentSlide = (currentSlide + 1) % testimonials.length;
    showTestimonial(currentSlide);
}

function currentTestimonial(index) {
    currentSlide = index - 1;
    showTestimonial(currentSlide);
}

document.addEventListener('DOMContentLoaded', () => {
    showTestimonial(currentSlide);
    setInterval(nextTestimonial, 5000);
});
