
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
          <div class="recipe-card">
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
  
  
  fetchRecipes();
  