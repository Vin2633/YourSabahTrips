import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: 'home' | 'packages' | 'map') => void;
  darkMode: boolean;
}

export function Footer({ onNavigate, darkMode }: FooterProps) {
  return (
    <footer className={`border-t py-12 px-4 ${
      darkMode ? 'bg-[oklch(0.32_0.05_160)] border-[oklch(0.4_0.05_160)]' : 'bg-[#1a5f3f] border-[#2d6a4f]'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className={darkMode ? 'text-[#52b788] mb-4' : 'text-[#95d5b2] mb-4'}>YourSabahTrips</h3>
            <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-[#d8f3dc]'}`}>
              Your gateway to unforgettable adventures in Sabah, Borneo's paradise.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={`transition-colors ${
                darkMode ? 'text-gray-400 hover:text-[#52b788]' : 'text-[#d8f3dc] hover:text-[#b7e4c7]'
              }`}>
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={`transition-colors ${
                darkMode ? 'text-gray-400 hover:text-[#52b788]' : 'text-[#d8f3dc] hover:text-[#b7e4c7]'
              }`}>
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={`transition-colors ${
                darkMode ? 'text-gray-400 hover:text-[#52b788]' : 'text-[#d8f3dc] hover:text-[#b7e4c7]'
              }`}>
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`mb-4 ${darkMode ? 'text-white' : 'text-white'}`}>Quick Links</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('home')} className={`transition-colors ${
                darkMode ? 'text-gray-400 hover:text-[#52b788]' : 'text-[#d8f3dc] hover:text-[#b7e4c7]'
              }`}>Home</button></li>
              <li><button onClick={() => onNavigate('packages')} className={`transition-colors ${
                darkMode ? 'text-gray-400 hover:text-[#52b788]' : 'text-[#d8f3dc] hover:text-[#b7e4c7]'
              }`}>Our Tours</button></li>
              <li><button onClick={() => onNavigate('map')} className={`transition-colors ${
                darkMode ? 'text-gray-400 hover:text-[#52b788]' : 'text-[#d8f3dc] hover:text-[#b7e4c7]'
              }`}>Destinations Map</button></li>
              <li><a href="#guide" className={`transition-colors ${
                darkMode ? 'text-gray-400 hover:text-[#52b788]' : 'text-[#d8f3dc] hover:text-[#b7e4c7]'
              }`}>Travel Guide</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className={`mb-4 ${darkMode ? 'text-white' : 'text-white'}`}>Support</h4>
            <ul className="space-y-2">
              <li><a href="#faq" className={`transition-colors ${
                darkMode ? 'text-gray-400 hover:text-[#52b788]' : 'text-[#d8f3dc] hover:text-[#b7e4c7]'
              }`}>FAQ</a></li>
              <li><a href="#policy" className={`transition-colors ${
                darkMode ? 'text-gray-400 hover:text-[#52b788]' : 'text-[#d8f3dc] hover:text-[#b7e4c7]'
              }`}>Booking Policy</a></li>
              <li><a href="#terms" className={`transition-colors ${
                darkMode ? 'text-gray-400 hover:text-[#52b788]' : 'text-[#d8f3dc] hover:text-[#b7e4c7]'
              }`}>Terms & Conditions</a></li>
              <li><a href="#privacy" className={`transition-colors ${
                darkMode ? 'text-gray-400 hover:text-[#52b788]' : 'text-[#d8f3dc] hover:text-[#b7e4c7]'
              }`}>Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className={`mb-4 ${darkMode ? 'text-white' : 'text-white'}`}>Contact Us</h4>
            <ul className="space-y-3">
              <li className={`flex items-start gap-2 ${darkMode ? 'text-gray-400' : 'text-[#d8f3dc]'}`}>
                <MapPin className={`w-5 h-5 flex-shrink-0 mt-1 ${darkMode ? 'text-[#52b788]' : 'text-[#95d5b2]'}`} />
                <div>
                  <p>123 Tourism Avenue</p>
                  <p>Kota Kinabalu, Sabah</p>
                  <p>88000, Malaysia</p>
                </div>
              </li>
              <li className={`flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-[#d8f3dc]'}`}>
                <Phone className={`w-5 h-5 ${darkMode ? 'text-[#52b788]' : 'text-[#95d5b2]'}`} />
                <a href="tel:+60881234567" className={`transition-colors ${
                  darkMode ? 'hover:text-[#52b788]' : 'hover:text-[#b7e4c7]'
                }`}>
                  +60 88 123 4567
                </a>
              </li>
              <li className={`flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-[#d8f3dc]'}`}>
                <Phone className={`w-5 h-5 ${darkMode ? 'text-[#52b788]' : 'text-[#95d5b2]'}`} />
                <a href="tel:+60123456789" className={`transition-colors ${
                  darkMode ? 'hover:text-[#52b788]' : 'hover:text-[#b7e4c7]'
                }`}>
                  +60 12 345 6789 (Mobile)
                </a>
              </li>
              <li className={`flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-[#d8f3dc]'}`}>
                <Mail className={`w-5 h-5 ${darkMode ? 'text-[#52b788]' : 'text-[#95d5b2]'}`} />
                <a href="mailto:info@yoursabahtrips.com" className={`transition-colors ${
                  darkMode ? 'hover:text-[#52b788]' : 'hover:text-[#b7e4c7]'
                }`}>
                  info@yoursabahtrips.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Business Hours */}
        <div className={`border-t pt-6 mb-6 ${darkMode ? 'border-[#2d2d2d]' : 'border-[#2d6a4f]'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className={`mb-3 ${darkMode ? 'text-white' : 'text-white'}`}>Business Hours</h4>
              <div className={`space-y-1 ${darkMode ? 'text-gray-400' : 'text-[#d8f3dc]'}`}>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 4:00 PM</p>
                <p>Sunday & Public Holidays: Closed</p>
              </div>
            </div>
            <div>
              <h4 className={`mb-3 ${darkMode ? 'text-white' : 'text-white'}`}>Emergency Contact</h4>
              <div className={`space-y-1 ${darkMode ? 'text-gray-400' : 'text-[#d8f3dc]'}`}>
                <p>24/7 Hotline: <a href="tel:+60199876543" className={`transition-colors ${
                  darkMode ? 'text-[#52b788] hover:text-[#40916c]' : 'text-[#95d5b2] hover:text-[#b7e4c7]'
                }`}>+60 19 987 6543</a></p>
                <p>For urgent tour-related matters</p>
              </div>
            </div>
          </div>
        </div>

        <div className={`border-t pt-8 text-center ${darkMode ? 'border-[#2d2d2d]' : 'border-[#2d6a4f]'}`}>
          <p className={darkMode ? 'text-gray-400' : 'text-[#d8f3dc]'}>
            © 2025 YourSabahTrips. All rights reserved. | Crafted with ❤️ for adventure seekers
          </p>
          <p className={`text-sm mt-2 ${darkMode ? 'text-gray-500' : 'text-[#d8f3dc]'}`}>
            Licensed by Tourism Malaysia | Reg. No: KPL/LN 1234
          </p>
        </div>
      </div>
    </footer>
  );
}