async function fetchRecipes() {
    try {
      const response = await fetch('http://localhost:55-1/recipes.json'); 
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
          <h3>${recipe.title}</h3>
          <img src="${recipe.image}" alt="${recipe.title}" />
          <p>${recipe.description}</p>
          <h4>Ingredients:</h4>
          <ul>${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
          <h4>Instructions:</h4>
          <ol>${recipe.instructions.map(step => `<li>${step}</li>`).join('')}</ol>
        </div>
      `;
      recipeContainer.innerHTML += recipeCard;
    });
  }
  
  // Call the fetchRecipes function to load the recipes
  fetchRecipes();
  