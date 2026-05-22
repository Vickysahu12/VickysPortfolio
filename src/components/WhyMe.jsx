import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const reasons = [
  { icon: "⚡", title: "Fast Delivery",  desc: "Rapid development with efficient deployment processes. No compromise on quality." },
  { icon: "🎯", title: "Custom Built",   desc: "Individually crafted solutions. No templates, built exactly for your needs." },
  { icon: "🧪", title: "QA Excellence",  desc: "Rigorous testing protocols ensuring the highest standards and flawless performance." },
  { icon: "💬", title: "Clear Support",  desc: "Direct access to senior tech talent for ongoing maintenance and instant clarity." },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const card = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function WhyMe() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-6 bg-[#0a0a0a]" ref={ref}>
      <div className="max-w-6xl mx-auto">

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase mb-3">Advantage</div>
          <h2 className="text-3xl md:text-4xl font-bold">Why Partner With Me</h2>
          <motion.div
            className="w-12 h-0.5 bg-[#c9a84c] mx-auto mt-4"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 md:grid-cols-4 gap-5"
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {reasons.map((r) => (
            <motion.div
              key={r.title}
              variants={card}
              whileHover={{ y: -8, scale: 1.03 }}
              className="group bg-[#111] border border-white/5 rounded-2xl p-6 text-center hover:border-[#c9a84c]/30 hover:bg-[#c9a84c]/5 transition-colors duration-300 cursor-default"
            >
              <motion.div
                whileHover={{ rotate: [0, -12, 12, 0], scale: 1.15 }}
                transition={{ duration: 0.4 }}
                className="w-14 h-14 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-full flex items-center justify-center text-2xl mx-auto mb-5 group-hover:bg-[#c9a84c]/20 transition-colors"
              >
                {r.icon}
              </motion.div>
              <h3 className="font-bold text-white mb-3">{r.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}