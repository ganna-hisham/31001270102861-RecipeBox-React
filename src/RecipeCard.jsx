import CookingTimer from './CookingTimer.jsx';

function RecipeCard({ recipe, onEdit, onDelete }) {
  const { title, ingredients = [], cookTime, category, difficulty = 'Easy' } = recipe;

  const parsedTime = parseInt(cookTime) || 10;

  const formattedDifficulty = difficulty 
    ? difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase() 
    : 'Easy';

  return (
    <div className={`card ${formattedDifficulty}`}>
      <h3>{title}</h3>
      
      <p className="card-details">
        <span>{ingredients.length}</span> ingredients
      </p>
      
      <p className="card-details">
        {parsedTime} mins &bull; {category}
      </p>

      <div className="difficulty-btn">
        {formattedDifficulty}
      </div>

      <CookingTimer initialMinutes={parsedTime} />

      <div className="card-actions">
        <button className="edit-btn" onClick={onEdit}>Edit</button>
        <button className="delete-btn" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}

export default RecipeCard;