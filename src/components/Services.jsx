import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaGlobe,
  FaBolt,
  FaShoppingCart,
  FaMobileAlt,
  FaPaintBrush,
} from "react-icons/fa";

import { TbApi } from "react-icons/tb";

const services = [
  {
    icon: <FaGlobe />,
    title: "Website Dev",
    desc: "Stunning, high-performance websites built for the next generation of businesses. Responsive, fast, and SEO optimised.",
  },
  {
    icon: <FaBolt />,
    title: "Web Apps",
    desc: "Complex, feature-rich web platforms and dashboards with clean UX, real-time data, and high availability.",
  },
  {
    icon: <FaShoppingCart />,
    title: "E-Commerce",
    desc: "Complete e-commerce solutions with seamless checkout, payment integration, inventory management, and high-performance storefront.",
  },
  {
    icon: <FaMobileAlt />,
    title: "Mobile Apps",
    desc: "Native and cross-platform mobile applications on iOS and Android, built with pixel-perfect precision and performance.",
  },
  {
    icon: <FaPaintBrush />,
    title: "UI/UX Design",
    desc: "User-centric design services including wireframes, prototypes, and immersive Figma designs with animation concepts.",
  },
  {
    icon: <TbApi />,
    title: "API Development",
    desc: "Scalable REST APIs and third-party integrations that power your apps with efficiency, reliability, and precision.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const card = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 px-6 bg-[#0a0a0a]" ref={ref}>
      <div className="max-w-6xl mx-auto">

        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase mb-3">What I Do</div>
          <h2 className="text-3xl md:text-4xl font-bold">Elite Services</h2>
          <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">
            Premium engineered solutions for the next generation of business.
          </p>
          <motion.div
            className="w-12 h-0.5 bg-[#c9a84c] mx-auto mt-4"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 mt-12"
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {services.map((svc) => (
            <motion.div
              key={svc.title}
              variants={card}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group bg-[#111] border border-white/5 rounded-2xl p-6 hover:border-[#c9a84c]/30 hover:bg-[#c9a84c]/5 transition-colors duration-300 cursor-default"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.4 }}
                className="w-14 h-14 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-2xl flex items-center justify-center text-2xl text-[#c9a84c] mb-5 group-hover:bg-[#c9a84c]/20 transition-all duration-300 shadow-lg shadow-[#c9a84c]/10"
              >
                {svc.icon}
              </motion.div>
              <h3 className="font-bold text-white text-base mb-3">{svc.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{svc.desc}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}