async function fetchRecipes() {
    try {
      const response = await fetch('recipes.json'); 
      const data = await response.json();
      displayRecipes(data.recipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  }
  
  function displayRecipes(recipes) {
    const recipeContainer = document.getElementById('recipe-results');
    recipeContainer.innerHTML = '';
  
    recipes.forEach(recipe => {
        const recipeCard = `
            <div class="recipe-card">
                <img src="${recipe.image}" alt="${recipe.title}">
                <h3>${recipe.title}</h3>
                <p>${recipe.description}</p>
            </div>
        `;
        recipeContainer.innerHTML += recipeCard;
    });

  }

  
  fetchRecipes();
  
  


