
// fetching api
async function searchRecipe() {
    const searchQuery = document.getElementById('searching').value;
    const url = `https://yummly2.p.rapidapi.com/feeds/search?start=0&maxResult=20&maxTotalTimeInSeconds=7200&q=${searchQuery}&allowedAttribute=diet-lacto-vegetarian&allowedAttribute=low-fodmap&FAT_KCALMax=1000`; 

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '9028f5971amsh37ee03973a33ab9p17b4fjsn1047fac51847',
            'x-rapidapi-host': 'yummly2.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        displayRecipes(result.feed); 
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

//  displaying recipes
function displayRecipes(recipes) {
    const recipeContainer = document.getElementById('recipe-results');
    recipeContainer.innerHTML = ''; 

    if (!recipes || recipes.length === 0) {
        recipeContainer.innerHTML = '<p>No recipes found. Try another search.</p>';
        return;
    }

    recipes.forEach(recipe => {
        const recipeCard = `
            <div class="recipe-card">
                <h3>${recipe.display.displayName}</h3>
                <img src="${recipe.display.images[0]}" alt="${recipe.display.displayName}" />
            </div>
        `;
        recipeContainer.innerHTML += recipeCard;
    });
}
