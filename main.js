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
    setInterval(nextTestimonial, 3000);
});



// SignUp and signin 
document.addEventListener('DOMContentLoaded', () => {
    // Handle Sign In and Sign Up button clicks across pages
    const signInButton = document.querySelector('.sign-in');
    const signUpButton = document.querySelector('.sign-up');

    if (signInButton) {
        signInButton.addEventListener('click', () => {
            window.location.href = 'signin.html';
        });
    }

    if (signUpButton) {
        signUpButton.addEventListener('click', () => {
            window.location.href = 'signup.html';
        });
    }

    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;
            const password = document.getElementById("password").value;

            const user = {
                username,
                email,
                phone,
                password,
            };

            localStorage.setItem(email, JSON.stringify(user));
            alert("Registration successful!");

            window.location.href = "signin.html";
        });
    }
});
document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const storedUser = JSON.parse(localStorage.getItem(email));

    if (storedUser && storedUser.password === password) {
        alert("Login successful!");
        localStorage.setItem('loggedInUser', JSON.stringify(storedUser));

        window.location.href = "index.html"; 
    } else {
        alert("Invalid email or password. Please try again.");
    }
});
