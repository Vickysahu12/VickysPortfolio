import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = ["About", "Skills", "Projects", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      // Active section detection
      const sections = navLinks.map((l) => document.getElementById(l.toLowerCase()));
      sections.forEach((sec) => {
        if (!sec) return;
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          setActiveSection(sec.id);
        }
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 py-3" : "py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.03 }}
        >
          <span className="text-[#c9a84c] font-bold text-xl">✦</span>
          <span className="font-bold text-white text-lg tracking-widest uppercase">
            WEBNETIC <span className="text-[#c9a84c]">AI</span>
          </span>
        </motion.div>

        {/* Desktop Navbar */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link} className="relative">
              <button
                onClick={() => scrollTo(link)}
                className={`text-sm tracking-widest uppercase transition-colors duration-200 ${
                  activeSection === link.toLowerCase()
                    ? "text-[#c9a84c]"
                    : "text-gray-400 hover:text-[#c9a84c]"
                }`}
              >
                {link}
              </button>
              {/* Active underline */}
              {activeSection === link.toLowerCase() && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#c9a84c] rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </li>
          ))}
        </ul>

        {/* CTA button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => scrollTo("Contact")}
          className="hidden md:block px-5 py-2 bg-[#c9a84c] text-black text-sm font-bold rounded tracking-wider hover:bg-[#f0d98a] transition-colors duration-200"
        >
          Hire Me
        </motion.button>

        {/* Mobile Hamburger */}
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#111] border-t border-white/5 px-6 py-4 overflow-hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className={`block w-full text-left py-3 text-sm tracking-widest uppercase border-b border-white/5 transition-colors ${
                  activeSection === link.toLowerCase() ? "text-[#c9a84c]" : "text-gray-400"
                }`}
              >
                {link}
              </button>
            ))}
            <button
              onClick={() => scrollTo("Contact")}
              className="mt-4 w-full py-2.5 bg-[#c9a84c] text-black text-sm font-bold rounded tracking-wider"
            >
              Hire Me
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}