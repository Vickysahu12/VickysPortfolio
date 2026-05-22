import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";

const services = ["Website Development", "Web Application", "Mobile App", "E-Commerce", "UI/UX Design", "Other"];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay } },
});

const contactItems = [
  { icon: "📧", label: "Email",         value: "bikisahu161@gmail.com" },
  { icon: "📞", label: "Phone",         value: "+91 6372486617" },
  { icon: "⏱",  label: "Response Time", value: "Within 24 hours" },
];

export default function Contact() {
  const [form, setForm]       = useState({ name: "", email: "", service: "", message: "" });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef               = useRef(null);
  const sectionRef            = useRef(null);
  const inView                = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ── EmailJS setup ──────────────────────────────────────────────
      // 1. Go to https://www.emailjs.com and create a free account
      // 2. Add an Email Service (Gmail) → copy Service ID
      // 3. Create an Email Template → copy Template ID
      // 4. Copy your Public Key from Account → API Keys
      // 5. Replace the 3 strings below with your actual IDs
      // ──────────────────────────────────────────────────────────────
      await emailjs.sendForm(
        "YOUR_SERVICE_ID",    // 👈 replace
        "YOUR_TEMPLATE_ID",   // 👈 replace
        formRef.current,
        "YOUR_PUBLIC_KEY"     // 👈 replace
      );
      setSent(true);
      setForm({ name: "", email: "", service: "", message: "" });
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      alert("Something went wrong. Please try again or email directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-[#0a0a0a]" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">

        <motion.div
          className="text-center mb-16"
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <div className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase mb-3">Get In Touch</div>
          <h2 className="text-3xl md:text-4xl font-bold">Let's Build Something Great</h2>
          <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">
            Currently accepting projects and consulting inquiries. Let's start a conversation.
          </p>
          <motion.div
            className="w-12 h-0.5 bg-[#c9a84c] mx-auto mt-4"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">

          {/* Left — Contact Info */}
          <motion.div
            className="flex flex-col gap-6"
            variants={fadeUp(0.2)}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            <div className="bg-[#111] border border-white/5 rounded-2xl p-6">
              <div className="text-xs text-[#c9a84c] tracking-[0.15em] uppercase mb-5">Contact Details</div>
              <div className="space-y-4">
                {contactItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-9 h-9 bg-[#c9a84c]/10 rounded-lg flex items-center justify-center text-[#c9a84c] flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">{item.label}</div>
                      <div className="text-white text-sm">{item.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02, borderColor: "rgba(201,168,76,0.4)" }}
              className="bg-[#111] border border-[#c9a84c]/20 rounded-2xl p-6 transition-colors"
            >
              <div className="text-[#c9a84c] font-bold mb-2">✦ Free Consultation</div>
              <p className="text-gray-400 text-sm leading-relaxed">
                First consultation is completely free. Share your idea and get a custom quotation within 24 hours — no strings attached.
              </p>
            </motion.div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            className="bg-[#111] border border-white/5 rounded-2xl p-6 md:p-8"
            variants={fadeUp(0.3)}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="h-full flex flex-col items-center justify-center gap-3 py-10"
              >
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl"
                >
                  ✅
                </motion.div>
                <div className="text-white font-bold text-lg">Message Sent!</div>
                <div className="text-gray-400 text-sm text-center">We'll get back to you within 24 hours.</div>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 tracking-wide uppercase block mb-1.5">Your Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 tracking-wide uppercase block mb-1.5">Email Address</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-500 tracking-wide uppercase block mb-1.5">Service Needed</label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-sm text-gray-300 focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
                  >
                    <option value="">Select a service</option>
                    {services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-gray-500 tracking-wide uppercase block mb-1.5">Tell Me About Your Project</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Describe your project idea..."
                    rows={4}
                    required
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]/50 transition-colors resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.97 }}
                  className="w-full py-3.5 bg-[#c9a84c] text-black font-bold text-sm rounded-lg tracking-wider hover:bg-[#f0d98a] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        className="inline-block w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    "Send Inquiry →"
                  )}
                </motion.button>

                <p className="text-xs text-gray-600 text-center">
                  Or email directly at{" "}
                  <a href="mailto:bikisahu161@gmail.com" className="text-[#c9a84c] hover:underline">
                    bikisahu161@gmail.com
                  </a>
                </p>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}