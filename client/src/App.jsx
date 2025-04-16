import { Switch, Route } from "wouter";
import { useState, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient.js";
import { Toaster } from "./components/ui/toaster";
import Dashboard from "./pages/Dashboard";
import MealPlans from "./pages/MealPlans";
import Nutrition from "./pages/Nutrition";
import Progress from "./pages/Progress";
import NotFound from "./pages/not-found";
import Navbar from "./components/Navbar";
import MobileNavigation from "./components/MobileNavigation";
import OnboardingModal from "./components/OnboardingModal";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/meal-plans" component={MealPlans} />
      <Route path="/nutrition" component={Nutrition} />
      <Route path="/progress" component={Progress} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check if user has completed onboarding before
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding');
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleCompleteOnboarding = () => {
    localStorage.setItem('hasCompletedOnboarding', 'true');
    setShowOnboarding(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow mb-16 md:mb-0">
          {showOnboarding && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden fade-in">
                <OnboardingModal onComplete={handleCompleteOnboarding} />
              </div>
            </div>
          )}
          <Router />
        </main>
        <MobileNavigation />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;