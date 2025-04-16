import { useState, useEffect } from 'react';
import { foodDatabase } from '@/data/foodDatabase';

export function useNutrition() {
  const [foodItems, setFoodItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [consumedItems, setConsumedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Available food categories
  const categories = ["All", "Fruits", "Vegetables", "Proteins", "Grains", "Dairy"];
  
  useEffect(() => {
    // Initialize food items
    setFoodItems(foodDatabase);
    setFilteredItems(foodDatabase);
    
    // Load consumed items from localStorage
    try {
      const saved = localStorage.getItem('consumedItems');
      if (saved) {
        setConsumedItems(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading consumed items:', error);
    }
    
    setLoading(false);
  }, []);
  
  const searchFood = (query) => {
    if (!query.trim()) {
      setFilteredItems(foodItems);
      return;
    }
    
    const searchTerm = query.toLowerCase();
    const results = foodItems.filter(food => 
      food.name.toLowerCase().includes(searchTerm) ||
      food.category.toLowerCase().includes(searchTerm)
    );
    
    setFilteredItems(results);
  };
  
  const filterByCategory = (category) => {
    if (category === "All") {
      setFilteredItems(foodItems);
      return;
    }
    
    const results = foodItems.filter(food => 
      food.category === category
    );
    
    setFilteredItems(results);
  };
  
  const addConsumedItem = (foodItem, quantity = 1, mealType = 'snack') => {
    try {
      const newItem = {
        ...foodItem,
        quantity,
        mealType,
        timestamp: new Date().toISOString(),
        id: Date.now() // Generate unique ID for this consumed item
      };
      
      const updated = [...consumedItems, newItem];
      localStorage.setItem('consumedItems', JSON.stringify(updated));
      setConsumedItems(updated);
      return true;
    } catch (error) {
      console.error('Error adding consumed item:', error);
      return false;
    }
  };
  
  const removeConsumedItem = (itemId) => {
    try {
      const updated = consumedItems.filter(item => item.id !== itemId);
      localStorage.setItem('consumedItems', JSON.stringify(updated));
      setConsumedItems(updated);
      return true;
    } catch (error) {
      console.error('Error removing consumed item:', error);
      return false;
    }
  };
  
  const clearConsumedItems = () => {
    try {
      localStorage.removeItem('consumedItems');
      setConsumedItems([]);
      return true;
    } catch (error) {
      console.error('Error clearing consumed items:', error);
      return false;
    }
  };
  
  const getTodaysNutrition = () => {
    const today = new Date().toISOString().split('T')[0];
    
    // Filter to today's items
    const todaysItems = consumedItems.filter(item => {
      const itemDate = new Date(item.timestamp).toISOString().split('T')[0];
      return itemDate === today;
    });
    
    // Calculate totals
    const totals = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sugar: 0
    };
    
    todaysItems.forEach(item => {
      totals.calories += (item.calories * item.quantity);
      totals.protein += (item.protein * item.quantity);
      totals.carbs += (item.carbs * item.quantity);
      totals.fat += (item.fat * item.quantity);
      
      if (item.fiber) totals.fiber += (item.fiber * item.quantity);
      if (item.sugar) totals.sugar += (item.sugar * item.quantity);
    });
    
    // Round values
    Object.keys(totals).forEach(key => {
      totals[key] = Math.round(totals[key]);
    });
    
    return {
      totals,
      items: todaysItems
    };
  };
  
  return {
    foodItems: filteredItems,
    categories,
    consumedItems,
    loading,
    searchFood,
    filterByCategory,
    addConsumedItem,
    removeConsumedItem,
    clearConsumedItems,
    getTodaysNutrition
  };
}
