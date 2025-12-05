import { MapPin, Clock, Users, Filter } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PaymentModal } from './PaymentModal';

interface PackagesPageProps {
  darkMode: boolean;
}

const allPackages = [
  {
    id: 1,
    name: 'Mount Kinabalu Summit Trek',
    description: 'Conquer Southeast Asia\'s highest peak with experienced guides',
    price: 1299,
    duration: '2D1N',
    location: 'Kota Kinabalu',
    activity: 'Climbing',
    maxPax: 8,
    image: 'https://images.unsplash.com/photo-1670308490572-600d71fd23fe?w=400'
  },
  {
    id: 2,
    name: 'Semporna Island Hopping',
    description: 'Explore pristine islands and world-class diving spots',
    price: 899,
    duration: '3D2N',
    location: 'Tawau/Semporna',
    activity: 'Island Hopping',
    maxPax: 12,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400'
  },
  {
    id: 3,
    name: 'Wildlife River Cruise',
    description: 'Encounter orangutans, pygmy elephants, and exotic birds',
    price: 599,
    duration: '1D',
    location: 'Sandakan',
    activity: 'Wildlife',
    maxPax: 15,
    image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400'
  },
  {
    id: 4,
    name: 'Sipadan Diving Adventure',
    description: 'World-renowned diving at Sipadan Island',
    price: 1499,
    duration: '4D3N',
    location: 'Tawau/Semporna',
    activity: 'Diving',
    maxPax: 10,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400'
  },
  {
    id: 5,
    name: 'Kinabatangan River Safari',
    description: 'Wildlife spotting along Borneo\'s longest river',
    price: 749,
    duration: '2D1N',
    location: 'Sandakan',
    activity: 'Wildlife',
    maxPax: 12,
    image: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=400'
  },
  {
    id: 6,
    name: 'Mari Mari Cultural Village',
    description: 'Experience traditional Sabahan tribal culture and customs',
    price: 299,
    duration: '4 hours',
    location: 'Kota Kinabalu',
    activity: 'Cultural Tours',
    maxPax: 20,
    image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=400'
  },
  {
    id: 7,
    name: 'Tunku Abdul Rahman Marine Park',
    description: 'Island hopping and snorkeling near Kota Kinabalu',
    price: 399,
    duration: '1D',
    location: 'Kota Kinabalu',
    activity: 'Island Hopping',
    maxPax: 15,
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400'
  },
  {
    id: 8,
    name: 'Mabul Island Retreat',
    description: 'Relaxing beach getaway with excellent macro diving',
    price: 1199,
    duration: '3D2N',
    location: 'Tawau/Semporna',
    activity: 'Diving',
    maxPax: 8,
    image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=400'
  },
  {
    id: 9,
    name: 'Sepilok Orangutan Sanctuary',
    description: 'Visit the famous orangutan rehabilitation center',
    price: 349,
    duration: '1D',
    location: 'Sandakan',
    activity: 'Wildlife',
    maxPax: 25,
    image: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=400'
  }
];

