// fetching data function
// This function fetches recipes from 'recipes.json' and filters them based on the search query
async function fetchRecipes(query = '') {
  try {
    // Fetch data from the recipes.json file
    const response = await fetch('/recipes.json');
    const data = await response.json();

      // Filter recipes based on the search query (case insensitive)
    const filteredRecipes = data.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(query.toLowerCase())
    );

      // Display the filtered recipes
    displayRecipes(filteredRecipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }
}

// Function to display recipes on the page
function displayRecipes(recipes) {
  const recipeContainer = document.getElementById('recipe-results');
  recipeContainer.innerHTML = ''; 
// If no recipes match the search, show a 'no results' message
  if (recipes.length === 0) {
    recipeContainer.innerHTML = '<p class="no-results">Sorry, we don\'t have it.</p>';
  } else {
     // Loop through each recipe and create an HTML card to display it
    recipes.forEach(recipe => {
      const recipeCard = `
        <div class="recipe-card" onclick="viewRecipeDetails(${recipe.id})" style="cursor: pointer;">
          <img src="${recipe.image}" alt="${recipe.title}" />
             <h3>${recipe.title}</h3>
          <p>${recipe.description}</p>
        </div>
      `;
      recipeContainer.innerHTML += recipeCard;
    });
  }
}

// Function to handle search input
function searchRecipe() {
  const searchQuery = document.getElementById('searching').value;
  fetchRecipes(searchQuery); 
}


// Function to navigate to the detailed recipe pag
function viewRecipeDetails(id) {
  console.log(`Navigating to details page for recipe ID: ${id}`); 
  window.location.href = `details.html?id=${id}`;
}


// Function to load and display recipe details on the details page
async function loadRecipeDetails() {
  const recipeId = getUrlParameter('id');
  console.log(`Loading details for recipe ID: ${recipeId}`); 

  if (!recipeId) {
    document.getElementById('recipe-details').innerHTML = '<p>Recipe not found.</p>';
    return;
  }

  try {
    // Fetch recipes from the JSON file
    const response = await fetch('/recipes.json');
    const data = await response.json();
    // Find the recipe matching the ID
    const recipe = data.recipes.find(r => r.id == recipeId);

    if (recipe) {
     // Populate the details page with the recipe data
      document.getElementById('recipe-image').src = recipe.image;
      document.getElementById('recipe-title').textContent = recipe.title;
      document.getElementById('recipe-description').textContent = recipe.description;

       // Display ingredients
      const ingredientsList = document.getElementById('recipe-ingredients');
      ingredientsList.innerHTML = '';
      recipe.ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
      });

        // Display instructions
      const instructionsList = document.getElementById('recipe-instructions');
      instructionsList.innerHTML = '';
      recipe.instructions.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step;
        instructionsList.appendChild(li);
      });
    } else {
      document.getElementById('recipe-details').innerHTML = '<p>Recipe not found.</p>';
    }
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    document.getElementById('recipe-details').innerHTML = '<p>Error loading recipe details.</p>';
  }
}

// Function to get parameters from the URL (e.g., recipe ID)
function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Function to navigate back to the previous page
function goBack() {
  window.history.back();
}

// Check if elements exist to call specific functions on load
if (document.getElementById('recipe-results')) {
  fetchRecipes();
} else if (document.getElementById('recipe-details')) {
  loadRecipeDetails();
}

// Event listener for DOM content loaded to enable navbar toggle
document.addEventListener('DOMContentLoaded', () => {

  const toggleButton = document.querySelector('.togle-button');
  const navbar = document.querySelector('.navbar');

  if (toggleButton && navbar) {
      toggleButton.addEventListener('click', function () {
          navbar.classList.toggle('active');
      });
  }
});