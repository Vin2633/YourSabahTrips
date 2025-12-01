import { X } from 'lucide-react';
import { useState } from 'react';

interface AuthModalProps {
  onClose: () => void;
  onLogin: (userData: any) => void;
  darkMode: boolean;
}

export function AuthModal({ onClose, onLogin, darkMode }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'tourist' | 'admin'>('tourist');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneNo: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication with role-based access
    const userData = userType === 'admin' 
      ? {
          userId: 'admin_' + Math.random().toString(36).substr(2, 9),
          username: formData.username,
          firstName: formData.username,
          lastName: '',
          email: '',
          phoneNo: '',
          role: userType
        }
      : {
          userId: 'user_' + Math.random().toString(36).substr(2, 9),
          firstName: formData.firstName || 'John',
          lastName: formData.lastName || 'Doe',
          username: '',
          email: formData.email,
          phoneNo: formData.phoneNo || '+60123456789',
          role: userType
        };
    
    onLogin(userData);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className={`rounded-2xl max-w-md w-full p-8 relative shadow-2xl border-2 ${
        darkMode ? 'bg-[oklch(0.35_0.05_160)] border-[oklch(0.4_0.05_160)]' : 'bg-white border-[#95d5b2]'
      }`}>
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 transition-colors ${
            darkMode ? 'text-[oklch(0.7_0.02_160)] hover:text-[#52b788]' : 'text-[#2d6a4f] hover:text-[#1a5f3f]'
          }`}
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className={`mb-6 text-center ${darkMode ? 'text-[oklch(0.9_0.03_160)]' : 'text-[#1b4332]'}`}>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>

        {/* User Type Selection */}
        <div className="mb-6">
          <label className={`block mb-3 text-sm ${darkMode ? 'text-[oklch(0.8_0.03_160)]' : 'text-[#1b4332]'}`}>Login As:</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => {
                setUserType('tourist');
                setIsLogin(true);
              }}
              className={`px-4 py-3 rounded-lg border-2 transition-all ${
                userType === 'tourist'
                  ? 'bg-[#52b788] text-white border-[#52b788]'
                  : darkMode 
                    ? 'bg-[oklch(0.4_0.05_160)] text-[oklch(0.8_0.03_160)] border-[oklch(0.45_0.05_160)] hover:border-[#52b788]'
                    : 'bg-[#f0f9f4] text-[#1b4332] border-[#95d5b2] hover:border-[#52b788]'
              }`}
            >
              Tourist
            </button>
            <button
              type="button"
              onClick={() => {
                setUserType('admin');
                setIsLogin(true);
              }}
              className={`px-4 py-3 rounded-lg border-2 transition-all ${
                userType === 'admin'
                  ? 'bg-[#52b788] text-white border-[#52b788]'
                  : darkMode 
                    ? 'bg-[oklch(0.4_0.05_160)] text-[oklch(0.8_0.03_160)] border-[oklch(0.45_0.05_160)] hover:border-[#52b788]'
                    : 'bg-[#f0f9f4] text-[#1b4332] border-[#95d5b2] hover:border-[#52b788]'
              }`}
            >
              Admin
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && userType === 'tourist' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block mb-2 ${darkMode ? 'text-[oklch(0.8_0.03_160)]' : 'text-[#1b4332]'}`}>First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52b788] ${
                      darkMode 
                        ? 'bg-[oklch(0.4_0.05_160)] border-[oklch(0.45_0.05_160)] text-[oklch(0.9_0.03_160)]' 
                        : 'bg-[#f0f9f4] border-[#95d5b2] text-[#1b4332]'
                    }`}
                    required={!isLogin}
                  />
                </div>
                <div>
                  <label className={`block mb-2 ${darkMode ? 'text-[oklch(0.8_0.03_160)]' : 'text-[#1b4332]'}`}>Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52b788] ${
                      darkMode 
                        ? 'bg-[oklch(0.4_0.05_160)] border-[oklch(0.45_0.05_160)] text-[oklch(0.9_0.03_160)]' 
                        : 'bg-[#f0f9f4] border-[#95d5b2] text-[#1b4332]'
                    }`}
                    required={!isLogin}
                  />
                </div>
              </div>
            </>
          )}

          {userType === 'admin' ? (
            <div>
              <label className={`block mb-2 ${darkMode ? 'text-[oklch(0.8_0.03_160)]' : 'text-[#1b4332]'}`}>Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52b788] ${
                  darkMode 
                    ? 'bg-[oklch(0.4_0.05_160)] border-[oklch(0.45_0.05_160)] text-[oklch(0.9_0.03_160)]' 
                    : 'bg-[#f0f9f4] border-[#95d5b2] text-[#1b4332]'
                }`}
                required
              />
            </div>
          ) : (
            <div>
              <label className={`block mb-2 ${darkMode ? 'text-[oklch(0.8_0.03_160)]' : 'text-[#1b4332]'}`}>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52b788] ${
                  darkMode 
                    ? 'bg-[oklch(0.4_0.05_160)] border-[oklch(0.45_0.05_160)] text-[oklch(0.9_0.03_160)]' 
                    : 'bg-[#f0f9f4] border-[#95d5b2] text-[#1b4332]'
                }`}
                required
              />
            </div>
          )}

          <div>
            <label className={`block mb-2 ${darkMode ? 'text-[oklch(0.8_0.03_160)]' : 'text-[#1b4332]'}`}>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52b788] ${
                darkMode 
                  ? 'bg-[oklch(0.4_0.05_160)] border-[oklch(0.45_0.05_160)] text-[oklch(0.9_0.03_160)]' 
                  : 'bg-[#f0f9f4] border-[#95d5b2] text-[#1b4332]'
              }`}
              required
            />
          </div>

          {!isLogin && userType === 'tourist' && (
            <div>
              <label className={`block mb-2 ${darkMode ? 'text-[oklch(0.8_0.03_160)]' : 'text-[#1b4332]'}`}>Phone Number</label>
              <input
                type="tel"
                value={formData.phoneNo}
                onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52b788] ${
                  darkMode 
                    ? 'bg-[oklch(0.4_0.05_160)] border-[oklch(0.45_0.05_160)] text-[oklch(0.9_0.03_160)]' 
                    : 'bg-[#f0f9f4] border-[#95d5b2] text-[#1b4332]'
                }`}
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full px-6 py-3 bg-[#52b788] text-white rounded-lg hover:bg-[#40916c] transition-colors shadow-lg"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Only show signup toggle for tourists */}
        {userType === 'tourist' && (
          <p className={`mt-4 text-center text-sm ${darkMode ? 'text-[oklch(0.7_0.02_160)]' : 'text-[#2d6a4f]'}`}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#52b788] hover:text-[#40916c] transition-colors"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
