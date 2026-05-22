import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const navLinks = ["About", "Skills", "Projects", "Services", "Contact"];

const socials = [
  { label: "G", title: "GitHub",   href: "https://github.com" },
  { label: "in", title: "LinkedIn", href: "https://linkedin.com" },
  { label: "W", title: "WhatsApp", href: "https://wa.me/916372486617" },
];

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="bg-[#080808] border-t border-white/5 px-6 py-12"
    >
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#c9a84c] font-bold text-lg">✦</span>
              <span className="font-bold text-white text-lg tracking-widest uppercase">
                WEBNETIC <span className="text-[#c9a84c]">AI</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              Building fast, scalable, and beautiful digital products that make an impact.
            </p>
            <div className="flex gap-3 mt-4">
              {socials.map((s) => (
                <motion.a
                  key={s.title}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  title={s.title}
                  whileHover={{ scale: 1.15, borderColor: "rgba(201,168,76,0.5)", color: "#c9a84c" }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 bg-[#111] border border-white/10 rounded-lg text-gray-400 text-xs flex items-center justify-center font-bold transition-colors"
                >
                  {s.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-xs text-gray-500 tracking-widest uppercase mb-4">Navigation</div>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link}>
                  <motion.button
                    onClick={() => scrollTo(link)}
                    whileHover={{ x: 4, color: "#c9a84c" }}
                    className="text-sm text-gray-400 transition-colors"
                  >
                    {link}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="text-xs text-gray-500 tracking-widest uppercase mb-4">Contact</div>
            <div className="space-y-2">
              <motion.a
                href="mailto:bikisahu161@gmail.com"
                whileHover={{ x: 3, color: "#c9a84c" }}
                className="text-sm text-gray-400 block transition-colors"
              >
                bikisahu161@gmail.com
              </motion.a>
              <motion.a
                href="tel:+916372486617"
                whileHover={{ x: 3, color: "#c9a84c" }}
                className="text-sm text-gray-400 block transition-colors"
              >
                +91 6372486617
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3"
        >
          <p className="text-gray-600 text-xs">
            Built with passion by <span className="text-[#c9a84c]">Vicky</span> — WEBNETIC AI
          </p>
          <p className="text-gray-700 text-xs">© 2026 WEBNETIC AI. All rights reserved.</p>
        </motion.div>

      </div>
    </motion.footer>
  );
}