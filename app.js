// app.js

async function searchRecipe() {
    const searchQuery = document.getElementById('searching').value;
    const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=${searchQuery}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '9028f5971amsh37ee03973a33ab9p17b4fjsn1047fac51847',
            'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        displayRecipes(result.results);
    } catch (error) {
        console.error(error);
    }
}

function displayRecipes(recipes) {
    const recipeContainer = document.getElementById('recipe-results');
    recipeContainer.innerHTML = ''; // Clear previous results

    if (recipes.length === 0) {
        recipeContainer.innerHTML = '<p>No recipes found. Try another search.</p>';
        return;
    }

    recipes.forEach(recipe => {
        const recipeCard = `
            <div class="recipe-card">
                <h3>${recipe.title}</h3>
                <img src="${recipe.image}" alt="${recipe.title}" />
            </div>
        `;
        recipeContainer.innerHTML += recipeCard;
    });
}
