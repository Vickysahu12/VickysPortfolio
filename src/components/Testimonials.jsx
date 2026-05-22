import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const testimonials = [
  {
    name: "Jonathan Reed",
    role: "CEO, TechNova Solutions",
    review: "Vicky transformed our digital presence. The architecture he built for our enterprise dashboard is not only beautiful but incredibly fast. A true master of his craft.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Founder, ShopEase",
    review: "Working with WEBNETIC AI was an amazing experience. Our e-commerce platform was delivered on time, works flawlessly, and looks absolutely stunning. Highly recommended!",
    rating: 5,
  },
  {
    name: "Rahul Mehta",
    role: "Product Manager, DeliverNow",
    review: "The on-demand app Vicky built for us handles thousands of orders daily without a single issue. Clean code, great communication, and zero compromise on quality.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const goTo = (i) => {
    setDirection(i > active ? 1 : -1);
    setActive(i);
  };

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
    exit:  (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60, transition: { duration: 0.3 } }),
  };

  return (
    <section className="py-24 px-6 bg-[#080808]" ref={ref}>
      <div className="max-w-3xl mx-auto text-center">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase mb-3">Testimonials</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Feedback</h2>
          <p className="text-gray-500 text-sm mb-12">Trusted by industry leaders and innovative startups.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#111] border border-white/5 rounded-2xl p-8 md:p-10 relative overflow-hidden min-h-[260px]"
        >
          {/* Big quote */}
          <div className="text-[#c9a84c]/20 text-8xl font-serif absolute top-4 left-8 leading-none select-none">"</div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {Array(testimonials[active].rating).fill(0).map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08, duration: 0.3 }}
                    className="text-[#c9a84c] text-lg"
                  >
                    ★
                  </motion.span>
                ))}
              </div>

              <p className="text-white/80 text-lg leading-relaxed italic mb-8 relative z-10">
                "{testimonials[active].review}"
              </p>

              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#c9a84c]/20 border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c] font-bold">
                  {testimonials[active].name[0]}
                </div>
                <div className="text-left">
                  <div className="font-bold text-white text-sm">{testimonials[active].name}</div>
                  <div className="text-gray-500 text-xs">{testimonials[active].role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => goTo(i)}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              animate={{ width: active === i ? 24 : 8, background: active === i ? "#c9a84c" : "rgba(255,255,255,0.2)" }}
              transition={{ duration: 0.3 }}
              className="h-2 rounded-full"
            />
          ))}
        </div>

      </div>
    </section>
  );
}