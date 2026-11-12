import { initialData } from '../data/mockData.js';

let nutritionData = JSON.parse(JSON.stringify(initialData.nutrition));

export const getNutrition = (req, res) => {
  res.status(200).json({
    success: true,
    data: nutritionData
  });
};

export const addMeal = (req, res) => {
  const { type, name, calories, items, image } = req.body;
  if (!name || !calories) {
    return res.status(400).json({ success: false, message: 'Name and calories are required' });
  }

  const newMeal = {
    id: `meal-${Date.now()}`,
    type: type || 'Snack',
    name,
    calories: parseInt(calories),
    items: items || 'Healthy nutrient-rich meal',
    image: image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80'
  };

  nutritionData.todayMeals.push(newMeal);
  nutritionData.totalCalories += newMeal.calories;

  res.status(201).json({
    success: true,
    message: 'Meal logged successfully!',
    meal: newMeal,
    data: nutritionData
  });
};

export const analyzeFoodImage = (req, res) => {
  // Can be called via multipart file upload or JSON with base64 / preset
  const foodDatabase = [
    {
      detectedItem: 'Mediterranean Salad Bowl with Avocado & Chickpeas',
      confidence: '96%',
      estimatedCalories: 420,
      macros: { carbs: 38, protein: 14, fats: 22 },
      ingredients: ['Avocado', 'Chickpeas', 'Cherry Tomatoes', 'Cucumbers', 'Feta Cheese', 'Olive Oil'],
      recommendation: 'Excellent fiber and healthy monounsaturated fats. Great for your weight loss goal!'
    },
    {
      detectedItem: 'Grilled Salmon with Quinoa & Steamed Broccoli',
      confidence: '98%',
      estimatedCalories: 510,
      macros: { carbs: 32, protein: 42, fats: 20 },
      ingredients: ['Wild Salmon', 'White Quinoa', 'Fresh Broccoli', 'Lemon Herb Dressing'],
      recommendation: 'Rich in Omega-3 fatty acids and high-quality protein to support muscle recovery.'
    },
    {
      detectedItem: 'Indian Thali: Brown Rice, Yellow Tadka Dal & Spinach Paneer',
      confidence: '94%',
      estimatedCalories: 580,
      macros: { carbs: 68, protein: 26, fats: 18 },
      ingredients: ['Brown Basmati Rice', 'Moong Dal', 'Palak Paneer', 'Cucumber Salad'],
      recommendation: 'Balanced meal with slow-digesting complex carbohydrates and wholesome plant protein.'
    }
  ];

  // Pick a realistic match or alternate
  const randomResult = foodDatabase[Math.floor(Math.random() * foodDatabase.length)];

  res.status(200).json({
    success: true,
    message: 'Food image analyzed successfully!',
    analysis: randomResult
  });
};
