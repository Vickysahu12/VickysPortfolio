import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const allProjects = [
  {
    title: "E-Commerce Platform",
    desc: "A complete e-commerce solution for the beauty industry. Features include real-time inventory, seamless multi-step checkout, and high-performance storefront with smart search.",
    tags: ["Next.js", "Node.js", "MongoDB"],
    color: "#c9a84c",
    category: "Web",
  },
  {
    title: "On-Demand Service App",
    desc: "A complete logistics application connecting customers through real-time location tracking, smart routing, and seamless in-app communication features.",
    tags: ["React Native", "Node.js", "Socket.io"],
    color: "#4CAF50",
    category: "Mobile",
  },
  {
    title: "Business Dashboard",
    desc: "A feature-rich analytics and management dashboard with real-time charts, data export, user management, and role-based access control.",
    tags: ["React.js", "Node.js", "PostgreSQL"],
    color: "#2196F3",
    category: "Web",
  },
  {
    title: "Restaurant Website",
    desc: "Dynamic restaurant website with online menu management, table booking system, and CMS for the owner to update content without any code.",
    tags: ["Next.js", "MongoDB", "Tailwind"],
    color: "#FF5722",
    category: "Web",
  },
  {
    title: "Fitness Tracker App",
    desc: "Cross-platform mobile app for tracking workouts, calories, and progress with personalized AI-based fitness recommendations.",
    tags: ["React Native", "Firebase", "Node.js"],
    color: "#9C27B0",
    category: "Mobile",
  },
  {
    title: "Brand Identity — TechCo",
    desc: "Complete brand identity design including logo, color system, typography guide, social media kit, and a full Figma design system.",
    tags: ["Figma", "Illustrator", "Branding"],
    color: "#E91E63",
    category: "Design",
  },
];

const filters = ["All", "Web", "Mobile", "Design"];

const card = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
  exit:   { opacity: 0, y: -20, scale: 0.96, transition: { duration: 0.25 } },
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const filtered = activeFilter === "All"
    ? allProjects
    : allProjects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 px-6 bg-[#080808]" ref={ref}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          className="flex flex-wrap justify-between items-end mb-10 gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase mb-3">Portfolio</div>
            <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
            <p className="text-gray-500 text-sm mt-2">
              Crafted solutions representing technical mastery and design precision.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="text-[#c9a84c] text-sm border border-[#c9a84c]/30 px-4 py-2 rounded hover:bg-[#c9a84c]/10 transition-colors tracking-wide"
          >
            Explore All Work →
          </motion.button>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filters.map((f) => (
            <motion.button
              key={f}
              onClick={() => setActiveFilter(f)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-colors duration-200"
              style={{
                color: activeFilter === f ? "#0a0a0a" : "#9ca3af",
              }}
            >
              {/* Active background pill */}
              {activeFilter === f && (
                <motion.div
                  layoutId="filterPill"
                  className="absolute inset-0 bg-[#c9a84c] rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {/* Inactive border */}
              {activeFilter !== f && (
                <span className="absolute inset-0 border border-white/10 rounded-full hover:border-[#c9a84c]/30 transition-colors" />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {f}
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                    activeFilter === f
                      ? "bg-black/20 text-black"
                      : "bg-white/5 text-gray-500"
                  }`}
                >
                  {f === "All"
                    ? allProjects.length
                    : allProjects.filter((p) => p.category === f).length}
                </span>
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.title}
                variants={card}
                initial="hidden"
                animate="show"
                exit="exit"
                layout
                whileHover={{ y: -8 }}
                className="group bg-[#111] border border-white/5 rounded-2xl overflow-hidden hover:border-[#c9a84c]/20 transition-colors duration-300"
              >
                {/* Thumbnail */}
                <div className="h-48 bg-[#1a1a1a] relative overflow-hidden flex items-center justify-center">
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at center, ${project.color}22, transparent)`,
                    }}
                    whileHover={{
                      background: `radial-gradient(circle at center, ${project.color}44, transparent)`,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Category badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full text-xs text-gray-300 tracking-wide">
                    {project.category}
                  </div>
                  <div className="text-5xl opacity-15">💻</div>
                  {/* Replace with:
                      <img src={`/projects/${project.title}.png`} className="w-full h-full object-cover" /> */}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-[#c9a84c]/10 text-[#c9a84c] border border-[#c9a84c]/20 px-2.5 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-bold text-lg text-white mb-2">{project.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{project.desc}</p>
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="text-sm text-[#c9a84c] tracking-wide flex items-center gap-1.5 group-hover:gap-2.5 transition-all"
                  >
                    View Project <span>→</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="text-center py-20 text-gray-600"
            >
              No projects in this category yet.
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}