export function PackagesPage({ darkMode }: PackagesPageProps) {
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedActivity, setSelectedActivity] = useState<string>('');
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const filteredPackages = allPackages.filter(pkg => {
    const locationMatch = !selectedLocation || pkg.location === selectedLocation;
    const activityMatch = !selectedActivity || pkg.activity === selectedActivity;
    return locationMatch && activityMatch;
  });

  const locations = ['Kota Kinabalu', 'Sandakan', 'Tawau/Semporna'];
  const activities = ['Climbing', 'Wildlife', 'Diving', 'Cultural Tours', 'Island Hopping'];

  return (
    <div className={`min-h-screen py-12 px-4 ${darkMode ? 'bg-[oklch(0.3_0.05_160)]' : 'bg-[#f0f9f4]'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className={darkMode ? 'text-[oklch(0.9_0.03_160)] mb-4' : 'text-[#1b4332] mb-4'}>All Tour Packages</h1>
          <p className={`max-w-2xl mx-auto ${darkMode ? 'text-[oklch(0.7_0.02_160)]' : 'text-[#2d6a4f]'}`}>
            Browse our complete collection of adventures across Sabah, Borneo
          </p>
        </div>

        {/* Filters */}
        <div className={`rounded-xl p-6 mb-8 shadow-xl border-2 ${
          darkMode ? 'bg-[oklch(0.35_0.05_160)] border-[oklch(0.4_0.05_160)]' : 'bg-white border-[#95d5b2]'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-[#52b788]" />
            <h3 className={darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}>Filter Packages</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={`block mb-2 ${darkMode ? 'text-[oklch(0.8_0.03_160)]' : 'text-[#1b4332]'}`}>Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52b788] ${
                  darkMode 
                    ? 'bg-[oklch(0.4_0.05_160)] border-[oklch(0.45_0.05_160)] text-[oklch(0.9_0.03_160)]' 
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
              <label className={`block mb-2 ${darkMode ? 'text-[oklch(0.8_0.03_160)]' : 'text-[#1b4332]'}`}>Activity</label>
              <select
                value={selectedActivity}
                onChange={(e) => setSelectedActivity(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52b788] ${
                  darkMode 
                    ? 'bg-[oklch(0.4_0.05_160)] border-[oklch(0.45_0.05_160)] text-[oklch(0.9_0.03_160)]' 
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
              <button
                onClick={() => {
                  setSelectedLocation('');
                  setSelectedActivity('');
                }}
                className="w-full px-6 py-3 bg-[#2d6a4f] text-white rounded-lg hover:bg-[#1a5f3f] transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className={darkMode ? 'text-[oklch(0.7_0.02_160)]' : 'text-[#2d6a4f]'}>
            Showing {filteredPackages.length} {filteredPackages.length === 1 ? 'package' : 'packages'}
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-xl border-2 ${
                darkMode ? 'bg-[oklch(0.35_0.05_160)] border-[oklch(0.4_0.05_160)]' : 'bg-white border-[#95d5b2]'
              }`}
            >
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#52b788] text-white px-3 py-1 rounded-full text-sm">
                  {pkg.activity}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2 text-[#40916c]">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{pkg.location}</span>
                </div>
                
                <h3 className={`mb-2 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}`}>{pkg.name}</h3>
                <p className={`mb-4 ${darkMode ? 'text-[oklch(0.7_0.02_160)]' : 'text-[#2d6a4f]'}`}>{pkg.description}</p>
                
                <div className={`flex items-center gap-4 mb-4 text-sm ${darkMode ? 'text-[oklch(0.7_0.02_160)]' : 'text-[#2d6a4f]'}`}>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-[#52b788]" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-[#52b788]" />
                    <span>Max {pkg.maxPax}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[#40916c]">From</span>
                    <p className={darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}>RM {pkg.price.toLocaleString()}</p>
                  </div>
                  <button
                    className="px-6 py-2 bg-[#52b788] text-white rounded-lg hover:bg-[#40916c] transition-colors shadow-lg"
                    onClick={() => {
                      setSelectedPackage(pkg);
                      setShowPaymentModal(true);
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div className="text-center py-16">
            <p className={`text-lg ${darkMode ? 'text-[oklch(0.7_0.02_160)]' : 'text-[#2d6a4f]'}`}>No packages found matching your filters.</p>
            <button
              onClick={() => {
                setSelectedLocation('');
                setSelectedActivity('');
              }}
              className="mt-4 px-6 py-3 bg-[#52b788] text-white rounded-lg hover:bg-[#40916c] transition-colors"
            >
              View All Packages
            </button>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedPackage && (
        <PaymentModal
          packageData={selectedPackage}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedPackage(null);
          }}
          onSuccess={() => {
            setShowPaymentModal(false);
            setSelectedPackage(null);
          }}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}