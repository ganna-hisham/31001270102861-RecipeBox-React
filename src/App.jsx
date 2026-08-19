import { useState, useEffect } from 'react';
import Recipe from './utils/Recipe.js';
import RecipeCard from './RecipeCard.jsx';
import AddEditRecipeForm from './AddEditRecipeForm.jsx';
import { filterRecipes, searchRecipes } from './utils/helpers.js';

function App() {
  const [editingRecipe, setEditingRecipe] = useState(null);

  // 1. استرجاع الوصفات من localStorage أول ما الأبلكيشن يفتح (Lazy State Initialization)
  const [recipes, setRecipes] = useState(() => {
    const savedRecipes = localStorage.getItem('recipes_data');
    if (savedRecipes) {
      try {
        const parsed = JSON.parse(savedRecipes);
        // إعادتها كـ Objects من الـ Constructor الأصلي
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
    // القيمة الافتراضية لو الـ localStorage فاضي تماماً
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

  // 2. الحفظ في localStorage فوراً عند كل تغيير (Add, Edit, Delete)
  useEffect(() => {
    localStorage.setItem('recipes_data', JSON.stringify(recipes));
  }, [recipes]);

  // دالة الحذف بـ Confirmation
  const handleDeleteRecipe = (id) => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this recipe?'
    );
    if (isConfirmed) {
      setRecipes(recipes.filter((recipe) => recipe.id !== id));
    }
  };

  // دالة الحفظ (إضافة وتعديل)
  const handleSaveRecipe = (formDataOrUpdatedObject) => {
    if (editingRecipe) {
      setRecipes([...recipes]);
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

  let filtered = searchRecipes(recipes, searchTerm);
  filtered = filterRecipes(filtered, categoryFilter, difficultyFilter);

  return (
    <div className="app-container">
      {/* 🔍 البحث والفلترة */}
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

      {/* 📝 الفورمة */}
      <AddEditRecipeForm
        recipeToEdit={editingRecipe}
        onSave={handleSaveRecipe}
      />

      {/* 📋 القائمة */}
      <div className="recipe-list">
        {filtered.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onEdit={() => setEditingRecipe(recipe)}
            onDelete={() => handleDeleteRecipe(recipe.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
