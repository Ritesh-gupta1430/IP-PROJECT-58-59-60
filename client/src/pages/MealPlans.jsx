import { useState } from "react";
import MealPlanCard from "@/components/MealPlanCard";
import { useMealPlans } from "@/hooks/useMealPlans";

function MealPlans() {
  const { mealPlans, generateNewRecommendations } = useMealPlans();
  const [activeDietType, setActiveDietType] = useState("Weight Loss");
  
  const dietTypes = ["Weight Loss", "Balanced", "High Protein", "Vegetarian"];
  
  const filteredMealPlans = mealPlans.filter(plan => 
    plan.dietType === activeDietType
  );

  return (
    <section className="container mx-auto px-4 py-8 bg-neutral-50">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl md:text-3xl font-bold font-montserrat mb-4">Your Personalized Meal Plans</h2>
        <p className="text-neutral-600">Custom diet recommendations based on your profile, goals, and preferences</p>
      </div>
      
      {/* Diet Plan Tabs */}
      <div className="flex flex-wrap justify-center mb-8">
        {dietTypes.map(dietType => (
          <button 
            key={dietType}
            className={`px-4 py-2 rounded-md mr-2 mb-2 ${activeDietType === dietType ? 'bg-primary-500 text-white' : 'bg-white text-neutral-700 hover:bg-neutral-100'}`}
            onClick={() => setActiveDietType(dietType)}
          >
            {dietType}
          </button>
        ))}
      </div>
      
      {/* Meal Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMealPlans.map(mealPlan => (
          <MealPlanCard 
            key={mealPlan.id} 
            mealPlan={mealPlan} 
          />
        ))}
      </div>
      
      <div className="text-center mt-8">
        <button 
          className="px-6 py-3 bg-white border border-primary-500 text-primary-500 rounded-md hover:bg-primary-50 transition-colors duration-200 inline-flex items-center"
          onClick={generateNewRecommendations}
        >
          <i className="ri-refresh-line mr-2"></i> Generate New Recommendations
        </button>
      </div>
    </section>
  );
}

export default MealPlans;
