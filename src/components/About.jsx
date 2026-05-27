import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Vicky from "../assets/Image/Vicky.jpg"

const stats = [
  { value: 20, suffix: "+", label: "Projects Completed" },
  { value: 15, suffix: "+", label: "Happy Clients" },
  { value: 5,  suffix: "+", label: "Tech Stacks" },
  { value: 4,  suffix: "+", label: "Years Code" },
];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay } },
});

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

function CountUp({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = Math.ceil(target / 40);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(start);
          }, 40);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 px-6 bg-[#0a0a0a]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Photo */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="flex justify-center"
          >
            <div className="relative w-72 h-72 md:w-80 md:h-80">
              <div className="w-full h-full rounded-2xl bg-[#111] border border-[#c9a84c]/20 overflow-hidden">
                  <img
                    src={Vicky}
                    alt="Vicky"
                    className="w-full h-125 object-cover object-center"
                  />
              </div>
              <motion.div
                className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#c9a84c] rounded-tl-2xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.4 }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#c9a84c] rounded-br-2xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6, duration: 0.4 }}
              />
              <div className="absolute inset-0 rounded-2xl bg-[#c9a84c]/5 blur-xl -z-10" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            <motion.div
              variants={fadeUp(0.1)}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase mb-3"
            >
              About Me
            </motion.div>

            <motion.h2
              variants={fadeUp(0.2)}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
            >
              Full Stack Developer at{" "}
              <span className="text-[#c9a84c]">WEBNETIC AI</span>
            </motion.h2>

            <motion.p
              variants={fadeUp(0.3)}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="text-gray-400 leading-relaxed mb-4"
            >
              I'm a lead developer at WEBNETIC AI. I specialize in building scalable, secure,
              and high-performance web & mobile applications. My philosophy is rooted in the{" "}
              <span className="text-white">"Premium Tech"</span> mindset — where every line of
              code is aligned to the business purpose.
            </motion.p>

            <motion.p
              variants={fadeUp(0.35)}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="text-gray-500 leading-relaxed mb-8"
            >
              I believe technology should not only solve problems but elevate the user's
              perception of the brand.
            </motion.p>

            {/* Skill tags */}
            <motion.div
              variants={fadeUp(0.4)}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="flex flex-wrap gap-3 mb-10"
            >
              {["React.js", "Node.js", "React Native", "Next.js", "MongoDB", "Flutter"].map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.07, duration: 0.3 }}
                  className="px-3 py-1 bg-[#111] border border-[#c9a84c]/20 text-[#c9a84c] text-xs rounded-full tracking-wide"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.03, borderColor: "rgba(201,168,76,0.4)" }}
                  className="bg-[#111] border border-white/5 rounded-xl p-4 transition-colors cursor-default"
                >
                  <div className="text-2xl font-bold text-[#c9a84c]">
                    <CountUp target={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-xs text-gray-500 mt-1 tracking-wide uppercase">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}