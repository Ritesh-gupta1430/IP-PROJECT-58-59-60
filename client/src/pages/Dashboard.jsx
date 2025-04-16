import { useState, useEffect } from "react";
import StatsCard from "@/components/StatsCard";
import NutritionCharts from "@/components/NutritionCharts";
import TodaysMeals from "@/components/TodaysMeals";
import { useUserProfile } from "@/hooks/useUserProfile";

function Dashboard() {
  const { userProfile } = useUserProfile();
  const [stats, setStats] = useState({
    calories: { value: 1850, target: 2200, status: "On Track", trend: "stable" },
    water: { value: 1.2, target: 2.5, status: "Below Target", trend: "down" },
    protein: { value: 65, target: 120, status: "55g Remaining", trend: "down" },
    weight: { value: 75.5, change: -0.5, trend: "down" }
  });

  const [nutritionData, setNutritionData] = useState({
    calories: { current: 1850, target: 2200 },
    protein: { current: 65, target: 120 },
    carbs: { current: 190, target: 250 },
    fats: { current: 50, target: 73 },
    fiber: { current: 15, target: 30 },
    sugar: { current: 28, target: 50 }
  });

  const [todaysMeals, setTodaysMeals] = useState([
    {
      id: 1,
      type: "Breakfast",
      name: "Greek Yogurt with Berries & Honey",
      calories: 380,
      protein: 25,
      carbs: 45,
      isLogged: true,
      icon: "ri-sun-line"
    },
    {
      id: 2,
      type: "Lunch",
      name: "Grilled Chicken Salad with Avocado",
      calories: 450,
      protein: 35,
      carbs: 20,
      isLogged: true,
      icon: "ri-sun-foggy-line"
    },
    {
      id: 3,
      type: "Snack",
      name: "Apple with Almond Butter",
      calories: 220,
      protein: 5,
      carbs: 25,
      isLogged: true,
      icon: "ri-seedling-line"
    },
    {
      id: 4,
      type: "Dinner",
      name: "Salmon with Quinoa and Vegetables",
      calories: 520,
      protein: 40,
      carbs: 35,
      isLogged: false,
      icon: "ri-moon-line"
    }
  ]);

  const handleLogMeal = (mealId) => {
    setTodaysMeals(meals => 
      meals.map(meal => 
        meal.id === mealId 
          ? {...meal, isLogged: true} 
          : meal
      )
    );
    
    // Update nutrition stats
    const mealToLog = todaysMeals.find(meal => meal.id === mealId);
    if (mealToLog) {
      setNutritionData(prev => ({
        ...prev,
        calories: { ...prev.calories, current: prev.calories.current + mealToLog.calories },
        protein: { ...prev.protein, current: prev.protein.current + mealToLog.protein },
        carbs: { ...prev.carbs, current: prev.carbs.current + mealToLog.carbs }
      }));
    }
  };

  return (
    <section className="container mx-auto px-4 py-6 md:py-10">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold font-montserrat mb-2">Welcome Back, {userProfile?.name || 'User'}!</h2>
          <p className="text-neutral-600">Here's your nutritional journey overview</p>
        </div>
        <div className="hidden md:block">
          <button className="px-4 py-2 bg-white border border-primary-500 text-primary-500 rounded-md hover:bg-primary-50 transition-colors duration-200 flex items-center">
            <i className="ri-download-line mr-2"></i> Export Progress
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard 
          title="Daily Calories" 
          value={stats.calories.value} 
          target={stats.calories.target}
          status={stats.calories.status} 
          trend={stats.calories.trend}
          icon="ri-fire-fill"
          color="primary"
        />
        <StatsCard 
          title="Water Intake" 
          value={`${stats.water.value} / ${stats.water.target}L`} 
          status={stats.water.status} 
          trend={stats.water.trend}
          icon="ri-water-flash-fill"
          color="secondary"
        />
        <StatsCard 
          title="Protein" 
          value={`${stats.protein.value}g / ${stats.protein.target}g`} 
          status={stats.protein.status} 
          trend={stats.protein.trend}
          icon="ri-heart-pulse-line"
          color="accent"
        />
        <StatsCard 
          title="Weight" 
          value={`${stats.weight.value} kg`} 
          status={`${stats.weight.change} kg This Week`} 
          trend={stats.weight.trend}
          icon="ri-scales-3-line"
          color="neutral"
        />
      </div>
      
      {/* Nutrition Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <NutritionCharts data={nutritionData} />
        <TodaysMeals meals={todaysMeals} onLogMeal={handleLogMeal} />
      </div>
    </section>
  );
}

export default Dashboard;
