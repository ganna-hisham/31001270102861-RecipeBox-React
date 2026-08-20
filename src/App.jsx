import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Recipe from './utils/Recipe.js';
import RecipeCard from './RecipeCard.jsx';
import AddEditRecipeForm from './AddEditRecipeForm.jsx';
import Layout from './Layout.jsx';
import NotFound from './NotFound.jsx';
import { filterRecipes, searchRecipes } from './utils/helpers.js';

function MainApp() {
  const navigate = useNavigate();
  const [editingRecipe, setEditingRecipe] = useState(null);

  const [recipes, setRecipes] = useState(() => {
    const savedRecipes = localStorage.getItem('recipes_data');
    if (savedRecipes) {
      try {
        const parsed = JSON.parse(savedRecipes);
        return parsed.map(
          (r) =>
            new Recipe(
              r.id,
              r.title,
              r.ingredients,
              r.instructions,
              r.cookTime,
              r.category,
              r.difficulty
            )
        );
      } catch (e) {
        console.error('Failed to parse recipes from localStorage', e);
      }
    }
    return [
      new Recipe(
        1,
        'koshary',
        ['rice', 'pasta', 'sauce'],
        'boil and mix',
        '30min',
        'main',
        'Medium'
      ),
      new Recipe(
        2,
        'salad',
        ['tomato', 'cucumber'],
        'cut and mix',
        '10min',
        'starter',
        'Easy'
      ),
    ];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('recipes_data', JSON.stringify(recipes));
  }, [recipes]);

  const handleDeleteRecipe = (id) => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this recipe?'
    );
    if (isConfirmed) {
      setRecipes(recipes.filter((recipe) => recipe.id !== id));
    }
  };

  const handleSaveRecipe = (formDataOrUpdatedObject) => {
    if (editingRecipe) {
      setRecipes(
        recipes.map((r) =>
          r.id === formDataOrUpdatedObject.id ? formDataOrUpdatedObject : r
        )
      );
      setEditingRecipe(null);
    } else {
      const newRecipeObj = new Recipe(
        Date.now(),
        formDataOrUpdatedObject.title,
        formDataOrUpdatedObject.ingredients,
        formDataOrUpdatedObject.instructions,
        formDataOrUpdatedObject.cookTime,
        formDataOrUpdatedObject.category,
        formDataOrUpdatedObject.difficulty
      );
      setRecipes([...recipes, newRecipeObj]);
    }
  };

  const handleStartEdit = (recipe) => {
    setEditingRecipe(recipe);
    navigate('/add');
  };

  let filtered = searchRecipes(recipes, searchTerm);
  filtered = filterRecipes(filtered, categoryFilter, difficultyFilter);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <div className="app-container">
              <div className="search-filter-section">
                <input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="main">Main</option>
                  <option value="starter">Starter</option>
                  <option value="dessert">Dessert</option>
                </select>

                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                >
                  <option value="">All Difficulties</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div className="recipe-list">
                {filtered.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onEdit={() => handleStartEdit(recipe)}
                    onDelete={() => handleDeleteRecipe(recipe.id)}
                  />
                ))}
              </div>
            </div>
          }
        />

        
        <Route
          path="add"
          element={
            <div className="app-container">
              <AddEditRecipeForm
                recipeToEdit={editingRecipe}
                onSave={handleSaveRecipe}
              />
            </div>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}

export default App;