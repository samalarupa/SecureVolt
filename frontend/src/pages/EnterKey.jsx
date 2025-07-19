import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function EnterKey() {
  const [key, setKey] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Premium luxury color palette from Homepage
  const colors = {
    primary: '#051937',
    primaryDark: '#030F20',
    primaryLight: '#0A2F5E',
    primaryLightest: '#E9EDF5',
    secondary: '#D4AF37',
    secondaryLight: '#E8CE74',
    secondaryDark: '#A38829',
    accent: '#085F63',
    accentLight: '#0B8A90',
    white: '#FFFFFF',
    offWhite: '#F9F8F5',
    platinum: '#E8E8E8',
    charcoal: '#333333',
    textDark: '#1A1A1A',
    textMuted: '#666666',
    textLight: '#FFFFFF'
  };

  const handleSubmit = async () => {
    const res = await fetch("https://securevolt.webhostdevs.com/backend/check_key.php", {
      method: "POST",
      body: new URLSearchParams({ key }),
    });
    const result = await res.text();
    if (result === "exists") navigate(`/dashboard/${key}`);
    else {
      await fetch("https://securevolt.webhostdevs.com/backend/create_folder.php", {
        method: "POST",
        body: new URLSearchParams({ key }),
      });
      navigate(`/add/${key}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#051937] to-[#030F20]" style={{ color: colors.textLight }}>
      {/* Navigation Bar */}
      <nav className="relative z-50 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 flex items-center justify-center rounded-full" style={{ backgroundColor: colors.secondary }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                </svg>
              </div>
              <button onClick={() => navigate("/")} className="text-xl font-light tracking-tight" style={{ color: colors.white }}>
                <span className="font-normal" style={{ color: colors.secondary }}>SECURE</span>VOLT
              </button>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-10">
            <a href="#features" className="text-sm uppercase tracking-wider hover:text-[#D4AF37] transition-colors duration-300" style={{ color: colors.platinum }}>Features</a>
            <a href="#files" className="text-sm uppercase tracking-wider hover:text-[#D4AF37] transition-colors duration-300" style={{ color: colors.platinum }}>Files</a>
            <a href="#about" className="text-sm uppercase tracking-wider hover:text-[#D4AF37] transition-colors duration-300" style={{ color: colors.platinum }}>About</a>
            <a href="/" className="text-sm uppercase tracking-wider hover:text-[#D4AF37] transition-colors duration-300" style={{ color: colors.platinum }}>Home</a>
            <button
              onClick={() => navigate("/enter-key")}
              className="px-6 py-2 rounded-sm text-sm uppercase tracking-wider"
              style={{ backgroundColor: colors.secondary, color: colors.primary }}
            >
              Client Login
            </button>
          </div>
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md"
              style={{ color: colors.secondary }}
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 inset-x-0 z-50 p-4" style={{ backgroundColor: colors.primaryDark }}>
            <div className="flex flex-col space-y-4 p-4 border border-opacity-20" style={{ borderColor: colors.secondary }}>
              <a href="#features" className="text-sm uppercase tracking-wider hover:text-[#D4AF37] transition-colors duration-300" style={{ color: colors.platinum }}>Features</a>
              <a href="#files" className="text-sm uppercase tracking-wider hover:text-[#D4AF37] transition-colors duration-300" style={{ color: colors.platinum }}>Files</a>
              <a href="#about" className="text-sm uppercase tracking-wider hover:text-[#D4AF37] transition-colors duration-300" style={{ color: colors.platinum }}>About</a>
              <a href="/" className="text-sm uppercase tracking-wider hover:text-[#D4AF37] transition-colors duration-300" style={{ color: colors.platinum }}>Home</a>
              <button
                onClick={() => navigate("/enter-key")}
                className="px-6 py-2 rounded-sm text-sm uppercase tracking-wider self-start"
                style={{ backgroundColor: colors.secondary, color: colors.primary }}
              >
                Client Login
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <section className="relative flex items-center justify-center min-h-[calc(100vh-128px)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[rgba(5,25,55,0.7)] p-8 rounded-sm border-l max-w-md mx-auto"
            style={{ borderColor: colors.secondary }}
          >
            <div className="absolute top-0 left-0 w-1/4 h-1" style={{ backgroundColor: colors.secondary }}></div>
            <h2 className="text-3xl font-light mb-6 text-center" style={{ color: colors.secondary }}>
              ACCESS YOUR VAULT
            </h2>
            <div className="space-y-6">
              <div>
                <label className="text-sm uppercase tracking-wider" style={{ color: colors.platinum }}>
                  Enter Your Key
                </label>
                <input
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="Enter your key..."
                  className="w-full p-3 bg-transparent border rounded-sm focus:outline-none focus:border-[#D4AF37] mt-2"
                  style={{ borderColor: 'rgba(212, 175, 55, 0.3)', color: colors.white }}
                />
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block w-full"
              >
                <button
                  onClick={handleSubmit}
                  className="w-full px-8 py-3 rounded-sm text-sm font-medium uppercase tracking-wider inline-flex items-center justify-center"
                  style={{ backgroundColor: colors.secondary, color: colors.primary }}
                >
                  Access Vault
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-16 relative" style={{ backgroundColor: colors.primaryDark }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 flex items-center justify-center rounded-full" style={{ backgroundColor: colors.secondary }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                  </svg>
                </div>
                <span className="text-xl font-light tracking-tight" style={{ color: colors.white }}>
                  <span className="font-normal" style={{ color: colors.secondary }}>SECURE</span>VOLT
                </span>
              </div>
              <p className="text-sm" style={{ color: colors.platinum }}>
                Uncompromising digital security for the world’s most discerning individuals and organizations.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-light mb-4" style={{ color: colors.secondary }}>
                Navigation
              </h3>
              <ul className="space-y-2">
                {["Features", "Files", "About", "Home"].map((item) => (
                  <li key={item}>
                    <a
                      href={item === "Home" ? "/" : `#${item.toLowerCase()}`}
                      className="text-sm hover:text-[#D4AF37] transition-colors duration-300"
                      style={{ color: colors.platinum }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-light mb-4" style={{ color: colors.secondary }}>
                Contact
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="mailto:info@securevolt.com"
                    className="text-sm hover:text-[#D4AF37] transition-colors duration-300"
                    style={{ color: colors.platinum }}
                  >
                    info@securevolt.com
                  </a>
                </li>
                <li>
                  <p className="text-sm" style={{ color: colors.platinum }}>
                    By appointment only
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t" style={{ borderColor: 'rgba(212, 175, 55, 0.2)' }}>
            <p className="text-center text-xs" style={{ color: colors.textMuted }}>
              © {new Date().getFullYear()} SecureVolt. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}