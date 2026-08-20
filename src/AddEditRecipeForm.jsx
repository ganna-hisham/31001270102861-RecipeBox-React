import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AddEditRecipeForm({ recipeToEdit, onSave }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (recipeToEdit) {
      setTitle(recipeToEdit.title || '');
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!title.trim()) validationErrors.title = 'Title is required';
    if (!cookTime.trim()) validationErrors.cookTime = 'Cook time is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const ingredientsArray =
      typeof ingredients === 'string'
        ? ingredients.split(',').map((item) => item.trim()).filter(Boolean)
        : ingredients;

    const formData = {
      title,
      ingredients: ingredientsArray,
      instructions,
      cookTime,
      category,
      difficulty,
    };

    if (recipeToEdit) {
      onSave({ ...recipeToEdit, ...formData });
    } else {
      onSave(formData);
    }

    navigate('/');
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
      </div>

      <div>
        <label>Instructions:</label>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
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