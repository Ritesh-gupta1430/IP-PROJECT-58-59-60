import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

function MealPlanCard({ mealPlan }) {
  const [isFavorite, setIsFavorite] = useState(mealPlan.isFavorite || false);
  const [showRecipe, setShowRecipe] = useState(false);
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  const handleViewRecipe = () => {
    setShowRecipe(true);
  };

  const getIconForMealType = (type) => {
    switch(type.toLowerCase()) {
      case 'breakfast': return 'ri-sun-line';
      case 'lunch': return 'ri-sun-foggy-line';
      case 'dinner': return 'ri-moon-line';
      case 'snack': return 'ri-seedling-line';
      default: return 'ri-restaurant-line';
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 meal-card">
        <div className="relative h-48 overflow-hidden">
          <div className="w-full h-full bg-primary-100 flex items-center justify-center">
            <i className={`${getIconForMealType(mealPlan.type)} text-5xl text-primary-500`}></i>
          </div>
          <div className="absolute top-0 right-0 m-3">
            <button 
              className="bg-white p-2 rounded-full shadow hover:bg-neutral-100 transition"
              onClick={toggleFavorite}
            >
              <i className={`${isFavorite ? 'ri-heart-fill text-red-500' : 'ri-heart-line text-neutral-600'}`}></i>
            </button>
          </div>
        </div>
        
        <div className="p-5">
          <div className="flex justify-between items-center mb-3">
            <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded">{mealPlan.type}</span>
            <span className="text-sm text-neutral-500">{mealPlan.calories} kcal</span>
          </div>
          
          <h3 className="text-lg font-semibold font-montserrat mb-2">{mealPlan.name}</h3>
          
          <div className="flex items-center mb-3">
            <div className="flex items-center mr-4">
              <i className="ri-time-line text-neutral-500 mr-1"></i>
              <span className="text-sm text-neutral-600">{mealPlan.prepTime} min</span>
            </div>
            <div className="flex items-center">
              <i className="ri-restaurant-line text-neutral-500 mr-1"></i>
              <span className="text-sm text-neutral-600">{mealPlan.difficulty}</span>
            </div>
          </div>
          
          <div className="flex space-x-3 mb-4">
            <div className="bg-neutral-100 rounded-full px-3 py-1 text-xs text-neutral-700">{mealPlan.protein}g protein</div>
            <div className="bg-neutral-100 rounded-full px-3 py-1 text-xs text-neutral-700">{mealPlan.carbs}g carbs</div>
            <div className="bg-neutral-100 rounded-full px-3 py-1 text-xs text-neutral-700">{mealPlan.fat}g fat</div>
          </div>
          
          <Button
            className="w-full py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors duration-200"
            onClick={handleViewRecipe}
          >
            View Recipe
          </Button>
        </div>
      </div>

      {/* Recipe Modal */}
      <Dialog open={showRecipe} onOpenChange={setShowRecipe}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-montserrat">{mealPlan.name}</DialogTitle>
            <DialogDescription className="flex items-center text-sm">
              <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded mr-2">{mealPlan.type}</span>
              <span className="text-neutral-500">{mealPlan.calories} kcal</span>
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Ingredients</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {mealPlan.ingredients && mealPlan.ingredients.map((ingredient, i) => (
                  <li key={i}>{ingredient}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Instructions</h4>
              <ol className="list-decimal pl-5 space-y-2 text-sm">
                {mealPlan.instructions && mealPlan.instructions.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Nutrition Facts</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-neutral-50 p-2 rounded">
                  <span className="font-medium">Calories:</span> {mealPlan.calories} kcal
                </div>
                <div className="bg-neutral-50 p-2 rounded">
                  <span className="font-medium">Protein:</span> {mealPlan.protein}g
                </div>
                <div className="bg-neutral-50 p-2 rounded">
                  <span className="font-medium">Carbs:</span> {mealPlan.carbs}g
                </div>
                <div className="bg-neutral-50 p-2 rounded">
                  <span className="font-medium">Fat:</span> {mealPlan.fat}g
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex justify-between">
            <Button 
              variant="outline" 
              className="border-primary-500 text-primary-500"
              onClick={() => toggleFavorite()}
            >
              <i className={`${isFavorite ? 'ri-heart-fill mr-1 text-red-500' : 'ri-heart-line mr-1'}`}></i>
              {isFavorite ? 'Saved' : 'Save'}
            </Button>
            <Button 
              className="bg-primary-500 hover:bg-primary-600"
              onClick={() => setShowRecipe(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default MealPlanCard;
