import { Link, useLocation } from "wouter";

function MobileNavigation() {
  const [location] = useLocation();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-50">
      <div className="flex justify-around py-2">
        <Link to="/">
          <div className={`flex flex-col items-center p-2 ${location === "/" ? "text-primary-500" : "text-neutral-500"}`}>
            <i className="ri-dashboard-line text-xl"></i>
            <span className="text-xs mt-1">Home</span>
          </div>
        </Link>
        <Link to="/meal-plans">
          <div className={`flex flex-col items-center p-2 ${location === "/meal-plans" ? "text-primary-500" : "text-neutral-500"}`}>
            <i className="ri-restaurant-line text-xl"></i>
            <span className="text-xs mt-1">Meals</span>
          </div>
        </Link>
        <Link to="/nutrition">
          <div className={`flex flex-col items-center p-2 ${location === "/nutrition" ? "text-primary-500" : "text-neutral-500"}`}>
            <i className="ri-heart-pulse-line text-xl"></i>
            <span className="text-xs mt-1">Nutrition</span>
          </div>
        </Link>
        <Link to="/progress">
          <div className={`flex flex-col items-center p-2 ${location === "/progress" ? "text-primary-500" : "text-neutral-500"}`}>
            <i className="ri-line-chart-line text-xl"></i>
            <span className="text-xs mt-1">Progress</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default MobileNavigation;
