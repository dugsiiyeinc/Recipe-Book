async function fetchRecipes(query = '') {
  try {
    const response = await fetch('/recipes.json');
    const data = await response.json();

    const filteredRecipes = data.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(query.toLowerCase())
    );

    displayRecipes(filteredRecipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }
}


function displayRecipes(recipes) {
  const recipeContainer = document.getElementById('recipe-results');
  recipeContainer.innerHTML = ''; 

  if (recipes.length === 0) {
    recipeContainer.innerHTML = '<p class="no-results">Sorry, we don\'t have it.</p>';
  } else {
    recipes.forEach(recipe => {
      const recipeCard = `
        <div class="recipe-card" onclick="viewRecipeDetails(${recipe.id})" style="cursor: pointer;">
          <h3>${recipe.title}</h3>
          <img src="${recipe.image}" alt="${recipe.title}" />
          <p>${recipe.description}</p>
        </div>
      `;
      recipeContainer.innerHTML += recipeCard;
    });
  }
}

function searchRecipe() {
  const searchQuery = document.getElementById('searching').value;
  fetchRecipes(searchQuery); 
}


function viewRecipeDetails(id) {
  console.log(`Navigating to details page for recipe ID: ${id}`); 
  window.location.href = `details.html?id=${id}`;
}



async function loadRecipeDetails() {
  const recipeId = getUrlParameter('id');
  console.log(`Loading details for recipe ID: ${recipeId}`); 

  if (!recipeId) {
    document.getElementById('recipe-details').innerHTML = '<p>Recipe not found.</p>';
    return;
  }

  try {
    const response = await fetch('/recipes.json');
    const data = await response.json();
    const recipe = data.recipes.find(r => r.id == recipeId);

    if (recipe) {
     
      document.getElementById('recipe-image').src = recipe.image;
      document.getElementById('recipe-title').textContent = recipe.title;
      document.getElementById('recipe-description').textContent = recipe.description;

      const ingredientsList = document.getElementById('recipe-ingredients');
      ingredientsList.innerHTML = '';
      recipe.ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
      });

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


function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}


function goBack() {
  window.history.back();
}

if (document.getElementById('recipe-results')) {
  fetchRecipes();
} else if (document.getElementById('recipe-details')) {
  loadRecipeDetails();
}