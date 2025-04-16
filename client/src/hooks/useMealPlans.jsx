import { useState, useEffect } from 'react';
import { useUserProfile } from './useUserProfile';
import { defaultMealPlans } from '@/data/mealPlans';

export function useMealPlans() {
  const { userProfile } = useUserProfile();
  const [mealPlans, setMealPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedMealPlans, setSavedMealPlans] = useState([]);
  
  useEffect(() => {
    // Load meal plans based on user profile
    const loadMealPlans = () => {
      try {
        // Check if user has saved meal plans
        const saved = localStorage.getItem('savedMealPlans');
        if (saved) {
          setSavedMealPlans(JSON.parse(saved));
        }
        
        if (userProfile) {
          // Filter meal plans based on user preferences
          const filtered = filterMealPlansByPreferences(defaultMealPlans);
          setMealPlans(filtered);
        } else {
          // Default meal plans if no user profile
          setMealPlans(defaultMealPlans);
        }
      } catch (error) {
        console.error('Error loading meal plans:', error);
        setMealPlans(defaultMealPlans);
      } finally {
        setLoading(false);
      }
    };
    
    loadMealPlans();
  }, [userProfile]);
  
  const filterMealPlansByPreferences = (plans) => {
    if (!userProfile) return plans;
    
    return plans.filter(plan => {
      // Filter by diet type if specified
      if (userProfile.dietType && userProfile.dietType !== 'standard') {
        if (plan.dietTypes && !plan.dietTypes.includes(userProfile.dietType)) {
          return false;
        }
      }
      
      // Filter out allergens
      if (userProfile.allergies) {
        for (const [allergen, isAllergic] of Object.entries(userProfile.allergies)) {
          if (isAllergic && plan.allergens && plan.allergens.includes(allergen)) {
            return false;
          }
        }
      }
      
      return true;
    });
  };
  
  const saveMealPlan = (mealPlanId) => {
    try {
      const planToSave = mealPlans.find(plan => plan.id === mealPlanId);
      if (!planToSave) return false;
      
      const updatedSaved = [...savedMealPlans, planToSave];
      localStorage.setItem('savedMealPlans', JSON.stringify(updatedSaved));
      setSavedMealPlans(updatedSaved);
      return true;
    } catch (error) {
      console.error('Error saving meal plan:', error);
      return false;
    }
  };
  
  const removeSavedMealPlan = (mealPlanId) => {
    try {
      const updatedSaved = savedMealPlans.filter(plan => plan.id !== mealPlanId);
      localStorage.setItem('savedMealPlans', JSON.stringify(updatedSaved));
      setSavedMealPlans(updatedSaved);
      return true;
    } catch (error) {
      console.error('Error removing saved meal plan:', error);
      return false;
    }
  };
  
  const generateNewRecommendations = () => {
    setLoading(true);
    
    // Simulate generating new recommendations
    setTimeout(() => {
      // In a real app, this would call an API or use a more sophisticated algorithm
      // For now, we'll just shuffle the existing meal plans
      const shuffled = [...defaultMealPlans]
        .sort(() => Math.random() - 0.5)
        .slice(0, 12);
      
      setMealPlans(shuffled);
      setLoading(false);
    }, 1000);
  };
  
  return {
    mealPlans,
    savedMealPlans,
    loading,
    saveMealPlan,
    removeSavedMealPlan,
    generateNewRecommendations
  };
}
