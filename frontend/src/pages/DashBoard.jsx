import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { key } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({ files: [], notes: [] });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetch(`https://securevolt.webhostdevs.com/backend/get_files.php?key=${key}`)
      .then(res => res.json())
      .then(data => {
        console.log("get_files.php response:", data);
        setData(data);
      })
      .catch(err => {
        console.error("Failed to fetch data:", err);
        setError("Failed to load files and notes.");
      });
  }, [key]);

  // Determine if a file is an image or video based on extension
  const isImage = (fileName) => /\.(jpg|jpeg|png|gif|webp)$/i.test(fileName);
  const isVideo = (fileName) => /\.(mp4|webm|ogg)$/i.test(fileName);

  // Handle file deletion
  const handleDeleteFile = async (filePath) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;

    try {
      const res = await fetch("https://securevolt.webhostdevs.com/backend/delete_file.php", {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ key, file_path: filePath }),
      });
      const result = await res.json();

      if (result.status === "success") {
        setData(prev => ({
          ...prev,
          files: prev.files.filter(file => file.file_path !== filePath),
        }));
        setError(null);
      } else {
        console.error("Delete file failed:", result.message);
        setError(`Failed to delete file: ${result.message}`);
      }
    } catch (err) {
      console.error("Delete file error:", err);
      setError("An error occurred while deleting the file.");
    }
  };

  // Handle note deletion
  const handleDeleteNote = async (content) => {
    if (!content || !content.trim()) {
      console.error("Delete note skipped: Empty content");
      setError("Cannot delete empty note.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    console.log("Deleting note with content:", content);

    try {
      const res = await fetch("https://securevolt.webhostdevs.com/backend/delete_note.php", {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ key, content }),
      });
      const result = await res.json();

      if (result.status === "success") {
        setData(prev => ({
          ...prev,
          notes: prev.notes.filter(note => note.content !== content),
        }));
        setError(null);
      } else {
        console.error("Delete note failed:", result.message);
        setError(`Failed to delete note: ${result.message}`);
      }
    } catch (err) {
      console.error("Delete note error:", err);
      setError("An error occurred while deleting the note.");
    }
  };

  // Handle file download
  const handleDownloadFile = async (filePath, fileName) => {
    if (!filePath || !fileName) {
      console.error("Download file skipped: Missing filePath or fileName", { filePath, fileName });
      setError("Cannot download file: Invalid file information.");
      return;
    }

    console.log("Initiating download for:", { filePath, fileName });

    try {
      const res = await fetch("https://securevolt.webhostdevs.com/backend/download_file.php", {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ key, file_path: filePath, file_name: fileName }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Download file failed:", errorData.message);
        setError(`Failed to download file: ${errorData.message}`);
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      console.log("Download completed for:", fileName);
    } catch (err) {
      console.error("Download file error:", err);
      setError("An error occurred while downloading the file.");
    }
  };

  // Handle note download
  const handleDownloadNote = (content) => {
    if (!content || !content.trim()) {
      console.error("Download note skipped: Empty content");
      setError("Cannot download empty note.");
      return;
    }

    console.log("Downloading note with content:", content);
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `note_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
              Logout
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
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Error Notification */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 p-4 rounded-sm bg-[rgba(220,38,38,0.8)] text-center"
              style={{ color: colors.white }}
            >
              {error}
              <button
                onClick={() => setError(null)}
                className="ml-4 text-sm underline"
                style={{ color: colors.secondary }}
              >
                Dismiss
              </button>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-4xl font-light tracking-tight flex items-center" style={{ color: colors.secondary }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" viewBox="0 0 24 24" fill="none" stroke={colors.secondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              VAULT FOR: {key}
            </h2>
          </motion.div>

          {/* Notes Section */}
          {data.notes.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <h3 className="text-xl font-light mb-6 uppercase tracking-wider" style={{ color: colors.platinum }}>
                NOTES
              </h3>
              <div className="grid grid-cols-1 gap-6">
                {data.notes.map((note, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative p-6 rounded-sm bg-[rgba(5,25,55,0.7)] border-l"
                    style={{ borderColor: colors.secondary }}
                  >
                    <p className="text-sm pr-16" style={{ color: colors.white }}>
                      {note.content || "(Empty note)"}
                    </p>
                    {/* Action Buttons (Download & Delete) */}
                    {note.content && note.content.trim() && (
                      <motion.div
                        className="absolute top-2 right-2 flex space-x-2 opacity-0"
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <button
                          onClick={() => handleDownloadNote(note.content)}
                          className="p-2 rounded-full bg-[rgba(212,175,55,0.8)] hover:bg-[#D4AF37] transition-colors"
                          aria-label={`Download note`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteNote(note.content)}
                          className="p-2 rounded-full bg-[rgba(220,38,38,0.8)] hover:bg-red-600 transition-colors"
                          aria-label={`Delete note`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke={colors.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Files Section */}
          {data.files.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <h3 className="text-xl font-light mb-6 uppercase tracking-wider" style={{ color: colors.platinum }}>
                YOUR FILES
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.files.map((file, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative block rounded-sm overflow-hidden bg-[rgba(5,25,55,0.7)] border border-transparent hover:border-[#D4AF37] transition-colors duration-300"
                  >
                    <a
                      href={`https://securevolt.webhostdevs.com/backend/${file.file_path}`}
                      target="_blank"
                      rel="noreferrer"
                      className="block"
                    >
                      <div className="aspect-w-4 aspect-h-3">
                        {isImage(file.file_name) ? (
                          <img
                            src={`https://securevolt.webhostdevs.com/backend/${file.file_path}`}
                            alt={file.file_name}
                            className="w-full h-full object-cover"
                          />
                        ) : isVideo(file.file_name) ? (
                          <video
                            src={`https://securevolt.webhostdevs.com/backend/${file.file_path}`}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-[rgba(3,15,32,0.8)]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke={colors.platinum} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                              <polyline points="14 2 14 8 20 8"></polyline>
                            </svg>
                          </div>
                        )}
                      </div>
                    </a>
                    {/* Action Buttons (Download & Delete) */}
                    <motion.div
                      className="absolute top-2 right-2 flex space-x-2 opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <button
                        onClick={() => handleDownloadFile(file.file_path, file.file_name)}
                        className="p-2 rounded-full bg-[rgba(212,175,55,0.8)] hover:bg-[#D4AF37] transition-colors"
                        aria-label={`Download ${file.file_name}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteFile(file.file_path)}
                        className="p-2 rounded-full bg-[rgba(220,38,38,0.8)] hover:bg-red-600 transition-colors"
                        aria-label={`Delete ${file.file_name}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke={colors.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </motion.div>
                    <div className="p-4">
                      <p className="text-sm truncate" style={{ color: colors.white }}>
                        {file.file_name}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Add More Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <button
                onClick={() => navigate(`/add/${key}`)}
                className="px-10 py-4 rounded-sm text-sm font-medium uppercase tracking-wider inline-flex items-center shadow-xl"
                style={{ backgroundColor: colors.secondary, color: colors.primary }}
              >
                Add More Content
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </motion.div>
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