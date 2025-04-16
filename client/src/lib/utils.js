/**
 * Utility to merge multiple class names together
 * @param  {...string} classes - Class names to combine
 * @returns {string} Combined class names
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Formats a date string to a more readable format
 * @param {string} dateStr - ISO date string
 * @returns {string} Formatted date
 */
export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

/**
 * Calculates the basal metabolic rate (BMR) using the Mifflin-St Jeor Equation
 * @param {Object} userData - User profile data
 * @returns {number} BMR value
 */
export function calculateBMR(userData) {
  const { gender, weight, height, age } = userData;
  let bmr = 0;
  
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  
  return Math.round(bmr);
}

/**
 * Calculates total daily energy expenditure based on BMR and activity level
 * @param {number} bmr - Basal metabolic rate
 * @param {string} activityLevel - Activity level descriptor
 * @returns {number} TDEE value
 */
export function calculateTDEE(bmr, activityLevel) {
  let multiplier = 1.2; // Sedentary
  
  switch (activityLevel) {
    case 'light': multiplier = 1.375; break;
    case 'moderate': multiplier = 1.55; break;
    case 'very': multiplier = 1.725; break;
    case 'extra': multiplier = 1.9; break;
    default: multiplier = 1.2;
  }
  
  return Math.round(bmr * multiplier);
}

/**
 * Returns a percentage based on current and target values
 * @param {number} current - Current value
 * @param {number} target - Target value
 * @returns {number} Percentage (0-100)
 */
export function calculatePercentage(current, target) {
  return Math.min(Math.round((current / target) * 100), 100);
}

/**
 * Generates a recommendation based on nutritional data
 * @param {Object} nutritionData - User's nutrition data
 * @returns {string} Recommendation text
 */
export function generateRecommendation(nutritionData) {
  const { protein, calories, carbs, fat } = nutritionData;
  
  if (protein.current < protein.target * 0.7) {
    return "Try to increase your protein intake today. Consider having a protein-rich snack like Greek yogurt or a protein shake.";
  }
  
  if (calories.current > calories.target * 0.9) {
    return "You're close to your daily calorie goal. Consider lighter options for your remaining meals today.";
  }
  
  if (carbs.current > carbs.target * 0.8) {
    return "Your carbohydrate intake is getting high. Focus on protein and vegetables for your next meal.";
  }
  
  if (fat.current < fat.target * 0.5) {
    return "Consider including some healthy fats like avocado, nuts, or olive oil in your upcoming meals.";
  }
  
  return "You're on track with your nutrition goals today. Keep it up!";
}
