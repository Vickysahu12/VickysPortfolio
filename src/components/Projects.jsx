import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const projects = [
  { title: "E-Commerce Platform",    desc: "A complete e-commerce solution for the beauty industry. Features include real-time inventory, seamless multi-step checkout, and high-performance storefront with smart search.", tags: ["Next.js", "Node.js", "MongoDB"],     color: "#c9a84c" },
  { title: "On-Demand Service App",  desc: "A complete logistics application connecting customers through real-time location tracking, smart routing, and seamless in-app communication features.",                       tags: ["React Native", "Node.js", "Socket.io"], color: "#4CAF50" },
  { title: "Business Dashboard",     desc: "A feature-rich analytics and management dashboard with real-time charts, data export, user management, and role-based access control.",                                    tags: ["React.js", "Node.js", "PostgreSQL"],    color: "#2196F3" },
  { title: "Restaurant Website",     desc: "Dynamic restaurant website with online menu management, table booking system, and CMS for the owner to update content without any code.",                                  tags: ["Next.js", "MongoDB", "Tailwind"],        color: "#FF5722" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const card = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 px-6 bg-[#080808]" ref={ref}>
      <div className="max-w-6xl mx-auto">

        <motion.div
          className="flex flex-wrap justify-between items-end mb-12 gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase mb-3">Portfolio</div>
            <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
            <p className="text-gray-500 text-sm mt-2">Crafted solutions representing technical mastery and design precision.</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="text-[#c9a84c] text-sm border border-[#c9a84c]/30 px-4 py-2 rounded hover:bg-[#c9a84c]/10 transition-colors tracking-wide"
          >
            Explore All Work →
          </motion.button>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={card}
              whileHover={{ y: -8 }}
              className="group bg-[#111] border border-white/5 rounded-2xl overflow-hidden hover:border-[#c9a84c]/20 transition-colors duration-300"
            >
              {/* Thumbnail */}
              <div className="h-48 bg-[#1a1a1a] relative overflow-hidden flex items-center justify-center">
                <motion.div
                  className="absolute inset-0 opacity-10"
                  style={{ background: `radial-gradient(circle at center, ${project.color}, transparent)` }}
                  whileHover={{ opacity: 0.2 }}
                />
                <div className="text-5xl opacity-20">💻</div>
                {/* Replace with: <img src={`/projects/...`} className="w-full h-full object-cover" /> */}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-[#c9a84c]/10 text-[#c9a84c] border border-[#c9a84c]/20 px-2.5 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-bold text-lg text-white mb-2">{project.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{project.desc}</p>
                <motion.button
                  whileHover={{ x: 4 }}
                  className="text-sm text-[#c9a84c] tracking-wide flex items-center gap-1"
                >
                  View Project <span>→</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}