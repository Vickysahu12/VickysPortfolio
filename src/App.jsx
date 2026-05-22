import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import TechStack from './components/TechStack'
import Services from './components/Services'
import Projects from './components/Projects'
import WhyMe from './components/WhyMe'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

// ─── CUSTOM CURSOR ───────────────────────────────────────────
const CustomCursor = () => {
  const [pos, setPos]         = useState({ x: 0, y: 0 })
  const [trail, setTrail]     = useState({ x: 0, y: 0 })
  const [clicking, setClicking] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY })

    // Smooth trail follows with delay
    let rafId
    let trailPos = { x: 0, y: 0 }
    let curPos   = { x: 0, y: 0 }

    const animateTrail = () => {
      trailPos.x += (curPos.x - trailPos.x) * 0.12
      trailPos.y += (curPos.y - trailPos.y) * 0.12
      setTrail({ x: trailPos.x, y: trailPos.y })
      rafId = requestAnimationFrame(animateTrail)
    }

    const trackMouse = (e) => {
      curPos = { x: e.clientX, y: e.clientY }
      setPos({ x: e.clientX, y: e.clientY })
    }

    const onDown = () => setClicking(true)
    const onUp   = () => setClicking(false)

    const onEnter = (e) => {
      if (
        e.target.tagName === 'BUTTON' ||
        e.target.tagName === 'A' ||
        e.target.closest('button') ||
        e.target.closest('a')
      ) setHovering(true)
    }
    const onLeave = () => setHovering(false)

    window.addEventListener('mousemove', trackMouse)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('mouseover', onEnter)
    window.addEventListener('mouseout', onLeave)
    rafId = requestAnimationFrame(animateTrail)

    return () => {
      window.removeEventListener('mousemove', trackMouse)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('mouseover', onEnter)
      window.removeEventListener('mouseout', onLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      {/* Outer glow trail */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{ x: trail.x - 20, y: trail.y - 20 }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      >
        <motion.div
          animate={{
            width:  hovering ? 50 : clicking ? 28 : 40,
            height: hovering ? 50 : clicking ? 28 : 40,
            opacity: hovering ? 0.5 : 0.25,
          }}
          transition={{ duration: 0.2 }}
          className="rounded-full border border-[#c9a84c] bg-[#c9a84c]/10"
          style={{ backdropFilter: 'blur(1px)' }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{ x: pos.x - 4, y: pos.y - 4 }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      >
        <motion.div
          animate={{
            width:  clicking ? 3 : 8,
            height: clicking ? 3 : 8,
            background: hovering ? '#f0d98a' : '#c9a84c',
          }}
          transition={{ duration: 0.15 }}
          className="rounded-full shadow-[0_0_8px_#c9a84c]"
        />
      </motion.div>
    </>
  )
}

// ─── LOADING SCREEN ──────────────────────────────────────────
const LoadingScreen = ({ onDone }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Hide default cursor during loading
    document.body.style.cursor = 'none'

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onDone, 400)
          return 100
        }
        return prev + Math.random() * 18
      })
    }, 120)

    return () => clearInterval(interval)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[9998] bg-[#0a0a0a] flex flex-col items-center justify-center gap-8"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* Background glow */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-[#c9a84c]/5 blur-[100px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />

      {/* Logo */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-4xl font-bold tracking-widest text-white uppercase mb-2"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          WEBNETIC <span className="text-[#c9a84c]">AI</span>
        </motion.div>
        <div className="text-xs text-gray-500 tracking-[0.3em] uppercase">
          Web & Mobile Development
        </div>
      </motion.div>

      {/* Progress bar */}
      <div className="relative z-10 w-48">
        <div className="w-full h-px bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#c9a84c] rounded-full"
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          />
        </div>
        <div className="text-center mt-2 text-xs text-gray-600 tabular-nums">
          {Math.min(Math.round(progress), 100)}%
        </div>
      </div>

      {/* Animated dots */}
      <div className="flex gap-2 relative z-10">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]"
            animate={{ opacity: [0.2, 1, 0.2], y: [0, -6, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </motion.div>
  )
}

// ─── APP ─────────────────────────────────────────────────────
const App = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Hide default cursor everywhere
    document.body.style.cursor = 'none'
    return () => { document.body.style.cursor = 'auto' }
  }, [])

  return (
    <>
      {/* Custom cursor — always on top */}
      <CustomCursor />

      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loader" onDone={() => setLoading(false)} />
        ) : (
          <motion.div
            key="app"
            className="bg-[#0a0a0a] text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar />
            <Hero />
            <About />
            <TechStack />
            <Services />
            <Projects />
            <WhyMe />
            <Testimonials />
            <Contact />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App