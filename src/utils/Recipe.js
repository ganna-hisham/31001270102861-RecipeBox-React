class Recipe {
  constructor(
    id,
    title,
    ingredients,
    instructions,
    cookTime,
    category,
    difficulty
  ) {
    this.id = id;
    this.title = title;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.cookTime = cookTime;
    this.category = category;
    this.difficulty = difficulty;
  }
  get difficulty() {
    return this._difficulty;
  }

  set difficulty(level) {
    if (level === 'Hard' || level === 'Medium' || level === 'Easy') {
      this._difficulty = level;
    } else {
      console.log('undefined difficulty level');
    }
  }
}
export default Recipe;
