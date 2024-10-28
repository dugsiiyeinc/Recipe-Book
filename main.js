document.addEventListener('DOMContentLoaded', () => {
    // Toggle Button Functionality for Navbar
    const togle_button = document.querySelector('.togle-button');
    const navs = document.querySelector('.navbar');

    if (togle_button && navs) {
        togle_button.addEventListener('click', function () {
            navs.classList.toggle('active');
        });
    }

    // Check if the user is already logged in
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        updateNavbarForLoggedInUser(loggedInUser.username);
    }
});

// Hero Section Background Image Change
document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.querySelector('.main');

    if (mainContainer) {
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
    }
});

// section four changes
document.addEventListener('DOMContentLoaded', () => {
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

    if (testimonials.length > 0 && dots.length > 0) {
        showTestimonial(currentSlide);
        setInterval(nextTestimonial, 5000);
    }
});

// Signup and signin
document.addEventListener('DOMContentLoaded', () => {
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

// Login form submission
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

function updateNavbarForLoggedInUser(username) {
    const navLinks = document.querySelector('.navbar-links ul');
    const headerActions = document.querySelector('.header-actions');

    if (headerActions) {
        headerActions.innerHTML = '';
    }

    const userNav = document.createElement('li');
    userNav.innerHTML = `
        <a href="#">user ▼</a>
        <ul class="dropdown">
            <li><a href="#">My Recipes</a></li>
            <li><a href="#">Add Recipe</a></li>
            <li><a href="#" id="logout">Log Out</a></li>
        </ul>
    `;
    userNav.classList.add('user-nav');

    if (navLinks.firstChild) {
        navLinks.insertBefore(userNav, navLinks.firstChild);
    } else {
        navLinks.appendChild(userNav);
    }

    document.getElementById('logout').addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        window.location.href = "signin.html";
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const userNav = document.querySelector('.user-nav');
    const dropdown = document.querySelector('.dropdown');

    userNav.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.classList.toggle('active');
    });
});
