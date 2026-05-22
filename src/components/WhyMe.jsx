import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const reasons = [
  {
    icon: "⚡",
    title: "Fast Delivery",
    desc: "Rapid development with efficient deployment processes. No compromise on quality.",
    stat: "2x",
    statLabel: "Faster than average",
  },
  {
    icon: "🎯",
    title: "Custom Built",
    desc: "Individually crafted solutions. No templates, built exactly for your needs.",
    stat: "100%",
    statLabel: "Custom every time",
  },
  {
    icon: "🧪",
    title: "QA Excellence",
    desc: "Rigorous testing protocols ensuring the highest standards and flawless performance.",
    stat: "0",
    statLabel: "Bug tolerance",
  },
  {
    icon: "💬",
    title: "Clear Support",
    desc: "Direct access to senior tech talent for ongoing maintenance and instant clarity.",
    stat: "24h",
    statLabel: "Response time",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const card = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function WhyMe() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-6 bg-[#0a0a0a] relative overflow-hidden" ref={ref}>

      {/* Background glow */}
      <motion.div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#c9a84c]/4 blur-[100px] pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase mb-3">Advantage</div>
          <h2 className="text-3xl md:text-4xl font-bold">Why Partner With Me</h2>
          <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">
            Not just a developer — a dedicated partner invested in your success.
          </p>
          <motion.div
            className="w-12 h-0.5 bg-[#c9a84c] mx-auto mt-4"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 mt-14"
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {reasons.map((r) => (
            <motion.div
              key={r.title}
              variants={card}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-[#111] border border-white/5 rounded-2xl p-6 text-center hover:border-[#c9a84c]/30 transition-all duration-300 cursor-default overflow-hidden"
            >
              {/* Hover glow bg */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#c9a84c]/0 to-[#c9a84c]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

              {/* Stat — top right */}
              <div className="absolute top-4 right-4 text-right">
                <div className="text-[#c9a84c] font-bold text-lg leading-none">{r.stat}</div>
                <div className="text-gray-600 text-[9px] tracking-wide mt-0.5">{r.statLabel}</div>
              </div>

              {/* Icon */}
              <motion.div
                whileHover={{ rotate: [0, -12, 12, 0], scale: 1.2 }}
                transition={{ duration: 0.4 }}
                className="w-14 h-14 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-full flex items-center justify-center text-2xl mx-auto mb-5 group-hover:bg-[#c9a84c]/20 transition-colors relative z-10"
              >
                {r.icon}
              </motion.div>

              <h3 className="font-bold text-white mb-3 relative z-10">{r.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed relative z-10">{r.desc}</p>

              {/* Bottom gold line on hover */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-[#c9a84c] rounded-full"
                initial={{ width: "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-[#c9a84c]/10 via-[#c9a84c]/5 to-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <div className="font-bold text-white text-lg mb-1">
              Ready to start your project?
            </div>
            <div className="text-gray-500 text-sm">
              Free consultation • Reply within 24 hours • No commitment required
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-7 py-3 bg-[#c9a84c] text-black font-bold text-sm rounded-lg tracking-wider hover:bg-[#f0d98a] transition-colors whitespace-nowrap flex-shrink-0"
          >
            Let's Talk →
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}