import { Menu, X, User, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import logoImage from "figma:asset/1f8de689c1d8400eb5fcec504dd8fed5735a0a32.png";

interface NavbarProps {
  user: any;
  onNavigate: (
    page: "home" | "packages" | "dashboard" | "admin" | "map",
  ) => void;
  onAuthClick: () => void;
  onLogout: () => void;
  currentPage: string;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export function Navbar({
  user,
  onNavigate,
  onAuthClick,
  onLogout,
  currentPage,
  darkMode,
  toggleDarkMode,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isMapPage = currentPage === "map";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", page: "home" as const },
    { label: "Packages", page: "packages" as const },
    { label: "Map", page: "map" as const },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? darkMode
            ? "bg-black border-gray-100 shadow-lg"
            : "bg-white border-gray-200 shadow-lg"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => onNavigate("home")}
          >
            <img
              src={logoImage}
              alt="YourSabahTrips"
              className="h-12"
            />
          </div>

          {/* Desktop Navigation - Moved to Right */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`transition-colors ${
                  currentPage === item.page
                    ? "text-[#52b788]"
                    : darkMode
                      ? "text-white hover:text-[#b7e4c7]"
                      : isScrolled || user
                        ? "text-gray-800 hover:text-[#52b788]"
                        : "text-black hover:text-[#b7e4c7]"
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${
                currentPage === "home" && !isScrolled
                  ? "bg-black/20 text-white hover:bg-white/30"
                  : darkMode
                    ? "bg-white/20 text-white hover:bg-white/30"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {user ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() =>
                    onNavigate(
                      user.role === "admin"
                        ? "admin"
                        : "dashboard",
                    )
                  }
                  className={`flex items-center space-x-2 transition-colors cursor-pointer ${
                    darkMode
                      ? "text-white hover:text-[#b7e4c7]"
                      : "text-gray-800 hover:text-[#52b788]"
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span>
                    {user.role === "admin"
                      ? user.username
                      : `${user.firstName} ${user.lastName}`}
                  </span>
                </button>
                <button
                  onClick={onLogout}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    darkMode
                      ? "bg-white/20 text-white hover:bg-white/30"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="px-6 py-2 rounded-lg transition-colors bg-[#52b788] text-white hover:bg-[#40916c]"
              >
                Login / Register
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${
                currentPage === "home" && !isScrolled
                  ? "bg-black/20 text-white hover:bg-white/30"
                  : darkMode
                    ? "bg-white/20 text-white hover:bg-white/30"
                    : "text-gray-800 hover:bg-gray-100"
              }`}
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`transition-colors ${
                darkMode
                  ? "text-white hover:text-[#b7e4c7]"
                  : isScrolled || user
                    ? "text-gray-800 hover:text-[#52b788]"
                    : "text-white hover:text-[#b7e4c7]"
              }`}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden border-t ${
            isScrolled
              ? "bg-white border-gray-200"
              : "bg-white/95 backdrop-blur-sm border-white/20"
          }`}
        >
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  currentPage === item.page
                    ? "bg-[#52b788] text-white"
                    : "text-gray-800 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </button>
            ))}

            {user ? (
              <div className="pt-2 space-y-2">
                <button
                  onClick={() => {
                    onNavigate(
                      user.role === "admin"
                        ? "admin"
                        : "dashboard",
                    );
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 rounded-lg text-gray-800 hover:bg-gray-100"
                >
                  {user.role === "admin"
                    ? user.username
                    : `${user.firstName} ${user.lastName}`}
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 rounded-lg bg-gray-100 text-gray-800"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onAuthClick();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 bg-[#52b788] text-white rounded-lg mt-2"
              >
                Login / Register
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}