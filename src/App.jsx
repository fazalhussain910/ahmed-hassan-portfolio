import { useEffect, useState, useCallback } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { About, Skills, Projects, Resume, Contact, Footer } from './components/Sections'
import { Loader, CursorGlow } from './components/Effects'

export default function App() {
  const [loading, setLoading] = useState(true)
  const done = useCallback(() => setLoading(false), [])
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    window.__lenis = lenis
    let id
    const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy(); window.__lenis = null }
  }, [])

  return (
    <>
      <AnimatePresence>{loading && <Loader onDone={done} />}</AnimatePresence>
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-cyan origin-left z-[60] shadow-[0_0_10px_#16D9E3]" style={{ scaleX: progress }} />
      <CursorGlow />
      {!loading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Resume />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}
