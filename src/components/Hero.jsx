import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const roles = [
  "Full Stack Developer",
  "Web App Builder",
  "Mobile App Developer",
  "UI/UX Enthusiast",
];

// Reusable animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay },
  }),
};

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 45);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#c9a84c]/5 rounded-full blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-20 right-20 w-72 h-72 bg-[#c9a84c]/4 rounded-full blur-[80px] pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(201,168,76,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,76,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-24">

        {/* Badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.1}
          className="inline-block px-4 py-1.5 border border-[#c9a84c]/30 text-[#c9a84c] text-xs tracking-[0.2em] uppercase rounded-full mb-8"
        >
          Premium Web & App Architecture
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.3}
          className="font-bold text-5xl md:text-7xl leading-tight mb-4"
        >
          Hi, I'm <span className="text-[#c9a84c]">Vicky</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.5}
          className="text-2xl md:text-4xl font-semibold text-white/80 mb-6 h-12 flex items-center justify-center gap-2"
        >
          {displayed}
          <span className="inline-block w-0.5 h-8 bg-[#c9a84c] animate-pulse" />
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.7}
          className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Crafting elite digital experiences at{" "}
          <span className="text-[#c9a84c]">WEBNETIC AI</span>. I specialize in
          building scalable, modern high-performance web & mobile applications
          that merge cutting-edge technology with sophisticated innovative design.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.9}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="px-7 py-3 bg-[#c9a84c] text-black font-bold text-sm rounded tracking-wider hover:bg-[#f0d98a] transition-colors duration-200"
          >
            View My Work
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-7 py-3 border border-[#c9a84c]/50 text-[#c9a84c] font-bold text-sm rounded tracking-wider hover:bg-[#c9a84c]/10 transition-colors duration-200"
          >
            Get In Touch
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1.1}
          className="mt-20 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-600 tracking-widest uppercase">Scroll</span>
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-[#c9a84c] to-transparent"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

      </div>
    </section>
  );
}