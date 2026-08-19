function validateTitle(title) {
  const titleRegex = /^[a-zA-z0-9\s]{3,50}$/;

  return titleRegex.test(title);
}

function validateCookingTime(cookingTime) {
  const cookTimeRegex = /^\d+\s?(mins|min|hours|hour|m|h)$/i;
  return cookTimeRegex.test(cookingTime);
}

export { validateTitle, validateCookingTime };
