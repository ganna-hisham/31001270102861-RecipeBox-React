import CookingTimer from './CookingTimer.jsx';

function RecipeCard({ recipe, onEdit, onDelete }) {
  const { title, ingredients, cookTime, category, difficulty } = recipe;

  // استخراج الرقم من قيمة cookTime (مثلاً لو كانت '30min' ياخد 30)
  const parsedTime = parseInt(cookTime) || 10;

  return (
    <div className={`card ${difficulty}`}>
      <h3>{title}</h3>
      <p>{ingredients.length} ingredients</p>
      <p>
        {cookTime} mins --- {category}
      </p>
      <button>{difficulty}</button>

      {/* ⏱️ إضافة العداد */}
      <CookingTimer initialMinutes={parsedTime} />

      {/* أزرار التحكم */}
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

export default RecipeCard;
