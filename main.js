const togle_button = document.querySelector('.togle-button');
const navs = document.querySelector('.navbar');

togle_button.addEventListener('click', function(){
    navs.classList.toggle('active')
})


// Hero section 
// Hero section 
  // Select the main container element to set the background image
  const mainContainer = document.querySelector('.main');
  
  // Define an array of image URLs
  const images = [
      'https://raw.githubusercontent.com/code-banu/my-first-project/refs/heads/main/assets/images/pasta2.avif',
      'https://images.unsplash.com/photo-1432139509613-5c4255815697?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZvb2R8ZW58MHx8MHx8fDA%3D',
      'https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZvb2R8ZW58MHx8MHx8fDA%3D'
  ];
  
  // Initialize a counter to keep track of the current image index
  let currentIndex = 0;
  
  // Function to change the background image
  function changeImage() {
      currentIndex = (currentIndex + 1) % images.length; // Loop through the images
      mainContainer.style.backgroundImage = `url(${images[currentIndex]})`;
  }
  
  // Set the initial background image
  changeImage();
  
  // Change the image every 3 seconds
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
    setInterval(nextTestimonial, 5000); // Change testimonial every 5 seconds
});
