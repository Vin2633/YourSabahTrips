import { Award, Globe, Heart, Shield } from 'lucide-react';

interface AboutUsProps {
  darkMode: boolean;
}

export function AboutUs({ darkMode }: AboutUsProps) {
  return (
    <section className={`py-16 px-4 ${darkMode ? 'bg-[oklch(0.3_0.05_160)]' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto">
        <h2 className={`text-center mb-6 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}`} style={{ fontSize: '2.5rem', fontWeight: '700' }}>
          About Us
        </h2>
        <p className={`text-center max-w-3xl mx-auto mb-12 text-lg ${darkMode ? 'text-[oklch(0.75_0.03_160)]' : 'text-[#2d6a4f]'}`}>
          YourSabahTrips is your trusted partner for exploring the wonders of Sabah, Borneo. 
          We specialize in creating unforgettable experiences that showcase the natural beauty, 
          rich culture, and incredible biodiversity of this magical destination.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className={`rounded-xl p-6 text-center border-2 ${
            darkMode 
              ? 'bg-[oklch(0.35_0.05_160)] border-[oklch(0.4_0.05_160)]' 
              : 'bg-[#f0f9f4] border-[#95d5b2]'
          }`}>
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-[#52b788] rounded-full">
                <Award className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className={`mb-2 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}`}>
              Expert Guides
            </h3>
            <p className={`text-sm ${darkMode ? 'text-[oklch(0.7_0.02_160)]' : 'text-[#2d6a4f]'}`}>
              Professional and knowledgeable local guides ensuring safe and enriching experiences
            </p>
          </div>
          
          <div className={`rounded-xl p-6 text-center border-2 ${
            darkMode 
              ? 'bg-[oklch(0.35_0.05_160)] border-[oklch(0.4_0.05_160)]' 
              : 'bg-[#f0f9f4] border-[#95d5b2]'
          }`}>
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-[#52b788] rounded-full">
                <Globe className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className={`mb-2 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}`}>
              10+ Years Experience
            </h3>
            <p className={`text-sm ${darkMode ? 'text-[oklch(0.7_0.02_160)]' : 'text-[#2d6a4f]'}`}>
              Over a decade of excellence in organizing memorable Sabah adventures
            </p>
          </div>
          
          <div className={`rounded-xl p-6 text-center border-2 ${
            darkMode 
              ? 'bg-[oklch(0.35_0.05_160)] border-[oklch(0.4_0.05_160)]' 
              : 'bg-[#f0f9f4] border-[#95d5b2]'
          }`}>
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-[#52b788] rounded-full">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className={`mb-2 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}`}>
              Customer Satisfaction
            </h3>
            <p className={`text-sm ${darkMode ? 'text-[oklch(0.7_0.02_160)]' : 'text-[#2d6a4f]'}`}>
              4.8/5 average rating from thousands of happy travelers worldwide
            </p>
          </div>
          
          <div className={`rounded-xl p-6 text-center border-2 ${
            darkMode 
              ? 'bg-[oklch(0.35_0.05_160)] border-[oklch(0.4_0.05_160)]' 
              : 'bg-[#f0f9f4] border-[#95d5b2]'
          }`}>
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-[#52b788] rounded-full">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className={`mb-2 ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}`}>
              Safety First
            </h3>
            <p className={`text-sm ${darkMode ? 'text-[oklch(0.7_0.02_160)]' : 'text-[#2d6a4f]'}`}>
              Comprehensive safety measures and insurance coverage for all tours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
