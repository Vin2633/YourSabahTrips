import { Compass, Map, Camera, Utensils, Hotel, Users } from 'lucide-react';

interface OurServicesProps {
  darkMode: boolean;
}

export function OurServices({ darkMode }: OurServicesProps) {
  const services = [
    {
      icon: <Compass className="w-10 h-10" />,
      title: 'Guided Tours',
      description: 'Expert-led adventures to Sabah\'s most spectacular destinations'
    },
    {
      icon: <Map className="w-10 h-10" />,
      title: 'Custom Itineraries',
      description: 'Personalized tour packages tailored to your preferences and schedule'
    },
    {
      icon: <Camera className="w-10 h-10" />,
      title: 'Photography Tours',
      description: 'Capture stunning landscapes and wildlife with professional guidance'
    },
    {
      icon: <Utensils className="w-10 h-10" />,
      title: 'Culinary Experiences',
      description: 'Taste authentic Sabahan cuisine and local delicacies'
    },
    {
      icon: <Hotel className="w-10 h-10" />,
      title: 'Accommodation',
      description: 'Comfortable lodging options from budget to luxury resorts'
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: 'Group Tours',
      description: 'Special packages for families, friends, and corporate groups'
    }
  ];

  return (
    <section className={`py-16 px-4 ${darkMode ? 'bg-[oklch(0.32_0.05_160)]' : 'bg-[#f0f9f4]'}`}>
      <div className="max-w-7xl mx-auto">
        <h2 className={`text-center mb-6 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}`} style={{ fontSize: '2.5rem', fontWeight: '700' }}>
          Our Services
        </h2>
        <p className={`text-center max-w-3xl mx-auto mb-12 text-lg ${darkMode ? 'text-[oklch(0.75_0.03_160)]' : 'text-[#2d6a4f]'}`}>
          Comprehensive travel services designed to make your Sabah adventure seamless and unforgettable
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105 border-2 ${
                darkMode 
                  ? 'bg-[oklch(0.35_0.05_160)] border-[oklch(0.4_0.05_160)]' 
                  : 'bg-white border-[#95d5b2]'
              }`}
            >
              <div className="flex justify-center mb-4">
                <div className={`p-4 rounded-full ${
                  darkMode ? 'bg-[oklch(0.4_0.05_160)] text-[#52b788]' : 'bg-[#d8f3dc] text-[#1b4332]'
                }`}>
                  {service.icon}
                </div>
              </div>
              <h3 className={`text-center mb-3 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}`}>
                {service.title}
              </h3>
              <p className={`text-center text-sm ${darkMode ? 'text-[oklch(0.7_0.02_160)]' : 'text-[#2d6a4f]'}`}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
