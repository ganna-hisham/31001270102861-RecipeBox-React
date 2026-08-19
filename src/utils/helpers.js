function filterCategory(recipes, category) {
  try {
    if (!Array.isArray(recipes) || typeof category !== 'string') {
      throw new Error('Invalid recipes array or category!');
    }
    return recipes.filter((recipe) => recipe.category === category);
  } catch (error) {
    console.error('Invalid recipes!');
    throw new Error('you have entered an invalid category!');
  } finally {
    console.log('operation finished!');
  }
}

function getRecipesTitle(recipes) {
  try {
    if (!Array.isArray(recipes)) {
      throw new Error('Invalid recipes array!');
    }
    return recipes.map((recipe) => recipe.title);
  } catch (error) {
    console.error('Invalid recipes!');
    throw new Error('Invalid recipes array!');
  } finally {
    console.log('operation finished!');
  }
}

function getTotalCookingTime(recipes) {
  try {
    if (!Array.isArray(recipes)) {
      throw new Error('Invalid recipes array!');
    }
    return recipes.reduce((sum, recipe) => sum + parseInt(recipe.cookTime), 0);
  } catch (error) {
    console.error('Invalid recipes!');
    throw new Error('Invalid recipes array!');
  } finally {
    console.log('operation finished!');
  }
}

function filterRecipes(recipes, category, difficulty) {
  return recipes.filter((recipe) => {
    const matchesCategory = category ? recipe.category === category : true;
    const matchesDifficulty = difficulty ? recipe.difficulty === difficulty : true;
    return matchesCategory && matchesDifficulty;
  });
}

function searchRecipes(recipes, searchTerm) {
  if (!searchTerm) return recipes;
  return recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

export {
  filterCategory,
  getRecipesTitle,
  getTotalCookingTime,
  filterRecipes,
  searchRecipes
};