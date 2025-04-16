import { Button } from "@/components/ui/button";

function TodaysMeals({ meals, onLogMeal }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium font-montserrat">Today's Meals</h3>
        <button className="text-primary-500 hover:text-primary-700 text-sm font-medium">
          <i className="ri-edit-line mr-1"></i> Edit
        </button>
      </div>
      
      <div className="space-y-4">
        {meals.map((meal) => (
          <div key={meal.id} className="flex items-start">
            <div className={`${meal.isLogged ? 'bg-primary-100' : 'bg-neutral-200'} rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0`}>
              <i className={`${meal.icon} ${meal.isLogged ? 'text-primary-600' : 'text-neutral-600'}`}></i>
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-neutral-800">{meal.type}</h4>
              <p className="text-sm text-neutral-600">{meal.name}</p>
              <p className="text-xs text-neutral-500 mt-1">
                {meal.calories} kcal • {meal.protein}g protein • {meal.carbs}g carbs
              </p>
            </div>
            <div className="ml-auto">
              {meal.isLogged ? (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                  <i className="ri-check-line mr-1"></i> Logged
                </span>
              ) : (
                <button 
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800 hover:bg-primary-200"
                  onClick={() => onLogMeal(meal.id)}
                >
                  <i className="ri-add-line mr-1"></i> Log
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <Button
        variant="outline" 
        className="w-full mt-5 py-2 border border-primary-500 text-primary-500 rounded-md hover:bg-primary-50 transition-colors duration-200 flex items-center justify-center"
      >
        <i className="ri-add-line mr-1"></i> Add Food
      </Button>
    </div>
  );
}

export default TodaysMeals;
