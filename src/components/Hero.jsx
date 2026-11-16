import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import { Play, Mail, Users, MapPin, Code2 } from 'lucide-react'
import { SiMongodb, SiExpress, SiReact, SiNodedotjs } from 'react-icons/si'
import { profile } from '../data'
import { Magnetic, scrollToId, ease } from './ui'
import { Particles } from './Effects'
import photo from '../assets/ahmad.webp'

const word = {
  hidden: { y: '110%', opacity: 0 },
  show: (i) => ({ y: 0, opacity: 1, transition: { delay: 0.25 + i * 0.12, duration: 0.8, ease } }),
}

function Words({ text, start = 0, className = '' }) {
  return text.split(' ').map((w, i) => (
    <span key={i} className="inline-block overflow-hidden align-bottom pb-1 mr-[0.22em]">
      <motion.span className={`inline-block ${className}`} variants={word} custom={start + i} initial="hidden" animate="show">
        {w}
      </motion.span>
    </span>
  ))
}

const fadeUp = (d) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: d, duration: 0.7, ease },
})

export default function Hero() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const px = useSpring(useTransform(mx, [-1, 1], [-14, 14]), { stiffness: 60, damping: 18 })
  const py = useSpring(useTransform(my, [-1, 1], [-10, 10]), { stiffness: 60, damping: 18 })
  const rx = useSpring(useTransform(mx, [-1, 1], [18, -18]), { stiffness: 60, damping: 18 })
  const { scrollY } = useScroll()
  const photoY = useTransform(scrollY, [0, 700], [0, 90])
  const textY = useTransform(scrollY, [0, 700], [0, -40])

  const onMove = (e) => {
    mx.set((e.clientX / window.innerWidth) * 2 - 1)
    my.set((e.clientY / window.innerHeight) * 2 - 1)
  }

  return (
    <section id="home" onMouseMove={onMove} className="relative min-h-screen overflow-hidden pt-[72px]">
      {/* background layers */}
      <div className="absolute inset-0 grid-bg" />
      <Particles />
      <div className="absolute -left-40 top-1/3 w-[520px] h-[520px] rounded-full bg-cyan/10 blur-[120px]" />
      <svg className="absolute left-0 bottom-24 w-[60%] opacity-40 pointer-events-none" viewBox="0 0 800 200" fill="none">
        <motion.path
          d="M0 160 C 200 60, 420 220, 800 40" stroke="#16D9E3" strokeWidth="1"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.4, delay: 0.8 }}
        />
        <motion.path
          d="M0 190 C 240 90, 460 240, 800 80" stroke="#16D9E3" strokeWidth="0.6" strokeOpacity="0.5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.8, delay: 1 }}
        />
      </svg>

      {/* photo */}
      <motion.div
        style={{ x: px, y: photoY }}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease }}
        className="absolute right-0 top-0 h-[78vh] w-full md:h-full md:w-[62%] lg:w-[56%] group cursor-pointer"
      >
        <div className="relative h-full w-full">
          <img src={photo} alt="Ahmad Hassan" className="photo-mask absolute inset-0 h-full w-full object-cover object-[50%_20%] transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.02]" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/30 transition-opacity duration-700 group-hover:opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/10 to-transparent md:via-transparent" />
        </div>

        {/* rotating glow arc */}
        <motion.div style={{ x: rx }} className="absolute left-[18%] top-[13%] w-[64%] aspect-square hidden md:block">
          <svg viewBox="0 0 400 400" className="w-full h-full ring-spin">
            <defs>
              <linearGradient id="arc" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#16D9E3" stopOpacity="0" />
                <stop offset="45%" stopColor="#16D9E3" stopOpacity="1" />
                <stop offset="100%" stopColor="#16D9E3" stopOpacity="0" />
              </linearGradient>
              <filter id="blur"><feGaussianBlur stdDeviation="4" /></filter>
            </defs>
            <circle cx="200" cy="200" r="190" fill="none" stroke="url(#arc)" strokeWidth="6" strokeDasharray="520 700" filter="url(#blur)" />
            <circle cx="200" cy="200" r="190" fill="none" stroke="url(#arc)" strokeWidth="2" strokeDasharray="520 700" />
          </svg>
        </motion.div>
      </motion.div>

      {/* text */}
      <motion.div style={{ y: textY }} className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 pt-[46vh] md:pt-16 lg:pt-20 pb-10 pointer-events-none">
        <div className="max-w-[640px] pointer-events-auto">
          <motion.div {...fadeUp(0.1)} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan/40 bg-cyan/5 text-[15px]">
            <Code2 size={16} className="text-cyan" /> {profile.role}
          </motion.div>

          <h1 className="font-display font-bold leading-[1.02] mt-7 text-[3.2rem] sm:text-6xl lg:text-[4.8rem] tracking-tight">
            <span className="block"><Words text="Hi, I’m" /></span>
            <span className="block">
              <Words text={profile.firstName} start={2} />
              <span className="inline-block overflow-hidden align-bottom pb-1">
                <motion.span
                  className="inline-block text-cyan"
                  variants={word} custom={3} initial="hidden" animate="show"
                >
                  <motion.span
                    className="inline-block"
                    animate={{ textShadow: ['0 0 18px rgba(22,217,227,.35)', '0 0 34px rgba(22,217,227,.8)', '0 0 18px rgba(22,217,227,.35)'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    {profile.lastName}
                  </motion.span>
                </motion.span>
              </span>
            </span>
          </h1>

          <motion.p {...fadeUp(0.75)} className="mt-5 flex items-center gap-4 text-2xl md:text-[2rem] font-light">
            <motion.span className="w-1.5 h-9 bg-cyan rounded" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.9, duration: 0.5 }} />
            {profile.role}
          </motion.p>

          <motion.p {...fadeUp(0.9)} className="mt-6 text-lg text-white/85 leading-relaxed max-w-[520px]">
            {profile.tagline}
          </motion.p>

          <motion.div {...fadeUp(1.05)} className="mt-7 flex flex-wrap items-stretch gap-4">
            <div className="flex items-center gap-4 px-5 py-3 rounded-2xl border border-white/10 bg-white/[0.03]">
              <Users className="text-white/80" size={26} strokeWidth={1.5} />
              <div className="text-sm leading-tight"><p className="text-white/70">Member of</p><p className="font-semibold">{profile.team}</p></div>
            </div>
            <div className="hidden sm:block w-px bg-white/15" />
            <div className="flex items-center gap-4 px-5 py-3 rounded-2xl border border-white/10 bg-white/[0.03]">
              <MapPin className="text-white/80" size={24} strokeWidth={1.5} />
              <p className="text-sm leading-tight">Faisalabad,<br />Pakistan</p>
            </div>
          </motion.div>

          <motion.div {...fadeUp(1.2)} className="mt-9 flex flex-wrap gap-5">
            <Magnetic>
              <button onClick={() => scrollToId('projects')} className="shine glow-btn flex items-center gap-3 bg-cyan text-ink font-semibold text-lg px-8 py-4 rounded-xl hover:-translate-y-0.5 transition-transform">
                <Play size={18} fill="currentColor" /> View My Work
              </button>
            </Magnetic>
            <Magnetic>
              <button onClick={() => scrollToId('contact')} className="flex items-center gap-3 border border-cyan/70 text-lg px-8 py-4 rounded-xl hover:bg-cyan/10 hover:shadow-[0_0_24px_rgba(22,217,227,.35)] transition-all">
                <Mail size={20} /> Get In Touch
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      <div className="relative z-20 pb-10"><TechBar /></div>
    </section>
  )
}

