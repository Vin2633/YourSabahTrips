import { Search, MapPin, Compass } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  darkMode: boolean;
}

export function SearchBar({ darkMode }: SearchBarProps) {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');

  const locations = ['Kota Kinabalu', 'Sandakan', 'Tawau/Semporna'];
  const activities = ['Climbing', 'Wildlife', 'Diving', 'Cultural Tours', 'Island Hopping'];

  return (
    <div className={`rounded-2xl shadow-2xl p-6 border-2 ${
      darkMode 
        ? 'bg-[oklch(0.35_0.05_160)] border-[oklch(0.4_0.05_160)]' 
        : 'bg-white border-[#95d5b2]'
    }`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={`block mb-2 ${darkMode ? 'text-[oklch(0.75_0.03_160)]' : 'text-[#1b4332]'}`}>
              Location
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52b788] appearance-none ${
                darkMode 
                  ? 'bg-[oklch(0.4_0.05_160)] border-[oklch(0.45_0.05_160)] text-[oklch(0.85_0.03_160)]' 
                  : 'bg-[#f0f9f4] border-[#95d5b2] text-[#1b4332]'
              }`}
            >
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={`block mb-2 ${darkMode ? 'text-[oklch(0.75_0.03_160)]' : 'text-[#1b4332]'}`}>
              Activity
            </label>
            <select
              value={selectedActivity}
              onChange={(e) => setSelectedActivity(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52b788] appearance-none ${
                darkMode 
                  ? 'bg-[oklch(0.4_0.05_160)] border-[oklch(0.45_0.05_160)] text-[oklch(0.85_0.03_160)]' 
                  : 'bg-[#f0f9f4] border-[#95d5b2] text-[#1b4332]'
              }`}
            >
              <option value="">All Activities</option>
              {activities.map((act) => (
                <option key={act} value={act}>{act}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full px-6 py-3 bg-[#52b788] text-white rounded-lg hover:bg-[#40916c] transition-colors shadow-lg flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              Search Tours
            </button>
          </div>
        </div>
    </div>
  );
}