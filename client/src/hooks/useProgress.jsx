import { useState, useEffect } from 'react';

export function useProgress() {
  const [weightEntries, setWeightEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Load weight entries from localStorage
    const loadEntries = () => {
      try {
        const saved = localStorage.getItem('weightEntries');
        if (saved) {
          const entries = JSON.parse(saved);
          
          // Sort entries by date (newest first)
          const sorted = entries.sort((a, b) => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          
          // Calculate weight change between entries
          const entriesWithChange = sorted.map((entry, index, arr) => {
            if (index === arr.length - 1) {
              // First recorded entry has no change
              return { ...entry, change: 0 };
            }
            
            const nextEntry = arr[index + 1];
            const change = (parseFloat(entry.weight) - parseFloat(nextEntry.weight)).toFixed(1);
            return { 
              ...entry, 
              change: change,
              displayDate: formatDate(entry.date)
            };
          });
          
          setWeightEntries(entriesWithChange);
        } else {
          // Add some sample data if no entries exist
          const sampleEntries = [
            {
              id: 3,
              date: '2023-05-15',
              displayDate: 'May 15, 2023',
              weight: 75.5,
              change: -0.3,
              notes: 'Morning weigh-in, after cardio'
            },
            {
              id: 2,
              date: '2023-05-08',
              displayDate: 'May 8, 2023',
              weight: 75.8,
              change: -0.4,
              notes: 'Fasted weight'
            },
            {
              id: 1,
              date: '2023-05-01',
              displayDate: 'May 1, 2023',
              weight: 76.2,
              change: -0.5,
              notes: 'After weekend'
            }
          ];
          
          setWeightEntries(sampleEntries);
          localStorage.setItem('weightEntries', JSON.stringify(sampleEntries));
        }
      } catch (error) {
        console.error('Error loading weight entries:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadEntries();
  }, []);
  
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  const addWeightEntry = (entry) => {
    try {
      const newEntry = {
        ...entry,
        id: Date.now(),
        displayDate: formatDate(entry.date)
      };
      
      const updated = [newEntry, ...weightEntries];
      
      // Sort by date (newest first)
      const sorted = updated.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      
      // Recalculate changes
      const entriesWithChange = sorted.map((entry, index, arr) => {
        if (index === arr.length - 1) {
          // First recorded entry has no change
          return { ...entry, change: 0 };
        }
        
        const nextEntry = arr[index + 1];
        const change = (parseFloat(entry.weight) - parseFloat(nextEntry.weight)).toFixed(1);
        return { 
          ...entry, 
          change: change,
          displayDate: formatDate(entry.date)
        };
      });
      
      setWeightEntries(entriesWithChange);
      localStorage.setItem('weightEntries', JSON.stringify(entriesWithChange));
      return true;
    } catch (error) {
      console.error('Error adding weight entry:', error);
      return false;
    }
  };
  
  const deleteWeightEntry = (entryId) => {
    try {
      const filtered = weightEntries.filter(entry => entry.id !== entryId);
      
      // Recalculate changes after deletion
      const entriesWithChange = filtered.map((entry, index, arr) => {
        if (index === arr.length - 1) {
          // First recorded entry has no change
          return { ...entry, change: 0 };
        }
        
        const nextEntry = arr[index + 1];
        const change = (parseFloat(entry.weight) - parseFloat(nextEntry.weight)).toFixed(1);
        return { ...entry, change: change };
      });
      
      setWeightEntries(entriesWithChange);
      localStorage.setItem('weightEntries', JSON.stringify(entriesWithChange));
      return true;
    } catch (error) {
      console.error('Error deleting weight entry:', error);
      return false;
    }
  };
  
  const editWeightEntry = (entryId, updates) => {
    try {
      const entryIndex = weightEntries.findIndex(entry => entry.id === entryId);
      if (entryIndex === -1) return false;
      
      const updated = [...weightEntries];
      updated[entryIndex] = { 
        ...updated[entryIndex], 
        ...updates,
        displayDate: formatDate(updates.date)
      };
      
      // Sort by date (newest first)
      const sorted = updated.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      
      // Recalculate changes
      const entriesWithChange = sorted.map((entry, index, arr) => {
        if (index === arr.length - 1) {
          // First recorded entry has no change
          return { ...entry, change: 0 };
        }
        
        const nextEntry = arr[index + 1];
        const change = (parseFloat(entry.weight) - parseFloat(nextEntry.weight)).toFixed(1);
        return { ...entry, change: change };
      });
      
      setWeightEntries(entriesWithChange);
      localStorage.setItem('weightEntries', JSON.stringify(entriesWithChange));
      return true;
    } catch (error) {
      console.error('Error editing weight entry:', error);
      return false;
    }
  };
  
  const getWeightTrend = () => {
    if (weightEntries.length < 2) return 'stable';
    
    // Calculate average change over the last 3 entries or all if fewer
    const numEntries = Math.min(3, weightEntries.length);
    const recentEntries = weightEntries.slice(0, numEntries);
    
    const totalChange = recentEntries.reduce((sum, entry) => sum + parseFloat(entry.change), 0);
    const avgChange = totalChange / recentEntries.length;
    
    if (avgChange < -0.2) return 'down';
    if (avgChange > 0.2) return 'up';
    return 'stable';
  };
  
  return {
    weightEntries,
    loading,
    addWeightEntry,
    deleteWeightEntry,
    editWeightEntry,
    getWeightTrend
  };
}
