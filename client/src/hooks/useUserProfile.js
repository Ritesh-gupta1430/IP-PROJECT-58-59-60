import { useState, useEffect } from 'react';

export function useUserProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Load profile from localStorage on component mount
    const loadProfile = () => {
      try {
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
          setUserProfile(JSON.parse(savedProfile));
        }
      } catch (error) {
        console.error('Error loading user profile:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProfile();
  }, []);
  
  const saveUserProfile = (profileData) => {
    try {
      // Save to localStorage
      localStorage.setItem('userProfile', JSON.stringify(profileData));
      // Update state
      setUserProfile(profileData);
      return true;
    } catch (error) {
      console.error('Error saving user profile:', error);
      return false;
    }
  };
  
  const updateUserProfile = (updates) => {
    try {
      const updatedProfile = { ...userProfile, ...updates };
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      setUserProfile(updatedProfile);
      return true;
    } catch (error) {
      console.error('Error updating user profile:', error);
      return false;
    }
  };
  
  const calculateBMR = () => {
    if (!userProfile) return null;
    
    const { gender, weight, height, age } = userProfile;
    let bmr = 0;
    
    // Mifflin-St Jeor Equation
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    
    return Math.round(bmr);
  };
  
  const calculateDailyCalories = () => {
    if (!userProfile) return null;
    
    const bmr = calculateBMR();
    const { activity, goal } = userProfile;
    
    let activityMultiplier = 1.2; // Sedentary
    switch (activity) {
      case 'light': activityMultiplier = 1.375; break;
      case 'moderate': activityMultiplier = 1.55; break;
      case 'very': activityMultiplier = 1.725; break;
      case 'extra': activityMultiplier = 1.9; break;
      default: activityMultiplier = 1.2;
    }
    
    let tdee = Math.round(bmr * activityMultiplier);
    
    // Adjust based on goal
    switch (goal) {
      case 'lose': tdee -= 500; break; // Caloric deficit for weight loss
      case 'gain': tdee += 500; break; // Caloric surplus for weight gain
      case 'muscle': tdee += 300; break; // Slight surplus for muscle building
      default: break; // Maintain weight
    }
    
    return tdee;
  };
  
  return {
    userProfile,
    loading,
    saveUserProfile,
    updateUserProfile,
    calculateBMR,
    calculateDailyCalories
  };
}
