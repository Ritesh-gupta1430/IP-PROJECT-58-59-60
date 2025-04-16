import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUserProfile } from "@/hooks/useUserProfile";

function OnboardingModal({ onComplete }) {
  const { saveUserProfile } = useUserProfile();
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    age: "",
    gender: "",
    goal: "",
    activity: "",
    dietType: "",
    allergies: {
      dairy: false,
      nuts: false,
      gluten: false,
      shellfish: false
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      allergies: {
        ...prev.allergies,
        [name]: checked
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save user profile
    saveUserProfile({
      ...formData,
      name: "John", // Default name, could be added to the form if needed
    });
    
    // Notify parent component
    onComplete();
  };

  return (
    <>
      <div className="bg-primary-500 py-4 px-6">
        <h2 className="text-white text-xl font-semibold font-montserrat">Welcome to NutriPlan!</h2>
        <p className="text-primary-100 text-sm mt-1">Let's set up your profile to get personalized diet recommendations</p>
      </div>
      
      <form className="p-6 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <h3 className="text-lg font-medium font-montserrat">Personal Information</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1" htmlFor="height">Height (cm)</label>
              <input 
                type="number" 
                id="height" 
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                className="w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring focus:ring-primary-200 transition" 
                placeholder="175" 
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1" htmlFor="weight">Weight (kg)</label>
              <input 
                type="number" 
                id="weight" 
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring focus:ring-primary-200 transition" 
                placeholder="70" 
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1" htmlFor="age">Age</label>
              <input 
                type="number" 
                id="age" 
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring focus:ring-primary-200 transition" 
                placeholder="28" 
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1" htmlFor="gender">Gender</label>
              <select 
                id="gender" 
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring focus:ring-primary-200 transition"
                required
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium font-montserrat">Dietary Preferences</h3>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1" htmlFor="goal">Your Goal</label>
            <select 
              id="goal" 
              name="goal"
              value={formData.goal}
              onChange={handleInputChange}
              className="w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring focus:ring-primary-200 transition"
              required
            >
              <option value="">Select your goal</option>
              <option value="lose">Lose Weight</option>
              <option value="maintain">Maintain Weight</option>
              <option value="gain">Gain Weight</option>
              <option value="muscle">Build Muscle</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1" htmlFor="activity">Activity Level</label>
            <select 
              id="activity" 
              name="activity"
              value={formData.activity}
              onChange={handleInputChange}
              className="w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring focus:ring-primary-200 transition"
              required
            >
              <option value="">Select activity level</option>
              <option value="sedentary">Sedentary (little or no exercise)</option>
              <option value="light">Lightly active (light exercise/sports 1-3 days/week)</option>
              <option value="moderate">Moderately active (moderate exercise/sports 3-5 days/week)</option>
              <option value="very">Very active (hard exercise/sports 6-7 days a week)</option>
              <option value="extra">Extra active (very hard exercise & physical job)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1" htmlFor="dietType">Diet Type</label>
            <select 
              id="dietType" 
              name="dietType"
              value={formData.dietType}
              onChange={handleInputChange}
              className="w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring focus:ring-primary-200 transition"
              required
            >
              <option value="">Select diet type</option>
              <option value="standard">Standard (No Restrictions)</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="keto">Ketogenic</option>
              <option value="paleo">Paleo</option>
              <option value="mediterranean">Mediterranean</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Food Allergies/Restrictions</label>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="allergy-dairy" 
                  name="dairy"
                  checked={formData.allergies.dairy}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500" 
                />
                <label htmlFor="allergy-dairy" className="ml-2 text-sm text-neutral-700">Dairy</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="allergy-nuts" 
                  name="nuts"
                  checked={formData.allergies.nuts}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500" 
                />
                <label htmlFor="allergy-nuts" className="ml-2 text-sm text-neutral-700">Nuts</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="allergy-gluten" 
                  name="gluten"
                  checked={formData.allergies.gluten}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500" 
                />
                <label htmlFor="allergy-gluten" className="ml-2 text-sm text-neutral-700">Gluten</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="allergy-shellfish" 
                  name="shellfish"
                  checked={formData.allergies.shellfish}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500" 
                />
                <label htmlFor="allergy-shellfish" className="ml-2 text-sm text-neutral-700">Shellfish</label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-4 flex justify-end">
          <Button 
            type="submit"
            className="px-6 py-2 bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Create My Plan
          </Button>
        </div>
      </form>
    </>
  );
}

export default OnboardingModal;
