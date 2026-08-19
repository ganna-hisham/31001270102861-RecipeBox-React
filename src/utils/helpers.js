function filterCategory(recipes, category) {
  try {
    if (!Array.isArray(recipes) || typeofcategory !== 'string') {
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

export { filterCategory, getRecipesTitle, getTotalCookingTime };
