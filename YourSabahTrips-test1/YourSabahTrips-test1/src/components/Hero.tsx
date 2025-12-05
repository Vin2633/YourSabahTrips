import { SearchBar } from "./SearchBar";

interface HeroProps {
  darkMode: boolean;
  onSearch?: (location: string, activity: string) => void;
}

export function Hero({ darkMode, onSearch }: HeroProps) {
  return (
    <div className="relative h-[700px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1670308490572-600d71fd23fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudCUyMGtpbmFiYWx1JTIwc2FiYWh8ZW58MXx8fHwxNzY0MzA1NTI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Mount Kinabalu, Sabah"
          className="w-full h-full object-cover"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-b ${
            darkMode
              ? "from-[#1a1a1a]/90 via-[#2d2d2d]/70 to-[#121212]"
              : "from-[#1a5f3f]/80 via-[#2d6a4f]/60 to-white"
          }`}
        ></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 gap-8">
        <div className="text-center max-w-4xl">
          <h1
            className={
              darkMode ? "text-white mb-6" : "text-white mb-6"
            }
          >
            Discover the Magic of Sabah, Borneo
          </h1>
        </div>

        {/* Search Bar integrated into Hero */}
        <div className="w-full max-w-4xl px-4">
          <SearchBar darkMode={darkMode} onSearch={onSearch} />
        </div>
      </div>

      {/* Bottom Wave Effect */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t ${
          darkMode
            ? "from-[#121212] to-transparent"
            : "from-white to-transparent"
        }`}
      ></div>
    </div>
  );
}