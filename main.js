// Function to convert image file to Base64 string
function getBase64(file, callback) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callback(reader.result);
    reader.onerror = (error) => console.error('Error: ', error);
}

document.addEventListener('DOMContentLoaded', () => {
    // Toggle Button Functionality for Navbar
    const toggleButton = document.querySelector('.togle-button');
    const navbar = document.querySelector('.navbar');

    if (toggleButton && navbar) {
        toggleButton.addEventListener('click', function () {
            navbar.classList.toggle('active');
        });
    }

    // Check if the user is already logged in
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        updateNavbarForLoggedInUser(loggedInUser.username);
    }
});

// Ensure dropdown closes when clicking outside
document.addEventListener('click', (e) => {
    const activeDropdown = document.querySelector('.dropdown.active');
    if (activeDropdown && !activeDropdown.contains(e.target)) {
        activeDropdown.classList.remove('active');
    }
});

// Handle login and sign up button clicks
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
document.getElementById("loginForm")?.addEventListener("submit", (e) => {
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

// Update navbar for logged in user
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
        <a href="#" class="user-nav-link">User <i class="fas fa-chevron-down"></i></a>
        <ul class="dropdown">
            <li><a href="my-recipes.html">My Recipes</a></li>
            <li><a href="addrecipe.html">Add Recipe</a></li>
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

// Add Recipe JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const addRecipeForm = document.getElementById('addRecipeForm');

    if (addRecipeForm) {
        addRecipeForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const title = document.getElementById('recipeTitle').value;
            const description = document.getElementById('recipeDescription').value;
            const ingredients = document.getElementById('recipeIngredients').value;

            // Getting the image as a Base64 string for storage purposes
            const imageInput = document.getElementById('recipeImage');
            const imageFile = imageInput.files[0];

            if (imageFile) {
                getBase64(imageFile, (base64Image) => {
                    // Create a recipe object
                    const newRecipe = {
                        title,
                        description,
                        ingredients,
                        image: base64Image, // Store the Base64 string of the image
                    };

                    // Get existing recipes from localStorage or initialize an empty array
                    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

                    // Add the new recipe to the array
                    recipes.push(newRecipe);

                    // Save updated array back to localStorage
                    localStorage.setItem('recipes', JSON.stringify(recipes));

                    alert('Recipe added successfully!');

                    // Optionally redirect or clear the form fields
                    addRecipeForm.reset(); // Clear the form fields
                    window.location.href = "my-recipes.html"; // Redirect to the My Recipes page
                });
            } else {
                alert('Please select an image.');
            }
        });
    }
});

// Display Recipes JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const recipeList = document.getElementById('recipeList');

    if (recipeList) {
        // Function to retrieve recipes from localStorage
        function loadRecipes() {
            const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
            return recipes;
        }

        // Function to display recipes on the page
        function displayRecipes() {
            const recipes = loadRecipes();

            // Clear the existing content
            recipeList.innerHTML = '';

            if (recipes.length === 0) {
                recipeList.innerHTML = '<p>No recipes added yet.</p>';
                return;
            }

            recipes.forEach(recipe => {
                const recipeCard = document.createElement('div');
                recipeCard.classList.add('recipe-card');

                recipeCard.innerHTML = `
                    <img src="${recipe.image}" alt="${recipe.title}" style="width:100%; height:200px; object-fit:cover;">
                    <h3>${recipe.title}</h3>
                    <p>${recipe.description}</p>
                    
                `;

                recipeList.appendChild(recipeCard);
            });
        }

        // Call the displayRecipes function on page load
        displayRecipes();
    }
});

// Hero Section Background Image Change (if applicable)
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
