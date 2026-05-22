import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const testimonials = [
  {
    name: "Jonathan Reed",
    role: "CEO, TechNova Solutions",
    review: "Vicky transformed our digital presence. The architecture he built for our enterprise dashboard is not only beautiful but incredibly fast. A true master of his craft.",
    rating: 5,
    company: "TechNova",
  },
  {
    name: "Priya Sharma",
    role: "Founder, ShopEase",
    review: "Working with WEBNETIC AI was an amazing experience. Our e-commerce platform was delivered on time, works flawlessly, and looks absolutely stunning. Highly recommended!",
    rating: 5,
    company: "ShopEase",
  },
  {
    name: "Rahul Mehta",
    role: "Product Manager, DeliverNow",
    review: "The on-demand app Vicky built for us handles thousands of orders daily without a single issue. Clean code, great communication, and zero compromise on quality.",
    rating: 5,
    company: "DeliverNow",
  },
];

const variants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80, scale: 0.96 }),
  center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
  exit:  (dir) => ({ opacity: 0, x: dir > 0 ? -80 : 80, scale: 0.96, transition: { duration: 0.3 } }),
};

export default function Testimonials() {
  const [active, setActive]       = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused]       = useState(false);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Auto-play every 4 seconds
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [paused, active]);

  const goTo = (i) => {
    setDirection(i > active ? 1 : -1);
    setActive(i);
  };

  const prev = () => {
    setDirection(-1);
    setActive((p) => (p - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setDirection(1);
    setActive((p) => (p + 1) % testimonials.length);
  };

  return (
    <section className="py-24 px-6 bg-[#080808] relative overflow-hidden" ref={ref}>

      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(201,168,76,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,76,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#c9a84c]/3 blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase mb-3">Testimonials</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Feedback</h2>
          <motion.div
            className="w-12 h-0.5 bg-[#c9a84c] mx-auto"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Main card */}
          <div className="bg-[#111] border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden min-h-[280px] flex flex-col justify-center">

            {/* Gold corner accent */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-[#c9a84c]/20 rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-[#c9a84c]/20 rounded-br-3xl" />

            {/* Big quote */}
            <div className="text-[#c9a84c]/10 text-[120px] font-serif absolute top-0 left-6 leading-none select-none">"</div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative z-10"
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {Array(testimonials[active].rating).fill(0).map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0, rotate: -30 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ delay: i * 0.08, type: "spring", stiffness: 200 }}
                      className="text-[#c9a84c] text-xl"
                    >
                      ★
                    </motion.span>
                  ))}
                </div>

                {/* Review */}
                <p className="text-white/80 text-lg md:text-xl leading-relaxed italic text-center mb-10 max-w-2xl mx-auto">
                  "{testimonials[active].review}"
                </p>

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#f0d98a] flex items-center justify-center text-black font-bold text-lg">
                      {testimonials[active].name[0]}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#111]" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-white">{testimonials[active].name}</div>
                    <div className="text-gray-500 text-sm">{testimonials[active].role}</div>
                  </div>
                  <div className="ml-4 px-3 py-1 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-full text-[#c9a84c] text-xs font-semibold tracking-wide">
                    {testimonials[active].company}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">

            {/* Prev button */}
            <motion.button
              onClick={prev}
              whileHover={{ scale: 1.1, x: -3 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full border border-white/10 bg-[#111] text-gray-400 hover:border-[#c9a84c]/40 hover:text-[#c9a84c] transition-colors flex items-center justify-center"
            >
              ←
            </motion.button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => goTo(i)}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    width:      active === i ? 28 : 8,
                    background: active === i ? "#c9a84c" : "rgba(255,255,255,0.15)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-2 rounded-full"
                />
              ))}
            </div>

            {/* Next button */}
            <motion.button
              onClick={next}
              whileHover={{ scale: 1.1, x: 3 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full border border-white/10 bg-[#111] text-gray-400 hover:border-[#c9a84c]/40 hover:text-[#c9a84c] transition-colors flex items-center justify-center"
            >
              →
            </motion.button>
          </div>

          {/* Auto-play indicator */}
          {!paused && (
            <div className="mt-4 w-full h-px bg-white/5 rounded-full overflow-hidden">
              <motion.div
                key={active}
                className="h-full bg-[#c9a84c]/40 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4, ease: "linear" }}
              />
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
}