const tech = [
  { name: 'MongoDB', Icon: SiMongodb, color: '#4DB33D' },
  { name: 'Express.js', Icon: SiExpress, color: '#E6F7FA', badge: true },
  { name: 'React', Icon: SiReact, color: '#16D9E3' },
  { name: 'Node.js', Icon: SiNodedotjs, color: '#6CC24A' },
]

function TechBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.8, ease }}
      className="px-5 md:px-10"
    >
      <div className="relative max-w-7xl mx-auto glass rounded-2xl border border-cyan/30 px-6 md:px-10 py-5 flex flex-wrap md:flex-nowrap items-center gap-x-8 gap-y-4 overflow-hidden shadow-[0_0_40px_-10px_rgba(22,217,227,.35)]">
        <div className="absolute bottom-0 left-0 right-0 line-streak" />
        <p className="font-display font-semibold text-xl md:text-2xl leading-tight pr-8 md:border-r border-white/15 w-full md:w-auto">
          Tech Stack<br className="hidden md:block" /> I Work With
        </p>
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {tech.map(({ name, Icon, color, badge }, i) => (
            <motion.div
              key={name}
              className="group flex items-center justify-center sm:justify-start gap-3 cursor-default"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
            >
              <span
                className={`grid place-items-center w-12 h-12 rounded-full transition-all duration-300 group-hover:scale-110 ${badge ? 'bg-[#0e3a44]' : ''}`}
                style={{ filter: `drop-shadow(0 0 0px ${color})` }}
              >
                <Icon size={badge ? 24 : 36} color={color} className="transition-all duration-300 group-hover:[filter:drop-shadow(0_0_10px_currentColor)]" />
              </span>
              <span className="text-lg md:text-xl text-white/90 group-hover:text-cyan transition-colors">{name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
