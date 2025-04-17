import { useState } from "react";
import { useProgress } from "@/hooks/useProgress";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Progress() {
  const { weightEntries, addWeightEntry, deleteWeightEntry, editWeightEntry } = useProgress();
  const [activeTab, setActiveTab] = useState("Weight");
  const [timePeriod, setTimePeriod] = useState("Last 30 Days");
  const [showAddEntryForm, setShowAddEntryForm] = useState(false);
  const [entryForm, setEntryForm] = useState({
    weight: "",
    date: new Date().toISOString().split('T')[0],
    notes: ""
  });
  const [editingEntryId, setEditingEntryId] = useState(null);

  const tabs = ["Weight", "Body Measurements", "Calories", "Macros"];
  const timePeriods = ["Last 30 Days", "Last 3 Months", "Last 6 Months", "Last Year"];

  const progressStats = {
    startingWeight: 78.2,
    currentWeight: 75.5,
    weightLost: -2.7,
    goalWeight: 70.0
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleTimePeriodChange = (e) => {
    setTimePeriod(e.target.value);
  };

  const toggleAddEntryForm = () => {
    setShowAddEntryForm(!showAddEntryForm);
    setEditingEntryId(null);
    setEntryForm({
      weight: "",
      date: new Date().toISOString().split('T')[0],
      notes: ""
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEntryForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingEntryId !== null) {
      editWeightEntry(editingEntryId, entryForm);
      setEditingEntryId(null);
    } else {
      addWeightEntry(entryForm);
    }
    setShowAddEntryForm(false);
    setEntryForm({
      weight: "",
      date: new Date().toISOString().split('T')[0],
      notes: ""
    });
  };

  const handleEditEntry = (entry) => {
    setEditingEntryId(entry.id);
    setEntryForm({
      weight: entry.weight,
      date: entry.date,
      notes: entry.notes
    });
    setShowAddEntryForm(true);
  };

  return (
    <section className="container mx-auto px-4 py-8 bg-neutral-50">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-2xl md:text-3xl font-bold font-montserrat mb-4">Your Progress</h2>
        <p className="text-neutral-600">Track your journey towards your health and fitness goals</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-wrap mb-4">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`mr-3 mb-2 px-4 py-1 text-sm rounded-full ${
                activeTab === tab
                  ? 'bg-primary-500 text-black'
                  : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50'
              }`}
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="flex justify-end mb-4">
          <div className="flex items-center space-x-2 text-sm text-neutral-600">
            <span>Time Period:</span>
            <select 
              className="bg-white border border-neutral-300 rounded py-1 px-2"
              value={timePeriod}
              onChange={handleTimePeriodChange}
            >
              {timePeriods.map(period => (
                <option key={period} value={period}>{period}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Progress Chart Placeholder */}
        <div className="bg-neutral-50 rounded p-4 h-64 flex items-center justify-center">
          <div className="text-center">
            <p className="text-neutral-500 mb-2">{activeTab} Progress Chart</p>
            <p className="text-sm text-neutral-400">
              Chart visualization would appear here
            </p>
          </div>
        </div>
        
        {/* Progress Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-neutral-50 p-4 rounded-lg">
            <p className="text-sm text-neutral-500 mb-1">Starting Weight</p>
            <p className="text-xl font-bold font-montserrat">{progressStats.startingWeight} kg</p>
          </div>
          
          <div className="bg-neutral-50 p-4 rounded-lg">
            <p className="text-sm text-neutral-500 mb-1">Current Weight</p>
            <p className="text-xl font-bold font-montserrat">{progressStats.currentWeight} kg</p>
          </div>
          
          <div className="bg-neutral-50 p-4 rounded-lg">
            <p className="text-sm text-neutral-500 mb-1">Weight Lost</p>
            <p className="text-xl font-bold font-montserrat text-green-500">{progressStats.weightLost} kg</p>
          </div>
          
          <div className="bg-neutral-50 p-4 rounded-lg">
            <p className="text-sm text-neutral-500 mb-1">Goal Weight</p>
            <p className="text-xl font-bold font-montserrat">{progressStats.goalWeight} kg</p>
          </div>
        </div>
      </div>
      
      {/* Weight Log Table */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium font-montserrat">Weight Log</h3>
          <Button
            onClick={toggleAddEntryForm}
            className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors duration-200 inline-flex items-center"
          >
            <i className="ri-add-line mr-1"></i> {editingEntryId !== null ? 'Edit Entry' : 'Add Entry'}
          </Button>
        </div>
        
        {/* Add/Edit Entry Form */}
        {showAddEntryForm && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <form onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1" htmlFor="date">
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={entryForm.date}
                      onChange={handleFormChange}
                      className="w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring focus:ring-primary-200 transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1" htmlFor="weight">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      id="weight"
                      name="weight"
                      step="0.1"
                      value={entryForm.weight}
                      onChange={handleFormChange}
                      className="w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring focus:ring-primary-200 transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1" htmlFor="notes">
                      Notes
                    </label>
                    <input
                      type="text"
                      id="notes"
                      name="notes"
                      value={entryForm.notes}
                      onChange={handleFormChange}
                      className="w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring focus:ring-primary-200 transition"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={toggleAddEntryForm}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-primary-500 text-white hover:bg-primary-600"
                  >
                    {editingEntryId !== null ? 'Update' : 'Save'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Weight</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Change</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Notes</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {weightEntries.map((entry) => (
                <tr key={entry.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">{entry.displayDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">{entry.weight} kg</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">{entry.change} kg</td>
                  <td className="px-6 py-4 text-sm text-neutral-900">{entry.notes}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      className="text-primary-500 hover:text-primary-700 mr-3"
                      onClick={() => handleEditEntry(entry)}
                    >
                      Edit
                    </button>
                    <button 
                      className="text-neutral-500 hover:text-neutral-700"
                      onClick={() => deleteWeightEntry(entry.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Progress;
