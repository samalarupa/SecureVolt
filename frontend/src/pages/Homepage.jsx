import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Homepage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "",
  });
  const [formStatus, setFormStatus] = useState(null);

  // Premium luxury color palette
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

  // Features data
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      ),
      title: "Military-Grade Encryption",
      description: "AES-256 encryption with sophisticated key management for unparalleled data protection."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      ),
      title: "Zero-Knowledge Architecture",
      description: "We never store your encryption keys, ensuring only you can access your sensitive information."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      ),
      title: "Exclusive Membership",
      description: "Access is limited to verified high-profile individuals and organizations by invitation only."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      ),
      title: "Multi-Platform Security",
      description: "Seamless protection across all your devices with synchronized secure vaults."
    }
  ];

  // File types data
  const fileTypes = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      ),
      title: "Documents",
      description: "Keep your confidential documents secure with end-to-end encryption."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
      ),
      title: "Media Files",
      description: "Securely store and share images, videos, and audio files with selective access control."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      ),
      title: "Crypto Assets",
      description: "Protect private keys and digital asset documentation with military-grade security."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      ),
      title: "Schedules & Contacts",
      description: "Secure your sensitive appointments and high-profile connections."
    }
  ];

  // Form handling
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.reason) {
      setFormStatus({ type: "error", message: "Please fill out all fields." });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setFormStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }
    // Simulate form submission
    setTimeout(() => {
      setFormStatus({ type: "success", message: "Request submitted successfully. We will contact you soon." });
      setFormData({ name: "", email: "", reason: "" });
    }, 500);
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
              <span className="text-xl font-light tracking-tight" style={{ color: colors.white }}>
                <span className="font-normal" style={{ color: colors.secondary }}>SECURE</span>VOLT
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-10">
            <a href="#features" className="text-sm uppercase tracking-wider hover:text-[#D4AF37] transition-colors duration-300" style={{ color: colors.platinum }}>Features</a>
            <a href="#files" className="text-sm uppercase tracking-wider hover:text-[#D4AF37] transition-colors duration-300" style={{ color: colors.platinum }}>Files</a>
            <a href="#about" className="text-sm uppercase tracking-wider hover:text-[#D4AF37] transition-colors duration-300" style={{ color: colors.platinum }}>About</a>
            <a href="#contact" className="text-sm uppercase tracking-wider hover:text-[#D4AF37] transition-colors duration-300" style={{ color: colors.platinum }}>Contact</a>
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
              <a href="#contact" className="text-sm uppercase tracking-wider hover:text-[#D4AF37] transition-colors duration-300" style={{ color: colors.platinum }}>Contact</a>
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

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 opacity-5"
          style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
            backgroundSize: '30px 30px'
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="mx-auto mb-6 w-16 h-16 flex items-center justify-center rounded-full" style={{ backgroundColor: colors.secondary }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
              </svg>
            </div>
            <h1 className="text-6xl font-light tracking-tight mb-6" style={{ color: colors.white }}>
              <span className="font-normal" style={{ color: colors.secondary }}>SECURE</span>VOLT
            </h1>
            <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: colors.platinum }}>
              Uncompromising digital security for those who demand the absolute highest level of protection and discretion.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <button
                onClick={() => navigate("/enter-key")}
                className="px-10 py-4 rounded-sm text-sm font-medium uppercase tracking-wider inline-flex items-center shadow-xl"
                style={{ backgroundColor: colors.secondary, color: colors.primary }}
              >
                Explore SecureVolt
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </motion.div>
            <div className="mt-12 flex flex-wrap justify-center gap-6">
              {["By invitation", "Strict confidentiality", "Elite clientele"].map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="h-1 w-1 rounded-full mr-2" style={{ backgroundColor: colors.secondary }}></div>
                  <span className="text-sm tracking-wider uppercase" style={{ color: colors.platinum }}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light mb-4" style={{ color: colors.secondary }}>
              EXCLUSIVE FEATURES
            </h2>
            <p className="max-w-2xl mx-auto text-lg" style={{ color: colors.platinum }}>
              Our proprietary technology provides unmatched security tailored for high-net-worth individuals and organizations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative p-8 rounded-sm overflow-hidden"
                style={{ backgroundColor: 'rgba(5, 25, 55, 0.7)', borderLeft: `1px solid ${colors.secondary}` }}
              >
                <div className="absolute top-0 left-0 w-1/4 h-1" style={{ backgroundColor: colors.secondary }}></div>
                <div className="flex items-start">
                  <div className="mr-4" style={{ color: colors.secondary }}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-light mb-2" style={{ color: colors.white }}>
                      {feature.title}
                    </h3>
                    <p style={{ color: colors.platinum }}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Files Section */}
      <section id="files" className="py-24 relative" style={{ backgroundColor: 'rgba(3, 15, 32, 0.8)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light mb-4" style={{ color: colors.secondary }}>
              SECURE YOUR FILES
            </h2>
            <p className="max-w-2xl mx-auto text-lg" style={{ color: colors.platinum }}>
              SecureVolt ensures comprehensive protection for all your sensitive data across multiple formats.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {fileTypes.map((fileType, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-sm"
                style={{ backgroundColor: 'rgba(5, 25, 55, 0.5)', border: `1px solid rgba(212, 175, 55, 0.2)` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', color: colors.secondary }}>
                  {fileType.icon}
                </div>
                <h3 className="text-lg font-light mb-2" style={{ color: colors.white }}>
                  {fileType.title}
                </h3>
                <p className="text-sm" style={{ color: colors.platinum }}>
                  {fileType.description}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <button
                onClick={() => navigate("/enter-key")}
                className="px-8 py-3 rounded-sm text-sm font-medium uppercase tracking-wider inline-flex items-center"
                style={{ backgroundColor: colors.secondary, color: colors.primary }}
              >
                Access File Manager
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About/Contact Section */}
      <section id="about" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-light mb-6" style={{ color: colors.secondary }}>
                ABOUT SECUREVOLT
              </h2>
              <p className="mb-4" style={{ color: colors.platinum }}>
                Founded on principles of absolute discretion and uncompromising security, SecureVolt serves an exclusive clientele of high-profile individuals, family offices, and corporations worldwide.
              </p>
              <p className="mb-4" style={{ color: colors.platinum }}>
                Our solutions are designed for those who face unique security challenges due to their position, wealth, or visibility.
              </p>
              <p className="mb-6" style={{ color: colors.platinum }}>
                With proprietary technology developed by former intelligence and cybersecurity experts, we provide a level of protection unavailable through conventional security measures.
              </p>
              <div className="flex flex-col space-y-3">
                <div className="flex items-center">
                  <div className="h-1 w-1 rounded-full mr-2" style={{ backgroundColor: colors.secondary }}></div>
                  <span className="text-sm" style={{ color: colors.platinum }}>Founded in 2021</span>
                </div>
                <div className="flex items-center">
                  <div className="h-1 w-1 rounded-full mr-2" style={{ backgroundColor: colors.secondary }}></div>
                  <span className="text-sm" style={{ color: colors.platinum }}>ISO 27001 Certified</span>
                </div>
                <div className="flex items-center">
                  <div className="h-1 w-1 rounded-full mr-2" style={{ backgroundColor: colors.secondary }}></div>
                  <span className="text-sm" style={{ color: colors.platinum }}>Independent Security Audits</span>
                </div>
              </div>
            </div>
            <div id="contact">
              <h2 className="text-3xl font-light mb-6" style={{ color: colors.secondary }}>
                REQUEST INFORMATION
              </h2>
              <p className="mb-6" style={{ color: colors.platinum }}>
                SecureVolt is available by invitation only. Submit your information for consideration.
              </p>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Full Name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-transparent border rounded-sm focus:outline-none focus:border-[#D4AF37]"
                    style={{ borderColor: 'rgba(212, 175, 55, 0.3)', color: colors.white }}
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Email Address" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-transparent border rounded-sm focus:outline-none focus:border-[#D4AF37]"
                    style={{ borderColor: 'rgba(212, 175, 55, 0.3)', color: colors.white }}
                  />
                </div>
                <div>
                  <textarea 
                    name="reason"
                    placeholder="Reason for Interest" 
                    rows="4"
                    value={formData.reason}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-transparent border rounded-sm focus:outline-none focus:border-[#D4AF37]"
                    style={{ borderColor: 'rgba(212, 175, 55, 0.3)', color: colors.white }}
                  ></textarea>
                </div>
                <div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-block"
                  >
                    <button
                      type="submit"
                      className="px-8 py-3 w-full rounded-sm text-sm font-medium uppercase tracking-wider"
                      style={{ backgroundColor: colors.secondary, color: colors.primary }}
                    >
                      Submit Request
                    </button>
                  </motion.div>
                  {formStatus && (
                    <p
                      className="mt-3 text-xs"
                      style={{ color: formStatus.type === "error" ? "#EF4444" : colors.secondary }}
                    >
                      {formStatus.message}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
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
                {["Features", "Files", "About", "Contact"].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
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