import { MapPin, Clock, Users } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PaymentModal } from './PaymentModal';

interface FeaturedPackagesProps {
  darkMode: boolean;
}

const packages = [
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
    location: 'Semporna',
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
  }
];

export function FeaturedPackages({ darkMode }: FeaturedPackagesProps) {
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  return (
    <section className={`py-16 px-4 ${darkMode ? 'bg-[oklch(0.3_0.05_160)]' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto">
        <h2 className={`text-center mb-12 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}`} style={{ fontSize: '2.5rem', fontWeight: '700' }}>
          Popular Tour Packages
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
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
    </section>
  );
}
