import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { OurServices } from './components/OurServices';
import { FeaturedDestinations } from './components/FeaturedDestinations';
import { FeaturedPackages } from './components/FeaturedPackages';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { Dashboard } from './components/Dashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { PackagesPage } from './components/PackagesPage';
import { MapView } from './components/MapView';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'packages' | 'dashboard' | 'admin' | 'map'>('home');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogin = (userData: any) => {
    setUser(userData);
    setShowAuthModal(false);
    // Navigate to appropriate dashboard based on role
    if (userData.role === 'admin') {
      setCurrentPage('admin');
    } else {
      setCurrentPage('dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const navigateTo = (page: 'home' | 'packages' | 'dashboard' | 'admin' | 'map') => {
    // Check if navigation requires authentication
    if ((page === 'dashboard' || page === 'admin') && !user) {
      setShowAuthModal(true);
      return;
    }
    setCurrentPage(page);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[oklch(0.3_0.05_160)]' : 'bg-white'}`}>
      <Navbar 
        user={user}
        onNavigate={navigateTo}
        onAuthClick={() => setShowAuthModal(true)}
        onLogout={handleLogout}
        currentPage={currentPage}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      {currentPage === 'home' && (
        <>
          <Hero darkMode={darkMode} />
          <AboutUs darkMode={darkMode} />
          <OurServices darkMode={darkMode} />
          <FeaturedDestinations darkMode={darkMode} />
          <FeaturedPackages darkMode={darkMode} />
        </>
      )}

      {currentPage === 'packages' && <PackagesPage darkMode={darkMode} />}
      
      {currentPage === 'dashboard' && user && user.role === 'tourist' && (
        <Dashboard user={user} setUser={setUser} darkMode={darkMode} />
      )}

      {currentPage === 'admin' && user && user.role === 'admin' && (
        <AdminDashboard user={user} darkMode={darkMode} />
      )}

      {currentPage === 'map' && <MapView darkMode={darkMode} />}

      <Footer onNavigate={navigateTo} darkMode={darkMode} />

      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)} 
          onLogin={handleLogin}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}

export default App;