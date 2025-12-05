import { MapPin, Users, Filter, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PaymentModal } from './PaymentModal';
import { getAllPackages, type Package, type Schedule } from '../services/packageService';

interface PackagesPageProps {
  darkMode: boolean;
}

export function PackagesPage({ darkMode }: PackagesPageProps) {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedActivityType, setSelectedActivityType] = useState<string>('');
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Fetch packages from database on mount
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getAllPackages();
        console.log('Fetched packages:', data); // Debug log
        if (data && Array.isArray(data)) {
          setPackages(data);
          if (data.length === 0) {
            setError('No packages found in database');
          }
        } else {
          setError('Invalid data format received');
        }
      } catch (err) {
        setError('Failed to fetch packages: ' + (err instanceof Error ? err.message : String(err)));
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Filter by location and activity type
  const filteredPackages = packages.filter(pkg => {
    const locationMatch = !selectedLocation || pkg.Location === selectedLocation;
    const activityMatch = !selectedActivityType || pkg.ActivityType === selectedActivityType;
    return locationMatch && activityMatch;
  });

  // Get unique locations and activity types from database
  const locations = Array.from(new Set(packages.map(pkg => pkg.Location)));
  const activityTypes = Array.from(new Set(packages.map(pkg => pkg.ActivityType)));

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Format time
  const formatTime = (timeString: string) => {
    return timeString.substring(0, 5); // HH:MM
  };

  if (loading) {
    return (
      <div className={`min-h-screen py-12 px-4 flex items-center justify-center ${darkMode ? 'bg-[oklch(0.3_0.05_160)]' : 'bg-[#f0f9f4]'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#52b788] mx-auto mb-4"></div>
          <p className={darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}>Loading packages...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen py-12 px-4 flex items-center justify-center ${darkMode ? 'bg-[oklch(0.3_0.05_160)]' : 'bg-[#f0f9f4]'}`}>
        <div className="text-center">
          <p className={`text-lg text-red-600 mb-4`}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-[#52b788] text-white rounded-lg hover:bg-[#40916c]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-12 px-4 ${darkMode ? 'bg-[oklch(0.3_0.05_160)]' : 'bg-[#f0f9f4]'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}`}>
            All Tour Packages
          </h1>
          <p className={`max-w-2xl mx-auto ${darkMode ? 'text-[oklch(0.7_0.02_160)]' : 'text-[#2d6a4f]'}`}>
            Browse our complete collection of adventures across Sabah
          </p>
        </div>

        {/* Location Filter */}
        <div className={`rounded-xl p-6 mb-8 shadow-xl border-2 ${
          darkMode ? 'bg-[oklch(0.35_0.05_160)] border-[oklch(0.4_0.05_160)]' : 'bg-white border-[#95d5b2]'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-[#52b788]" />
            <h2 className={`text-lg font-semibold ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}`}>Filter by Location</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() => setSelectedLocation('')}
              className={`px-4 py-2 rounded-lg border-2 transition-all ${
                !selectedLocation
                  ? 'bg-[#52b788] text-white border-[#52b788]'
                  : darkMode
                    ? 'bg-[oklch(0.4_0.05_160)] text-[oklch(0.8_0.03_160)] border-[oklch(0.45_0.05_160)]'
                    : 'bg-[#f0f9f4] text-[#1b4332] border-[#95d5b2]'
              }`}
            >
              All Locations
            </button>
            {locations.map(location => (
              <button
                key={location}
                onClick={() => setSelectedLocation(location)}
                className={`px-4 py-2 rounded-lg border-2 transition-all ${
                  selectedLocation === location
                    ? 'bg-[#52b788] text-white border-[#52b788]'
                    : darkMode
                      ? 'bg-[oklch(0.4_0.05_160)] text-[oklch(0.8_0.03_160)] border-[oklch(0.45_0.05_160)]'
                      : 'bg-[#f0f9f4] text-[#1b4332] border-[#95d5b2]'
                }`}
              >
                {location}
              </button>
            ))}
          </div>
        </div>

        {/* Activity Type Filter */}
        <div className={`rounded-xl p-6 mb-8 shadow-xl border-2 ${
          darkMode ? 'bg-[oklch(0.35_0.05_160)] border-[oklch(0.4_0.05_160)]' : 'bg-white border-[#95d5b2]'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-[#52b788]" />
            <h2 className={`text-lg font-semibold ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}`}>Filter by Activity Type</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() => setSelectedActivityType('')}
              className={`px-4 py-2 rounded-lg border-2 transition-all ${
                !selectedActivityType
                  ? 'bg-[#52b788] text-white border-[#52b788]'
                  : darkMode
                    ? 'bg-[oklch(0.4_0.05_160)] text-[oklch(0.8_0.03_160)] border-[oklch(0.45_0.05_160)]'
                    : 'bg-[#f0f9f4] text-[#1b4332] border-[#95d5b2]'
              }`}
            >
              All Activities
            </button>
            {activityTypes.map(activity => (
              <button
                key={activity}
                onClick={() => setSelectedActivityType(activity)}
                className={`px-4 py-2 rounded-lg border-2 transition-all ${
                  selectedActivityType === activity
                    ? 'bg-[#52b788] text-white border-[#52b788]'
                    : darkMode
                      ? 'bg-[oklch(0.4_0.05_160)] text-[oklch(0.8_0.03_160)] border-[oklch(0.45_0.05_160)]'
                      : 'bg-[#f0f9f4] text-[#1b4332] border-[#95d5b2]'
                }`}
              >
                {activity}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className={darkMode ? 'text-[oklch(0.7_0.02_160)]' : 'text-[#2d6a4f]'}>
            Showing {filteredPackages.length} {filteredPackages.length === 1 ? 'package' : 'packages'}
          </p>
        </div>

        {/* Packages Grid */}
        {filteredPackages.length === 0 ? (
          <div className="text-center py-16">
            <p className={`text-lg ${darkMode ? 'text-[oklch(0.7_0.02_160)]' : 'text-[#2d6a4f]'}`}>
              {packages.length === 0 ? 'No packages available' : 'No packages found for this location.'}
            </p>
            {packages.length > 0 && (
              <button
                onClick={() => setSelectedLocation('')}
                className="mt-4 px-6 py-3 bg-[#52b788] text-white rounded-lg hover:bg-[#40916c] transition-colors"
              >
                View All Packages
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.PackageId}
                className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:scale-105 border-2 ${
                  darkMode
                    ? 'bg-[oklch(0.35_0.05_160)] border-[oklch(0.4_0.05_160)]'
                    : 'bg-white border-[#95d5b2]'
                }`}
              >
                {/* Image */}
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={pkg.ImageURL || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop`}
                    alt={pkg.PackageName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-[#52b788] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    RM {pkg.Price.toFixed(2)}
                  </div>
                  <div className="absolute top-3 left-3 bg-[#40916c] text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {pkg.ActivityType}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-[#52b788]" />
                    <span className="text-sm text-[#52b788]">{pkg.Location}</span>
                  </div>

                  <h3 className={`mb-2 font-bold text-lg ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}`}>
                    {pkg.PackageName}
                  </h3>
                  <p className={`mb-4 text-sm line-clamp-2 ${darkMode ? 'text-[oklch(0.7_0.02_160)]' : 'text-[#2d6a4f]'}`}>
                    {pkg.Description}
                  </p>

                  {/* Capacity */}
                  <div className={`flex items-center gap-2 mb-4 text-sm ${darkMode ? 'text-[oklch(0.7_0.02_160)]' : 'text-[#2d6a4f]'}`}>
                    <Users className="w-4 h-4 text-[#52b788]" />
                    <span>Max {pkg.Max_Pax} people</span>
                  </div>

                  {/* Available Schedules */}
                  <div className="mb-4">
                    <h4 className={`text-sm font-semibold mb-2 ${darkMode ? 'text-[oklch(0.8_0.03_160)]' : 'text-[#1b4332]'}`}>
                      Available Dates:
                    </h4>
                    {pkg.Schedules.length > 0 ? (
                      <div className="space-y-2">
                        {pkg.Schedules.slice(0, 2).map((schedule: Schedule) => (
                          <div
                            key={schedule.ScheduleId}
                            className={`text-xs p-2 rounded ${
                              darkMode
                                ? 'bg-[oklch(0.4_0.05_160)]'
                                : 'bg-[#f0f9f4]'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span className={darkMode ? 'text-[oklch(0.8_0.03_160)]' : 'text-[#1b4332]'}>
                                {formatDate(schedule.TravelDate)}
                              </span>
                              <span className={`font-semibold ${schedule.AvailableSlots > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {schedule.AvailableSlots} slots
                              </span>
                            </div>
                            <div className={`text-xs ${darkMode ? 'text-[oklch(0.7_0.02_160)]' : 'text-[#2d6a4f]'}`}>
                              {formatTime(schedule.StartTime)} - {formatTime(schedule.EndTime)}
                            </div>
                          </div>
                        ))}
                        {pkg.Schedules.length > 2 && (
                          <p className={`text-xs ${darkMode ? 'text-[oklch(0.7_0.02_160)]' : 'text-[#2d6a4f]'}`}>
                            +{pkg.Schedules.length - 2} more dates
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className={`text-xs ${darkMode ? 'text-[oklch(0.7_0.02_160)]' : 'text-[#2d6a4f]'}`}>
                        No schedules available
                      </p>
                    )}
                  </div>

                  {/* Book Button */}
                  <button
                    onClick={() => {
                      setSelectedPackage(pkg);
                      setShowPaymentModal(true);
                    }}
                    disabled={pkg.Schedules.length === 0 || pkg.Schedules.every((s: Schedule) => s.AvailableSlots === 0)}
                    className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                      pkg.Schedules.length === 0 || pkg.Schedules.every((s: Schedule) => s.AvailableSlots === 0)
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-[#52b788] text-white hover:bg-[#40916c]'
                    }`}
                  >
                    {pkg.Schedules.length === 0 ? 'No Dates Available' : 'Book Now'}
                  </button>
                </div>
              </div>
            ))}
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
