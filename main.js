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


// dropdown closes when clicking outside
document.addEventListener('click', (e) => {
    const activeDropdown = document.querySelector('.dropdown.active');
    if (activeDropdown && !activeDropdown.contains(e.target)) {
        activeDropdown.classList.remove('active');
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

// Testimonial Slider Functionality (if applicable)
document.addEventListener('DOMContentLoaded', () => {
    let currentSlide = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');

    function showTestimonial(index) {
        testimonials.forEach((testimonial) => {
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

    // Register form submission
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

    // Creating the user dropdown menu
    const userNav = document.createElement('li');
    userNav.classList.add('user-nav');
    userNav.innerHTML = `
        <a href="#" class="user-nav-link">user <i class="fas fa-chevron-down"></i></a>
        <ul class="dropdown">
            <li><a href="#">My Recipes</a></li>
            <li><a href="#">Add Recipe</a></li>
            <li><a href="#" id="logout">Log Out</a></li>
        </ul>
    `;

    if (navLinks.firstChild) {
        navLinks.insertBefore(userNav, navLinks.firstChild);
    } else {
        navLinks.appendChild(userNav);
    }

    // Handle logout click
    document.getElementById('logout').addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        window.location.href = "index.html";
    });

    // Handle dropdown toggle click event
    const userNavLink = userNav.querySelector('.user-nav-link');
    const dropdown = userNav.querySelector('.dropdown');

    userNavLink.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.classList.toggle('active');
        e.stopPropagation(); 
    });

    // Close dropdown if clicking outside of it
    document.addEventListener('click', (e) => {
        if (!userNav.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
}
