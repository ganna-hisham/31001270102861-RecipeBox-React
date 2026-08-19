import CookingTimer from './CookingTimer.jsx';

function RecipeCard({ recipe, onEdit, onDelete }) {
  const { title, ingredients = [], cookTime, category, difficulty = 'Easy' } = recipe;

  // استخراج الرقم فقط من قيمة cookTime
  const parsedTime = parseInt(cookTime) || 10;

  // توحيد أول حرف Uppercase عشان يمسك في الـ CSS الصح (Easy / Medium / Hard)
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

      {/* 🏷️ شارة الصعوبة */}
      <div className="difficulty-btn">
        {formattedDifficulty}
      </div>

      {/* ⏱️ العداد */}
      <CookingTimer initialMinutes={parsedTime} />

      {/* 🔘 أزرار التحكم */}
      <div className="card-actions">
        <button className="edit-btn" onClick={onEdit}>Edit</button>
        <button className="delete-btn" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}

export default RecipeCard;