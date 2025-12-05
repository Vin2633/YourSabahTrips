import { MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FeaturedDestinationsProps {
  darkMode: boolean;
}

const destinations = [
  {
    name: 'Kota Kinabalu',
    tours: 341,
    description: 'Capital city with Mount Kinabalu, beaches, and vibrant markets',
    color: '#0077b6',
    image: 'https://example.com/kota-kinabalu.jpg'
  },
  {
    name: 'Sandakan',
    tours: 53,
    description: 'Wildlife sanctuary, orangutan rehabilitation, and river cruises',
    color: '#00b4d8',
    image: 'https://example.com/sandakan.jpg'
  },
  {
    name: 'Tawau/Semporna',
    tours: 63,
    description: 'World-class diving, pristine islands, and marine biodiversity',
    color: '#0077b6',
    image: 'https://example.com/tawau-semporna.jpg'
  }
];

export function FeaturedDestinations({ darkMode }: FeaturedDestinationsProps) {
  return (
    <section className={`py-16 px-4 ${darkMode ? 'bg-[oklch(0.32_0.05_160)]' : 'bg-[#f0f9f4]'}`}>
      <div className="max-w-7xl mx-auto">
        <h2 className={`text-center mb-12 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}`} style={{ fontSize: '2.5rem', fontWeight: '700' }}>
          Featured Destinations
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map((dest) => (
            <div 
              key={dest.name}
              className={`rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow border-2 ${
                darkMode ? 'bg-[oklch(0.35_0.05_160)] border-[oklch(0.4_0.05_160)]' : 'bg-white border-[#95d5b2]'
              }`}
            >
              <ImageWithFallback
                src={dest.image}
                alt={dest.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className={`mb-2 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}`}>{dest.name}</h3>
                <p className={darkMode ? 'text-[oklch(0.7_0.02_160)]' : 'text-[#2d6a4f]'}>{dest.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}