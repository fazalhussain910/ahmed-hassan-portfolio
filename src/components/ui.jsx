import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform, animate } from 'framer-motion'

export const ease = [0.22, 1, 0.36, 1]

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -80, duration: 1.2 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

export function Reveal({ children, delay = 0, y = 32, className = '', as = 'div' }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </M>
  )
}

export function SectionTitle({ kicker, title, accent, sub }) {
  return (
    <div className="text-center mb-14">
      <Reveal>
        <p className="font-display text-cyan text-base md:text-lg tracking-wide">
          {'</'} {kicker} {'/>'}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display font-bold text-4xl md:text-5xl mt-2">
          {title} <span className="text-cyan glow-text">{accent}</span>
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.16}>
          <p className="text-mute mt-4 max-w-xl mx-auto">{sub}</p>
        </Reveal>
      )}
    </div>
  )
}

export function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 15 })
  const sy = useSpring(y, { stiffness: 220, damping: 15 })
  const onMove = (e) => {
    if (window.matchMedia('(hover: none)').matches) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
    >
      {children}
    </motion.div>
  )
}

export function Tilt({ children, className = '', max = 8 }) {
  const ref = useRef(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 180, damping: 18 })
  const sry = useSpring(ry, { stiffness: 180, damping: 18 })
  const glowX = useMotionValue(50)
  const glowY = useMotionValue(50)
  const bg = useTransform([glowX, glowY], ([gx, gy]) =>
    `radial-gradient(420px circle at ${gx}% ${gy}%, rgba(22,217,227,0.14), transparent 45%)`)
  const onMove = (e) => {
    if (window.matchMedia('(hover: none)').matches) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * max * 2)
    rx.set(-(py - 0.5) * max * 2)
    glowX.set(px * 100); glowY.set(py * 100)
  }
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { rx.set(0); ry.set(0) }}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
      className={`relative ${className}`}
    >
      <motion.div className="pointer-events-none absolute inset-0 rounded-[20px] z-10" style={{ background: bg }} />
      {children}
    </motion.div>
  )
}

export function Counter({ to, suffix = '', plain = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [val, setVal] = useState(plain ? to : 0)
  useEffect(() => {
    if (!inView || plain) return
    const c = animate(0, to, { duration: 1.6, ease, onUpdate: (v) => setVal(Math.round(v)) })
    return () => c.stop()
  }, [inView, to, plain])
  return <span ref={ref}>{val}{suffix}</span>
}
