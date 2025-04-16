import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function FoodItem({ food }) {
  const [showDetails, setShowDetails] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddFood = () => {
    // Add to the user's food log
    console.log(`Added ${quantity} servings of ${food.name}`);
    setShowDetails(false);
  };

  const getIconForCategory = (category) => {
    switch(category.toLowerCase()) {
      case 'fruits': return 'ri-apple-line';
      case 'vegetables': return 'ri-plant-line';
      case 'proteins': return 'ri-restaurant-line';
      case 'grains': return 'ri-seed-line';
      case 'dairy': return 'ri-water-flash-line';
      default: return 'ri-restaurant-line';
    }
  };

  return (
    <>
      <div 
        className="bg-white rounded-md p-4 mb-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => setShowDetails(true)}
      >
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-md bg-primary-100 flex items-center justify-center mr-4">
            <i className={`${getIconForCategory(food.category)} text-xl text-primary-600`}></i>
          </div>
          
          <div className="flex-grow">
            <h3 className="text-base font-medium font-montserrat">{food.name}</h3>
            <p className="text-sm text-neutral-600">
              {food.calories} kcal • {food.protein}g protein • {food.carbs}g carbs • {food.fat}g fat
            </p>
          </div>
          
          <button 
            className="ml-4 h-8 w-8 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-primary-50 hover:border-primary-500 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setShowDetails(true);
            }}
          >
            <i className="ri-add-line text-neutral-700 hover:text-primary-500"></i>
          </button>
        </div>
      </div>

      {/* Food Details Modal */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-montserrat">{food.name}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-neutral-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Nutrition Facts (per serving)</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Calories</span>
                  <span className="font-medium">{food.calories} kcal</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Protein</span>
                  <span className="font-medium">{food.protein}g</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Carbohydrates</span>
                  <span className="font-medium">{food.carbs}g</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Fat</span>
                  <span className="font-medium">{food.fat}g</span>
                </div>
                {food.fiber && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Fiber</span>
                    <span className="font-medium">{food.fiber}g</span>
                  </div>
                )}
                {food.sugar && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sugar</span>
                    <span className="font-medium">{food.sugar}g</span>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Quantity (servings)
              </label>
              <div className="flex items-center">
                <button 
                  className="px-3 py-1 border border-neutral-300 rounded-l-md bg-neutral-50 hover:bg-neutral-100"
                  onClick={() => setQuantity(prev => Math.max(prev - 0.5, 0.5))}
                >
                  -
                </button>
                <input 
                  type="number" 
                  value={quantity}
                  onChange={(e) => setQuantity(parseFloat(e.target.value) || 1)}
                  min="0.5"
                  step="0.5"
                  className="w-16 text-center border-y border-neutral-300 py-1"
                />
                <button 
                  className="px-3 py-1 border border-neutral-300 rounded-r-md bg-neutral-50 hover:bg-neutral-100"
                  onClick={() => setQuantity(prev => prev + 0.5)}
                >
                  +
                </button>
              </div>
            </div>
            
            {quantity > 0 && (
              <div className="bg-primary-50 p-3 rounded-lg">
                <h4 className="text-sm font-medium mb-1">Total for {quantity} {quantity === 1 ? 'serving' : 'servings'}</h4>
                <p className="text-sm">
                  {Math.round(food.calories * quantity)} kcal • 
                  {Math.round(food.protein * quantity)}g protein • 
                  {Math.round(food.carbs * quantity)}g carbs • 
                  {Math.round(food.fat * quantity)}g fat
                </p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowDetails(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-primary-500 hover:bg-primary-600"
              onClick={handleAddFood}
            >
              Add to Today
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default FoodItem;
