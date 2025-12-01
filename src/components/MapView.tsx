import { MapPin, Navigation, Info, X } from 'lucide-react';
import { useState } from 'react';

interface MapViewProps {
  darkMode: boolean;
}

interface TourismSpot {
  id: number;
  name: string;
  lat: number;
  lng: number;
  description: string;
  category: 'mountain' | 'beach' | 'wildlife' | 'cultural';
  image: string;
}

const tourismSpots: TourismSpot[] = [
  {
    id: 1,
    name: 'Mount Kinabalu',
    lat: 6.075,
    lng: 116.558,
    description: 'Southeast Asia\'s highest peak at 4,095 meters. UNESCO World Heritage Site.',
    category: 'mountain',
    image: 'https://images.unsplash.com/photo-1670308490572-600d71fd23fe?w=400'
  },
  {
    id: 2,
    name: 'Semporna Islands',
    lat: 4.479,
    lng: 118.610,
    description: 'Crystal-clear waters perfect for diving and island hopping adventures.',
    category: 'beach',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400'
  },
  {
    id: 3,
    name: 'Kinabatangan River',
    lat: 5.413,
    lng: 118.019,
    description: 'Wildlife paradise with orangutans, pygmy elephants, and proboscis monkeys.',
    category: 'wildlife',
    image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400'
  },
  {
    id: 4,
    name: 'Tunku Abdul Rahman Park',
    lat: 6.006,
    lng: 116.005,
    description: 'Marine park with 5 islands near Kota Kinabalu, perfect for snorkeling.',
    category: 'beach',
    image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400'
  },
  {
    id: 5,
    name: 'Monsopiad Cultural Village',
    lat: 5.891,
    lng: 116.081,
    description: 'Experience authentic Kadazan-Dusun culture and traditions.',
    category: 'cultural',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=400'
  },
  {
    id: 6,
    name: 'Sipadan Island',
    lat: 4.116,
    lng: 118.628,
    description: 'World-renowned diving destination with incredible marine biodiversity.',
    category: 'beach',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400'
  }
];

