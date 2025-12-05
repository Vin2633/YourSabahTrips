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
import { DiagnosticsPanel } from './components/DiagnosticsPanel';
import { getSession, logout } from './services/authService';
import type { User } from './services/authService';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [currentPage, setCurrentPage] = useState<'home' | 'packages' | 'dashboard' | 'admin' | 'map'>('home');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [packageFilters, setPackageFilters] = useState({
    location: '',
    activity: ''
  });

  // Check for existing session on app load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await getSession();
        if (response.success && response.data) {
          setUser(response.data);
        }
      } catch (err) {
        console.error('Failed to check session:', err);
      } finally {
        setIsCheckingSession(false);
      }
    };

    checkSession();
  }, []);

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

  const handleSearch = (location: string, activity: string) => {
    setPackageFilters({ location, activity });
    setCurrentPage('packages');
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    setShowAuthModal(false);
    // Navigate to appropriate dashboard based on role
    if (userData.role === 'admin') {
      setCurrentPage('admin');
    } else {
      setCurrentPage('dashboard');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout error:', err);
    }
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
      {isCheckingSession ? (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#52b788] mx-auto mb-4"></div>
            <p className={darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}>Loading...</p>
          </div>
        </div>
      ) : (
        <>
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
              <Hero darkMode={darkMode} onSearch={handleSearch} />
              <AboutUs darkMode={darkMode} />
              <OurServices darkMode={darkMode} />
              <FeaturedDestinations darkMode={darkMode} />
              <FeaturedPackages darkMode={darkMode} />
            </>
          )}

          {currentPage === 'packages' && <PackagesPage darkMode={darkMode} initialFilters={packageFilters} />}
          
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
        </>
      )}

      {/* Diagnostics Panel - For debugging */}
      <DiagnosticsPanel />
    </div>
  );
}

export default App;