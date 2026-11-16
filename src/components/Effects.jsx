import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { profile } from '../data'

export function Loader({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1500)
    return () => clearTimeout(t)
  }, [onDone])
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-ink flex items-center justify-center"
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="font-display font-extrabold text-6xl flex">
          {profile.initials.split('').map((c, i) => (
            <motion.span
              key={i}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >{c}</motion.span>
          ))}
          <motion.span
            className="text-cyan glow-text"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.6, 1] }}
            transition={{ delay: 0.45, duration: 0.5 }}
          >.</motion.span>
        </div>
        <div className="w-40 h-[2px] bg-white/10 rounded overflow-hidden">
          <motion.div
            className="h-full bg-cyan"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export function CursorGlow() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40 })
  const sy = useSpring(y, { stiffness: 500, damping: 40 })
  const tx = useSpring(x, { stiffness: 90, damping: 20 })
  const ty = useSpring(y, { stiffness: 90, damping: 20 })
  useEffect(() => {
    const m = (e) => { x.set(e.clientX); y.set(e.clientY) }
    window.addEventListener('pointermove', m)
    return () => window.removeEventListener('pointermove', m)
  }, [x, y])
  return (
    <>
      <motion.div
        className="cursor-glow pointer-events-none fixed z-[90] w-2 h-2 -ml-1 -mt-1 rounded-full bg-cyan"
        style={{ x: sx, y: sy, boxShadow: '0 0 12px #16D9E3' }}
      />
      <motion.div
        className="cursor-glow pointer-events-none fixed z-[89] w-9 h-9 -ml-[18px] -mt-[18px] rounded-full border border-cyan/50"
        style={{ x: tx, y: ty }}
      />
      <motion.div
        className="cursor-glow pointer-events-none fixed z-0 w-[500px] h-[500px] -ml-[250px] -mt-[250px] rounded-full"
        style={{ x: tx, y: ty, background: 'radial-gradient(circle, rgba(22,217,227,0.07), transparent 60%)' }}
      />
    </>
  )
}

// Lightweight particle network (no library) — paused on small screens & reduced motion.
export function Particles() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w, h, pts, raf
    const mouse = { x: -999, y: -999 }
    const setup = () => {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio
      h = canvas.height = canvas.offsetHeight * devicePixelRatio
      const n = window.innerWidth < 768 ? 28 : 70
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3 * devicePixelRatio,
        vy: (Math.random() - 0.5) * 0.3 * devicePixelRatio,
      }))
    }
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const max = 130 * devicePixelRatio
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
      }
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i]
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < max) {
            ctx.strokeStyle = `rgba(22,217,227,${0.13 * (1 - d / max)})`
            ctx.lineWidth = devicePixelRatio * 0.7
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
          }
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y)
        if (md < max * 1.4) {
          ctx.strokeStyle = `rgba(22,217,227,${0.3 * (1 - md / (max * 1.4))})`
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke()
        }
        ctx.fillStyle = 'rgba(22,217,227,0.55)'
        ctx.beginPath(); ctx.arc(a.x, a.y, 1.3 * devicePixelRatio, 0, Math.PI * 2); ctx.fill()
      }
      if (!reduce) raf = requestAnimationFrame(draw)
    }
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = (e.clientX - r.left) * devicePixelRatio
      mouse.y = (e.clientY - r.top) * devicePixelRatio
    }
    setup(); draw()
    window.addEventListener('resize', setup)
    window.addEventListener('pointermove', onMove)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', setup)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />
}
