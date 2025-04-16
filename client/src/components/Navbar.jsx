import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx";

function Navbar() {
  const [location] = useLocation();
  const [showGetStarted, setShowGetStarted] = useState(true);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg className="w-8 h-8 text-primary-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l.707.707L15.414 4l.707-.707A1 1 0 0118 4v10a1 1 0 01-1 1H9a1 1 0 01-1-1V4a1 1 0 011-1h3z" clipRule="evenodd"></path>
          </svg>
          <Link to="/">
            <div className="text-xl font-bold font-montserrat text-neutral-900">NutriPlan</div>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/">
            <div className={`font-medium ${location === "/" ? "text-primary-500" : "text-neutral-600 hover:text-primary-500"} transition-colors duration-200`}>Dashboard</div>
          </Link>
          <Link to="/meal-plans">
            <div className={`font-medium ${location === "/meal-plans" ? "text-primary-500" : "text-neutral-600 hover:text-primary-500"} transition-colors duration-200`}>Meal Plans</div>
          </Link>
          <Link to="/nutrition">
            <div className={`font-medium ${location === "/nutrition" ? "text-primary-500" : "text-neutral-600 hover:text-primary-500"} transition-colors duration-200`}>Nutrition</div>
          </Link>
          <Link to="/progress">
            <div className={`font-medium ${location === "/progress" ? "text-primary-500" : "text-neutral-600 hover:text-primary-500"} transition-colors duration-200`}>Progress</div>
          </Link>
        </nav>
        
        <div className="flex items-center space-x-3">
          {showGetStarted && (
            <Button 
              className="hidden md:block px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors duration-200"
              onClick={() => setShowGetStarted(false)}
            >
              Get Started
            </Button>
          )}
          
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-neutral-200 text-neutral-700 hover:bg-neutral-300 transition-colors duration-200"
                >
                  <i className="ri-user-line"></i>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link to="/profile">
                    <div className="w-full">Profile Settings</div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
