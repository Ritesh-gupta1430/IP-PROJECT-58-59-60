import { useState } from "react";
import FoodItem from "@/components/FoodItem";
import { useNutrition } from "@/hooks/useNutrition";

function Nutrition() {
  const { foodItems, categories, searchFood, filterByCategory } = useNutrition();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [displayedItems, setDisplayedItems] = useState(4); // Number of items to display initially
  
  const handleSearch = (e) => {
    e.preventDefault();
    searchFood(searchQuery);
  };
  
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    filterByCategory(category);
    setDisplayedItems(4); // Reset displayed items when changing category
  };
  
  const handleLoadMore = () => {
    setDisplayedItems(prev => prev + 4);
  };
  
  const visibleFoodItems = foodItems.slice(0, displayedItems);

  return (
    <section className="container mx-auto px-4 py-8 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold font-montserrat text-center mb-8">Food Database</h2>
        
        <form onSubmit={handleSearch} className="relative mb-8">
          <input 
            type="text" 
            placeholder="Search for foods (e.g., 'chicken breast', 'apple', 'quinoa')" 
            className="w-full p-4 pr-12 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500 transition" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            type="submit"
            className="absolute right-4 top-4 text-neutral-500 hover:text-primary-500"
          >
            <i className="ri-search-line text-xl"></i>
          </button>
        </form>
        
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button 
                key={category}
                className={`px-4 py-2 rounded-md ${activeCategory === category 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50'}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Food Items List */}
        <div className="bg-neutral-50 rounded-lg p-4">
          {visibleFoodItems.length > 0 ? (
            <>
              {visibleFoodItems.map(food => (
                <FoodItem key={food.id} food={food} />
              ))}
              
              {displayedItems < foodItems.length && (
                <div className="mt-6 text-center">
                  <button 
                    className="px-4 py-2 text-primary-500 font-medium hover:text-primary-600 inline-flex items-center"
                    onClick={handleLoadMore}
                  >
                    <i className="ri-arrow-down-line mr-1"></i> Load More
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-neutral-600">No food items found. Try a different search term.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
export default Nutrition;
