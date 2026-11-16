import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Menu, X, FileText } from 'lucide-react'
import { FaGithub, FaInstagram } from 'react-icons/fa6'
import { profile } from '../data'
import { scrollToId } from './ui'

const links = ['Home', 'About', 'Skills', 'Projects', 'Resume', 'Contact']

export function IconLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="w-10 h-10 grid place-items-center rounded-xl border border-white/15 hover:border-cyan hover:text-cyan hover:shadow-[0_0_18px_rgba(22,217,227,.45)] transition-all duration-300"
    >
      {children}
    </a>
  )
}

export default function Navbar() {
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    links.forEach((l) => { const el = document.getElementById(l.toLowerCase()); el && io.observe(el) })
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect() }
  }, [])

  const go = (id) => { setOpen(false); scrollToId(id) }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'glass border-b border-white/5' : ''}`}
    >
      <nav className="max-w-7xl mx-auto px-5 md:px-10 h-[72px] flex items-center justify-between">
        <button onClick={() => go('home')} className="font-display font-extrabold text-3xl tracking-tight">
          {profile.initials}<span className="text-cyan glow-text">.</span>
        </button>

        <ul className="hidden lg:flex items-center gap-2">
          {links.map((l) => {
            const id = l.toLowerCase()
            return (
              <li key={l}>
                <button
                  onClick={() => go(id)}
                  className={`relative px-4 py-1.5 rounded-full text-[15px] transition-colors ${active === id ? 'text-cyan' : 'text-white/85 hover:text-white'}`}
                >
                  {active === id && (
                    <motion.span
                      layoutId="pill"
                      className="absolute inset-0 rounded-full border border-cyan bg-cyan/10 shadow-[0_0_16px_rgba(22,217,227,.35)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{l}</span>
                </button>
              </li>
            )
          })}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <IconLink href={profile.github} label="GitHub"><FaGithub size={19} /></IconLink>
          <IconLink href={profile.instagram} label="Instagram"><FaInstagram size={19} /></IconLink>
          <IconLink href={`mailto:${profile.email}`} label="Email"><Mail size={19} /></IconLink>
        </div>

        <button className="lg:hidden w-10 h-10 grid place-items-center rounded-xl border border-white/15" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-white/5 overflow-hidden"
          >
            <ul className="px-6 py-4 flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.li key={l} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}>
                  <button onClick={() => go(l.toLowerCase())} className={`w-full text-left py-3 text-lg ${active === l.toLowerCase() ? 'text-cyan' : ''}`}>
                    {l}
                  </button>
                </motion.li>
              ))}
              <li className="flex gap-3 pt-3">
                <IconLink href={profile.github} label="GitHub"><FaGithub size={19} /></IconLink>
                <IconLink href={profile.instagram} label="Instagram"><FaInstagram size={19} /></IconLink>
                <IconLink href={`mailto:${profile.email}`} label="Email"><Mail size={19} /></IconLink>
                <a href={profile.cv} download className="ml-auto flex items-center gap-2 px-4 rounded-xl bg-cyan text-ink font-semibold"><FileText size={17} />CV</a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
