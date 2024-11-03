document.addEventListener("DOMContentLoaded", () => {
  const togle_button = document.querySelector(".togle-button");
  const navs = document.querySelector(".navbar");

  if (togle_button && navs) {
    togle_button.addEventListener("click", function () {
      navs.classList.toggle("active");
    });
  }

  // Check if user is already logged in
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (loggedInUser) {
    updateNavbarForLoggedInUser(loggedInUser.username);
  }
});

// Hero Section Background Image Change
document.addEventListener("DOMContentLoaded", () => {
  const mainContainer = document.querySelector(".main");

  if (mainContainer) {
    const images = ["image1.png", "image2.png", "img_5.jpg", "img_6.jpg"];

    let currentIndex = 0;

    function changeImage() {
      currentIndex = (currentIndex + 1) % images.length;
      mainContainer.style.backgroundImage = `url(${images[currentIndex]})`;
    }

    changeImage();
    setInterval(changeImage, 3000);
  }
});

// Testimonial Slider Functionality
document.addEventListener("DOMContentLoaded", () => {
  let currentSlide = 0;
  const testimonials = document.querySelectorAll(".testimonial");
  const dots = document.querySelectorAll(".dot");

  function showTestimonial(index) {
    testimonials.forEach((testimonial) => {
      testimonial.classList.remove("active");
    });
    testimonials[index].classList.add("active");

    dots.forEach((dot) => dot.classList.remove("active"));
    dots[index].classList.add("active");
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

// sign in and signUp click
document.addEventListener("DOMContentLoaded", () => {
  const signInButton = document.querySelector(".sign-in");
  const signUpButton = document.querySelector(".sign-up");

  if (signInButton) {
    signInButton.addEventListener("click", () => {
      window.location.href = "signin.html";
    });
  }

  if (signUpButton) {
    signUpButton.addEventListener("click", () => {
      window.location.href = "signup.html";
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

  // Login form submission
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
      const storedUser = JSON.parse(localStorage.getItem(email));

      if (storedUser && storedUser.password === password) {
        alert("Login successful!");
        localStorage.setItem("loggedInUser", JSON.stringify(storedUser));
        window.location.href = "index.html";
      } else {
        alert("Invalid email or password. Please try again.");
      }
    });
  }
});

// // Update navbar for loggin user
function updateNavbarForLoggedInUser(username) {
  const navLinks = document.querySelector(".navbar-links ul");
  const headerActions = document.querySelector(".header-actions");
  if (headerActions) headerActions.innerHTML = "";

  // Creating the user dropdown menu
  const userNav = document.createElement("li");
  userNav.classList.add("user-nav");
  userNav.innerHTML = `
        <a href="#" class="user-nav-link">
        <span>User</span>
        <img src="down-arrow.png" alt="User Avatar" class="user-avatar">
         </a>
            <ul class="dropdown">
                <li><a href="my-recipes.html">My Recipes</a></li>
                <li><a href="addrecipe.html">Add Recipe</a></li>
                <li><a href="#" id="logout">Log Out</a></li>
            </ul>
  `;

  navLinks.firstChild
    ? navLinks.insertBefore(userNav, navLinks.firstChild)
    : navLinks.appendChild(userNav);

  // Handle dropdown toggle and logout
  userNav.querySelector(".user-nav-link").addEventListener("click", (e) => {
    e.preventDefault();
    userNav.querySelector(".dropdown").classList.toggle("active");
    e.stopPropagation();
  });

  document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  });

  // Close dropdown if clicking outside of it
  document.addEventListener("click", (e) => {
    if (!userNav.contains(e.target)) {
      userNav.querySelector(".dropdown").classList.remove("active");
    }
  });
}

// Function to convert image file to Base64 string
function getBase64(file, callback) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => callback(reader.result);
  reader.onerror = (error) => console.error("Error: ", error);
}

// click to Show Recipe Modal
function showRecipeModal(recipe) {
  localStorage.setItem("selectedRecipe", JSON.stringify(recipe));
  window.location.href = "modal.html";
}

// Add Recipe Form Submission
document.addEventListener("DOMContentLoaded", () => {
  const addRecipeForm = document.getElementById("addRecipeForm");
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (addRecipeForm && loggedInUser) {
    addRecipeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("recipeTitle").value;
      const description = document.getElementById("recipeDescription").value;
      const ingredients = document.getElementById("recipeIngredients").value;
      const imageFile = document.getElementById("recipeImage").files[0];

      if (imageFile) {
        getBase64(imageFile, (base64Image) => {
          const newRecipe = {
            title,
            description,
            ingredients,
            image: base64Image,
          };
          saveRecipe(newRecipe, loggedInUser.email);
          addRecipeForm.reset();
          window.location.href = "my-recipes.html";
        });
      } else {
        alert("Please select an image.");
      }
    });
  }

  const recipeList = document.getElementById("recipeList");
  if (recipeList && loggedInUser) {
    displayRecipes(loggedInUser.email);
  }
});

function saveRecipe(recipe, userEmail) {
  const recipes =
    JSON.parse(localStorage.getItem(`recipes_${userEmail}`)) || [];
  recipes.push(recipe);
  localStorage.setItem(`recipes_${userEmail}`, JSON.stringify(recipes));
}

function displayRecipes(userEmail) {
  const recipes =
    JSON.parse(localStorage.getItem(`recipes_${userEmail}`)) || [];
  const recipeList = document.getElementById("recipeList");
  recipeList.innerHTML =
    recipes.length === 0 ? "<p>No recipes added yet.</p>" : "";

  recipes.forEach((recipe, index) => {
    const recipeCard = createRecipeCard(recipe, index, userEmail);
    recipeList.appendChild(recipeCard);
  });
}

function createRecipeCard(recipe, index, userEmail) {
  const recipeCard = document.createElement("div");
  recipeCard.classList.add("recipe-card");
  recipeCard.setAttribute("data-index", index);
  recipeCard.innerHTML = `
          <img src="${recipe.image}" alt="${recipe.title}" style="width:100%; height:200px; object-fit:cover;">
          <h3>${recipe.title}</h3>
          <p>${recipe.description}</p>
          <button class="edit-recipe-btn" data-index="${index}">Edit</button>
          <button class="delete-recipe-btn" data-index="${index}">Delete</button>
      `;

  recipeCard.addEventListener("click", (e) => {
    if (
      !e.target.classList.contains("edit-recipe-btn") &&
      !e.target.classList.contains("delete-recipe-btn")
    ) {
      showRecipeModal(recipe);
    }
  });

  recipeCard
    .querySelector(".delete-recipe-btn")
    .addEventListener("click", (e) => {
      e.stopPropagation();
      deleteRecipe(index, userEmail);
    });

  recipeCard
    .querySelector(".edit-recipe-btn")
    .addEventListener("click", (e) => {
      e.stopPropagation();
      showEditForm(index, userEmail);
    });

  return recipeCard;
}

// Recipe Modal Functionality
document.addEventListener("DOMContentLoaded", () => {
  const selectedRecipe = JSON.parse(localStorage.getItem("selectedRecipe"));
  if (selectedRecipe) {
    document.getElementById("modalTitle").textContent = selectedRecipe.title;
    document.getElementById("modalDescription").textContent =
      selectedRecipe.description;
    document.getElementById("modalIngredients").textContent =
      selectedRecipe.ingredients;
    document.getElementById("modalImage").src = selectedRecipe.image;
  }
  const modal = document.getElementById("recipeModal");
  modal.style.display = "flex";
});
// go back Funnection
function goBack() {
  window.history.back();
}
