function NutritionCharts({ data }) {
  const nutritionItems = [
    { label: "Calories", current: data.calories.current, target: data.calories.target, color: "bg-primary-500" },
    { label: "Protein", current: data.protein.current, target: data.protein.target, color: "bg-accent-500" },
    { label: "Carbs", current: data.carbs.current, target: data.carbs.target, color: "bg-secondary-500" },
    { label: "Fats", current: data.fats.current, target: data.fats.target, color: "bg-yellow-500" },
    { label: "Fiber", current: data.fiber.current, target: data.fiber.target, color: "bg-green-500" },
    { label: "Sugar", current: data.sugar.current, target: data.sugar.target, color: "bg-red-500" }
  ];

  const calculatePercentage = (current, target) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  return (
    <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium font-montserrat mb-4">Today's Nutrition</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {nutritionItems.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-neutral-700">{item.label}</span>
              <span className="text-sm font-medium text-neutral-500">
                {item.current} / {item.target}
                {item.label === "Calories" ? "" : "g"}
              </span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2.5">
              <div 
                className={`${item.color} h-2.5 rounded-full`} 
                style={{ width: `${calculatePercentage(item.current, item.target)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <div className="rounded-lg bg-primary-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <i className="ri-information-line text-primary-500 text-xl"></i>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-primary-800">Recommendation</h3>
              <div className="mt-2 text-sm text-primary-700">
                <p>Try to increase your protein intake today. Consider having a protein-rich snack like Greek yogurt or a protein shake.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NutritionCharts;