export function MapView({ darkMode }: MapViewProps) {
  const [selectedSpot, setSelectedSpot] = useState<TourismSpot | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredSpots = activeFilter === 'all' 
    ? tourismSpots 
    : tourismSpots.filter(spot => spot.category === activeFilter);

  const categories = [
    { id: 'all', label: 'All Spots', color: '#52b788' },
    { id: 'mountain', label: 'Mountains', color: '#1b4332' },
    { id: 'beach', label: 'Beaches', color: '#2d6a4f' },
    { id: 'wildlife', label: 'Wildlife', color: '#40916c' },
    { id: 'cultural', label: 'Cultural', color: '#95d5b2' }
  ];

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat?.color || '#52b788';
  };

  return (
    <div className={`min-h-screen pt-24 pb-12 px-4 transition-colors ${
      darkMode 
        ? 'bg-[oklch(0.3_0.05_160)]' 
        : 'bg-[#f0f9f4]'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`mb-4 ${
            darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'
          }`}>Tourism Spot Map</h1>
          <p className={`max-w-2xl mx-auto ${
            darkMode ? 'text-[oklch(0.75_0.03_160)]' : 'text-[#2d6a4f]'
          }`}>
            Explore Sabah's top destinations with our interactive map
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-6 py-2 rounded-lg transition-all ${
                activeFilter === cat.id
                  ? 'bg-[#52b788] text-white shadow-lg scale-105'
                  : darkMode
                    ? 'bg-[oklch(0.35_0.05_160)] text-[oklch(0.9_0.03_160)] border-2 border-[oklch(0.4_0.05_160)] hover:bg-[oklch(0.4_0.05_160)]'
                    : 'bg-white text-[#1b4332] border-2 border-[#95d5b2] hover:bg-[#f0f9f4]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Map Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Area */}
          <div className={`lg:col-span-2 rounded-xl p-8 shadow-xl border-2 relative overflow-hidden ${
            darkMode
              ? 'bg-[oklch(0.35_0.05_160)] border-[oklch(0.4_0.05_160)]'
              : 'bg-white border-[#95d5b2]'
          }`}>
            <div className={`aspect-[16/10] rounded-lg relative ${
              darkMode ? 'bg-[oklch(0.25_0.05_160)]' : 'bg-[#d8f3dc]'
            }`}>
              {/* Simplified Map Background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Navigation className="w-16 h-16 text-[#52b788] mx-auto mb-4" />
                  <p className={darkMode ? 'text-[oklch(0.75_0.03_160)]' : 'text-[#2d6a4f]'}>Interactive Map of Sabah</p>
                  <p className={`text-sm mt-2 ${darkMode ? 'text-[oklch(0.75_0.03_160)]' : 'text-[#2d6a4f]'}`}>Click on markers to view details</p>
                </div>
              </div>

              {/* Map Pins - Positioned relative to map */}
              {filteredSpots.map((spot, index) => {
                // Calculate position based on coordinates (simplified)
                const left = ((spot.lng - 115) / 4) * 100; // Normalize longitude
                const top = ((7 - spot.lat) / 3) * 100; // Normalize latitude (inverted)
                
                return (
                  <button
                    key={spot.id}
                    onClick={() => setSelectedSpot(spot)}
                    className="absolute transform -translate-x-1/2 -translate-y-full transition-all hover:scale-125 group"
                    style={{ 
                      left: `${Math.max(10, Math.min(90, left))}%`, 
                      top: `${Math.max(10, Math.min(90, top))}%` 
                    }}
                  >
                    <div className="relative">
                      <MapPin 
                        className="w-8 h-8 drop-shadow-lg" 
                        style={{ color: getCategoryColor(spot.category) }}
                        fill={getCategoryColor(spot.category)}
                      />
                      <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none ${
                        darkMode 
                          ? 'bg-[oklch(0.2_0.05_160)] text-[oklch(0.9_0.03_160)]'
                          : 'bg-[#1b4332] text-white'
                      }`}>
                        {spot.name}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Map Legend */}
            <div className="mt-4 flex flex-wrap gap-4 justify-center">
              {categories.filter(c => c.id !== 'all').map((cat) => (
                <div key={cat.id} className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" style={{ color: cat.color }} fill={cat.color} />
                  <span className={`text-sm ${darkMode ? 'text-[oklch(0.75_0.03_160)]' : 'text-[#2d6a4f]'}`}>{cat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Spot List */}
          <div className="space-y-4">
            <h3 className={`mb-4 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}`}>
              {filteredSpots.length} {filteredSpots.length === 1 ? 'Spot' : 'Spots'}
            </h3>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {filteredSpots.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => setSelectedSpot(spot)}
                  className={`w-full rounded-xl p-4 shadow-lg border-2 transition-all text-left hover:scale-105 ${
                    selectedSpot?.id === spot.id
                      ? darkMode
                        ? 'border-[#52b788] bg-[oklch(0.4_0.05_160)]'
                        : 'border-[#52b788] bg-[#f0f9f4]'
                      : darkMode
                        ? 'bg-[oklch(0.35_0.05_160)] border-[oklch(0.4_0.05_160)] hover:border-[#52b788]'
                        : 'bg-white border-[#95d5b2] hover:border-[#52b788]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <MapPin 
                      className="w-6 h-6 flex-shrink-0 mt-1" 
                      style={{ color: getCategoryColor(spot.category) }}
                    />
                    <div className="flex-1">
                      <h4 className={`mb-1 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}`}>{spot.name}</h4>
                      <p className={`text-sm mb-2 ${darkMode ? 'text-[oklch(0.75_0.03_160)]' : 'text-[#2d6a4f]'}`}>{spot.description}</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs ${
                        darkMode
                          ? 'bg-[oklch(0.4_0.05_160)] text-[oklch(0.9_0.03_160)]'
                          : 'bg-[#d8f3dc] text-[#1b4332]'
                      }`}>
                        {spot.category.charAt(0).toUpperCase() + spot.category.slice(1)}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Detail Modal */}
        {selectedSpot && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className={`rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border-2 ${
              darkMode
                ? 'bg-[oklch(0.35_0.05_160)] border-[oklch(0.4_0.05_160)]'
                : 'bg-white border-[#95d5b2]'
            }`}>
              <div className="relative h-64">
                <img 
                  src={selectedSpot.image} 
                  alt={selectedSpot.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedSpot(null)}
                  className={`absolute top-4 right-4 p-2 rounded-full shadow-lg transition-colors ${
                    darkMode
                      ? 'bg-[oklch(0.35_0.05_160)] hover:bg-[oklch(0.4_0.05_160)] text-[oklch(0.9_0.03_160)]'
                      : 'bg-white hover:bg-[#f0f9f4] text-[#1b4332]'
                  }`}
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="absolute bottom-4 left-4">
                  <span className="px-4 py-2 bg-[#52b788] text-white rounded-full">
                    {selectedSpot.category.charAt(0).toUpperCase() + selectedSpot.category.slice(1)}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h2 className={`mb-4 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}`}>{selectedSpot.name}</h2>
                <div className={`flex items-center gap-2 mb-4 ${darkMode ? 'text-[oklch(0.75_0.03_160)]' : 'text-[#2d6a4f]'}`}>
                  <MapPin className="w-5 h-5 text-[#52b788]" />
                  <span>Lat: {selectedSpot.lat.toFixed(3)}, Lng: {selectedSpot.lng.toFixed(3)}</span>
                </div>
                <p className={`mb-6 ${darkMode ? 'text-[oklch(0.75_0.03_160)]' : 'text-[#2d6a4f]'}`}>{selectedSpot.description}</p>
                <div className="flex gap-4">
                  <button className="px-6 py-3 bg-[#52b788] text-white rounded-lg hover:bg-[#40916c] transition-colors shadow-lg">
                    View Packages
                  </button>
                  <button 
                    onClick={() => setSelectedSpot(null)}
                    className={`px-6 py-3 rounded-lg transition-colors border-2 ${
                      darkMode
                        ? 'bg-[oklch(0.4_0.05_160)] text-[oklch(0.9_0.03_160)] border-[oklch(0.5_0.05_160)] hover:bg-[oklch(0.45_0.05_160)]'
                        : 'bg-[#f0f9f4] text-[#1b4332] border-[#95d5b2] hover:bg-[#d8f3dc]'
                    }`}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}