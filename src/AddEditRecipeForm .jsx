import { useState, useEffect } from 'react';
// استوردنا ملف الـ validators اللي عملتوه في Task 1
import { validateRecipe } from './utils/validators.js';

function AddEditRecipeForm({ recipeToEdit, onSave }) {
  // 1. حالات الـ State لكل Input
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');

  // مسك الأخطاء للـ Immediate Feedback
  const [errors, setErrors] = useState({});

  // 2. لو بنعدل (recipeToEdit موجود)، املي الفورمة ببياناته
  useEffect(() => {
    if (recipeToEdit) {
      setTitle(recipeToEdit.title || '');
      // المكونات لو Array بنحولها لـ String مصلول بفاصلة عشان نكتبها بسهولة في الـ Input
      setIngredients(
        Array.isArray(recipeToEdit.ingredients)
          ? recipeToEdit.ingredients.join(', ')
          : recipeToEdit.ingredients || ''
      );
      setInstructions(recipeToEdit.instructions || '');
      setCookTime(recipeToEdit.cookTime || '');
      setCategory(recipeToEdit.category || '');
      setDifficulty(recipeToEdit.difficulty || 'Easy');
    }
  }, [recipeToEdit]);

  // 3. دالة التحقق أثناء الكتابة
  const validateField = (fieldData) => {
    const validationErrors = validateRecipe(fieldData);
    setErrors(validationErrors || {});
    return !validationErrors || Object.keys(validationErrors).length === 0;
  };

  // 4. عند الـ Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // تحويل المكونات لـ Array
    const ingredientsArray =
      typeof ingredients === 'string'
        ? ingredients
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean)
        : ingredients;

    const formData = {
      title,
      ingredients: ingredientsArray,
      instructions,
      cookTime,
      category,
      difficulty,
    };

    // نتحقق من البيانات بالـ validator الأول
    const isValid = validateField(formData);
    if (!isValid) return; // نوقف اللوجيك لو فيه أخطاء

    if (recipeToEdit) {
      // ⚠️ مهم جداً: في حالة التعديل بنعدل نفس الـ Object الأصلي
      recipeToEdit.title = title;
      recipeToEdit.ingredients = ingredientsArray;
      recipeToEdit.instructions = instructions;
      recipeToEdit.cookTime = cookTime;
      recipeToEdit.category = category;
      recipeToEdit.difficulty = difficulty;

      onSave(recipeToEdit);
    } else {
      // في حالة الإضافة بنبعت البيانات لـ App.jsx ينشئ بيها object جديد بـ Constructor
      onSave(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <h2>{recipeToEdit ? 'Edit Recipe' : 'Add New Recipe'}</h2>

      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>

      <div>
        <label>Ingredients (comma separated):</label>
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        {errors.ingredients && (
          <span className="error">{errors.ingredients}</span>
        )}
      </div>

      <div>
        <label>Instructions:</label>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
        {errors.instructions && (
          <span className="error">{errors.instructions}</span>
        )}
      </div>

      <div>
        <label>Cook Time:</label>
        <input
          type="text"
          value={cookTime}
          onChange={(e) => setCookTime(e.target.value)}
        />
        {errors.cookTime && <span className="error">{errors.cookTime}</span>}
      </div>

      <div>
        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        {errors.category && <span className="error">{errors.category}</span>}
      </div>

      <div>
        <label>Difficulty:</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <button type="submit">
        {recipeToEdit ? 'Update Recipe' : 'Add Recipe'}
      </button>
    </form>
  );
}

export default AddEditRecipeForm;
