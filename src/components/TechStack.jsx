import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaMobileAlt,
  FaDatabase,
  FaAws,
  FaFigma,
} from "react-icons/fa";

import {
  SiMongodb,
  SiNextdotjs,
  SiTailwindcss,
  SiPostgresql,
  SiFirebase,
  SiFlutter,
} from "react-icons/si";

import { TbApi } from "react-icons/tb";

const techs = [
  { name: "React.js", icon: <FaReact /> },
  { name: "Node.js", icon: <FaNodeJs /> },
  { name: "React Native", icon: <FaMobileAlt /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss /> },
  { name: "REST API", icon: <TbApi /> },
  { name: "PostgreSQL", icon: <SiPostgresql /> },
  { name: "Firebase", icon: <SiFirebase /> },
  { name: "AWS", icon: <FaAws /> },
  { name: "Flutter", icon: <SiFlutter /> },
  { name: "Figma", icon: <FaFigma /> },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 px-6 bg-[#080808]" ref={ref}>
      <div className="max-w-6xl mx-auto">

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase mb-3">Technologies</div>
          <h2 className="text-3xl md:text-4xl font-bold">My Tech Stack</h2>
          <motion.div
            className="w-12 h-0.5 bg-[#c9a84c] mx-auto mt-4"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4"
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {techs.map((tech) => (
            <motion.div
              key={tech.name}
              variants={item}
              whileHover={{ y: -6, scale: 1.05, borderColor: "rgba(201,168,76,0.5)" }}
              className="group bg-[#111] border border-white/5 rounded-xl p-4 flex flex-col items-center gap-2 cursor-default transition-colors hover:bg-[#c9a84c]/5"
            >
              <span className="text-3xl text-[#c9a84c] group-hover:scale-110 transition-transform">
  {tech.icon}
</span>
              <span className="text-gray-400 text-xs text-center group-hover:text-white transition-colors tracking-wide">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}