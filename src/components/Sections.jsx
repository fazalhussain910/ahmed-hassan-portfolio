import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShoppingCart, BarChart3, CheckCheck, Lock, Eye, X, Layers, Server, Monitor, GitBranch,
  Award, Download, FileText, Mail, MapPin, Send, ArrowUp, Sparkles, CheckCircle2,
} from 'lucide-react'
import { FaGithub, FaInstagram } from 'react-icons/fa6'
import { profile, stats, skillGroups, whatIBuild, certification, projects } from '../data'
import { Reveal, SectionTitle, Tilt, Counter, Magnetic, scrollToId, ease } from './ui'
import { IconLink } from './Navbar'
import { mockups } from './Mockups'
import photo from '../assets/ahmad.webp'
import cvPreview from '../assets/cv-preview.webp'

const projIcons = { cart: ShoppingCart, chart: BarChart3, check: CheckCheck }
const skillIcons = { layers: Layers, server: Server, monitor: Monitor, git: GitBranch }

function Modal({ open, onClose, children, wide }) {
  useEffect(() => {
    if (!open) return
    const k = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    window.__lenis?.stop()
    return () => { window.removeEventListener('keydown', k); window.__lenis?.start() }
  }, [open, onClose])
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={`card relative w-full ${wide ? 'max-w-3xl' : 'max-w-xl'} max-h-[90vh] overflow-y-auto p-6 md:p-8`}
            data-lenis-prevent
            initial={{ y: 40, scale: 0.96, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 w-9 h-9 grid place-items-center rounded-lg border border-white/15 hover:border-cyan hover:text-cyan z-10">
              <X size={18} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ---------------- ABOUT ---------------- */
export function About() {
  return (
    <section id="about" className="relative py-28 px-5 md:px-10">
      <div className="max-w-7xl mx-auto">
        <SectionTitle kicker="About" title="Who I" accent="Am" />
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
          <Reveal>
            <Tilt className="max-w-md mx-auto" max={6}>
              <div className="card p-3 relative overflow-hidden">
                <div className="absolute -inset-px rounded-[20px] bg-[conic-gradient(from_0deg,transparent,rgba(22,217,227,.6),transparent_30%)] ring-spin opacity-60" />
                <div className="relative rounded-2xl overflow-hidden bg-ink">
                  <img src={photo} alt="Ahmad Hassan portrait" className="w-full aspect-[4/5] object-cover object-[55%_30%]" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 glass rounded-xl px-4 py-3 border border-cyan/25 flex items-center gap-3">
                    <span className="relative flex w-2.5 h-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
                      <span className="relative inline-flex rounded-full w-2.5 h-2.5 bg-emerald-400" />
                    </span>
                    <p className="text-sm">Building with {profile.team}</p>
                  </div>
                </div>
              </div>
            </Tilt>
          </Reveal>

          <div>
            {profile.about.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className={`text-white/80 leading-relaxed mb-5 ${i === 0 ? 'text-xl text-white' : 'text-lg'}`}>{p}</p>
              </Reveal>
            ))}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={0.1 + i * 0.08}>
                  <div className="card p-4 text-center hover:border-cyan/60 transition-colors h-full">
                    <p className="font-display font-bold text-3xl text-cyan glow-text">
                      <Counter to={s.value} suffix={s.suffix} plain={s.plain} />
                    </p>
                    <p className="text-xs text-mute mt-1 leading-snug">{s.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.3}>
              <div className="flex flex-wrap gap-4 mt-8">
                <Magnetic>
                  <a href={profile.cv} download className="shine glow-btn flex items-center gap-2 bg-cyan text-ink font-semibold px-6 py-3 rounded-xl">
                    <Download size={18} /> Download CV
                  </a>
                </Magnetic>
                <Magnetic>
                  <button onClick={() => scrollToId('resume')} className="flex items-center gap-2 border border-cyan/60 px-6 py-3 rounded-xl hover:bg-cyan/10 transition-colors">
                    <Eye size={18} /> Preview CV
                  </button>
                </Magnetic>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- SKILLS ---------------- */
export function Skills() {
  return (
    <section id="skills" className="relative py-28 px-5 md:px-10">
      <div className="absolute right-0 top-1/4 w-[420px] h-[420px] rounded-full bg-cyan/10 blur-[130px]" />
      <div className="relative max-w-7xl mx-auto">
        <SectionTitle kicker="Skills" title="What I" accent="Work With" sub="The tools I use to take an idea from database to deployed interface." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map((g, i) => {
            const Icon = skillIcons[g.icon]
            return (
              <Reveal key={g.title} delay={i * 0.1}>
                <Tilt className="h-full">
                  <div className="card p-6 h-full group hover:border-cyan/60 transition-colors">
                    <span className="w-12 h-12 grid place-items-center rounded-xl bg-cyan/10 border border-cyan/30 text-cyan group-hover:shadow-[0_0_20px_rgba(22,217,227,.5)] transition-shadow">
                      <Icon size={22} />
                    </span>
                    <h3 className="font-display font-semibold text-xl mt-5">{g.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {g.items.map((s) => (
                        <span key={s} className="text-sm px-3 py-1 rounded-full border border-white/15 text-white/80 hover:border-cyan hover:text-cyan transition-colors">{s}</span>
                      ))}
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <Reveal>
            <div className="card p-7 h-full">
              <h3 className="font-display font-semibold text-xl flex items-center gap-2"><Sparkles size={20} className="text-cyan" /> What I Build</h3>
              <ul className="mt-5 space-y-3">
                {whatIBuild.map((w, i) => (
                  <motion.li key={w} className="flex gap-3 text-white/80"
                    initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.12 }}>
                    <CheckCircle2 size={20} className="text-cyan shrink-0 mt-0.5" /> {w}
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card p-7 h-full relative overflow-hidden">
              <Award className="absolute -right-6 -bottom-6 text-cyan/10" size={160} />
              <h3 className="font-display font-semibold text-xl flex items-center gap-2"><Award size={20} className="text-cyan" /> Certification</h3>
              <p className="font-display text-2xl font-bold mt-5">{certification.title}</p>
              <p className="text-white/80 mt-1">{certification.issuer}</p>
              <div className="flex flex-wrap gap-3 mt-5 text-sm">
                <span className="px-3 py-1 rounded-full bg-cyan/10 border border-cyan/40 text-cyan">{certification.detail}</span>
                <span className="px-3 py-1 rounded-full border border-white/15">Issued {certification.date}</span>
                <span className="px-3 py-1 rounded-full border border-white/15">Reg. No. {certification.reg}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------------- PROJECTS ---------------- */
export function Projects() {
  const [sel, setSel] = useState(null)
  return (
    <section id="projects" className="relative py-28 px-5 md:px-10">
      <div className="max-w-7xl mx-auto">
        <SectionTitle kicker="Projects" title="Some of My" accent="Work" sub="A selection of full-stack applications built with the MERN stack." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {projects.map((p, i) => {
            const Mock = mockups[p.id]
            const Icon = projIcons[p.icon]
            return (
              <Reveal key={p.id} delay={i * 0.12}>
                <Tilt className="h-full">
                  <article className="card p-5 h-full flex flex-col group hover:border-cyan/70 hover:shadow-[0_0_40px_-12px_rgba(22,217,227,.6)] transition-all duration-500">
                    <div className="relative">
                      <div className="transition-transform duration-700 group-hover:scale-[1.03]"><Mock /></div>
                      <span className="absolute -bottom-4 left-3 w-11 h-11 grid place-items-center rounded-xl bg-[#0b2a33] border border-cyan text-cyan shadow-[0_0_18px_rgba(22,217,227,.5)]">
                        <Icon size={20} />
                      </span>
                      <span className="absolute top-8 right-2 flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-ink/85 border border-white/15 text-white/80">
                        <Lock size={10} /> Client project · NDA
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-2xl mt-8">{p.title}</h3>
                    <p className="text-white/75 mt-2 leading-relaxed">{p.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {p.tags.map((t) => <span key={t} className="text-sm px-3.5 py-1 rounded-full border border-white/15 text-white/85">{t}</span>)}
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-auto pt-6">
                      <button onClick={() => setSel(p)} className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-white/20 hover:border-cyan hover:text-cyan transition-colors">
                        <Eye size={17} /> Details
                      </button>
                      <span title="Source code belongs to the client company" className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-white/10 text-white/45 cursor-not-allowed">
                        <Lock size={16} /> Private Code
                      </span>
                    </div>
                  </article>
                </Tilt>
              </Reveal>
            )
          })}
        </div>
        <Reveal delay={0.2}>
          <p className="text-center text-sm text-mute mt-10 flex items-center justify-center gap-2">
            <Lock size={14} /> These were built for a company under NDA — screens shown are illustrative recreations, not the client’s real UI.
          </p>
        </Reveal>
      </div>

      <Modal open={!!sel} onClose={() => setSel(null)}>
        {sel && (() => {
          const Mock = mockups[sel.id]
          return (
            <>
              <Mock />
              <h3 className="font-display font-bold text-3xl mt-6">{sel.title}</h3>
              <p className="text-white/75 mt-2">{sel.desc}</p>
              <h4 className="font-semibold mt-6 text-cyan">Key features</h4>
              <ul className="mt-3 space-y-2">
                {sel.features.map((f) => <li key={f} className="flex gap-3 text-white/85"><CheckCircle2 size={18} className="text-cyan shrink-0 mt-0.5" />{f}</li>)}
              </ul>
              <div className="flex flex-wrap gap-2 mt-6">{sel.tags.map((t) => <span key={t} className="text-sm px-3 py-1 rounded-full border border-cyan/40 text-cyan">{t}</span>)}</div>
              <p className="mt-6 text-sm text-mute flex gap-2"><Lock size={15} className="shrink-0 mt-0.5" /> Client work under NDA — happy to walk through it in an interview.</p>
            </>
          )
        })()}
      </Modal>
    </section>
  )
}

/* ---------------- RESUME ---------------- */
export function Resume() {
  const [open, setOpen] = useState(false)
  return (
    <section id="resume" className="relative py-28 px-5 md:px-10">
      <div className="max-w-6xl mx-auto">
        <SectionTitle kicker="Resume" title="My" accent="CV" sub="Preview it right here or download the PDF." />
        <Reveal>
          <div className="card p-6 md:p-10 grid md:grid-cols-[260px_1fr] gap-10 items-center relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-cyan/10 blur-3xl" />
            <motion.button
              onClick={() => setOpen(true)}
              whileHover={{ y: -8, rotate: -1.5 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="relative mx-auto w-[220px] rounded-lg overflow-hidden border border-cyan/40 shadow-[0_20px_50px_-15px_rgba(22,217,227,.55)] group"
              aria-label="Preview CV"
            >
              <img src={cvPreview} alt="Ahmad Hassan CV preview" className="w-full" loading="lazy" />
              <span className="absolute inset-0 bg-ink/60 opacity-0 group-hover:opacity-100 transition-opacity grid place-items-center">
                <span className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan text-ink font-semibold text-sm"><Eye size={16} /> Preview</span>
              </span>
            </motion.button>
            <div className="relative">
              <p className="flex items-center gap-2 text-cyan text-sm"><FileText size={16} /> Ahmad_Hassan_CV.pdf · 1 page</p>
              <h3 className="font-display font-bold text-3xl md:text-4xl mt-3">MERN Stack Developer</h3>
              <p className="text-white/75 mt-3 max-w-lg leading-relaxed">
                Profile, skills, what I build and my MERN Development certification from LAHZA IT Programs by Legacy — all on one page.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Magnetic>
                  <button onClick={() => setOpen(true)} className="flex items-center gap-2 border border-cyan/70 px-7 py-3.5 rounded-xl hover:bg-cyan/10 hover:shadow-[0_0_24px_rgba(22,217,227,.35)] transition-all">
                    <Eye size={19} /> Preview CV
                  </button>
                </Magnetic>
                <Magnetic>
                  <a href={profile.cv} download className="shine glow-btn flex items-center gap-2 bg-cyan text-ink font-semibold px-7 py-3.5 rounded-xl">
                    <Download size={19} /> Download CV
                  </a>
                </Magnetic>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} wide>
        <div className="flex flex-wrap items-center gap-3 pr-12 mb-5">
          <h3 className="font-display font-semibold text-xl">Ahmad Hassan — CV</h3>
          <a href={profile.cv} download className="ml-auto flex items-center gap-2 bg-cyan text-ink font-semibold text-sm px-4 py-2 rounded-lg">
            <Download size={16} /> Download PDF
          </a>
        </div>
        <img src={cvPreview} alt="Ahmad Hassan CV" className="w-full rounded-lg border border-white/10" />
      </Modal>
    </section>
  )
}

/* ---------------- CONTACT ---------------- */
export function Contact() {
  const [sent, setSent] = useState(false)
  const submit = (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const body = `${f.get('message')}\n\n— ${f.get('name')} (${f.get('email')})`
    const href = `mailto:${profile.email}?subject=${encodeURIComponent(f.get('subject') || 'Project inquiry')}&body=${encodeURIComponent(body)}`
    try { window.location.href = href } catch { /* blocked in some previews */ }
    setSent(true)
  }
  const field = 'w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan focus:shadow-[0_0_0_3px_rgba(22,217,227,.15)] transition-all placeholder:text-white/35'
  return (
    <section id="contact" className="relative py-28 px-5 md:px-10">
      <div className="absolute left-1/2 -translate-x-1/2 top-1/3 w-[600px] h-[300px] rounded-full bg-cyan/10 blur-[140px]" />
      <div className="relative max-w-6xl mx-auto">
        <SectionTitle kicker="Contact" title="Let’s Build" accent="Together" sub="Have a project, a role or an idea? Send a message." />
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8">
          <Reveal>
            <div className="space-y-4">
              {[
                { Icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
                { Icon: FaGithub, label: 'GitHub', value: `github.com/${profile.githubHandle}`, href: profile.github },
                { Icon: FaInstagram, label: 'Instagram', value: profile.instagramHandle, href: profile.instagram },
                { Icon: MapPin, label: 'Location', value: profile.location },
              ].map(({ Icon, label, value, href }) => {
                const Inner = (
                  <div className="card p-5 flex items-center gap-4 group hover:border-cyan/60 transition-colors">
                    <span className="w-12 h-12 grid place-items-center rounded-xl bg-cyan/10 border border-cyan/30 text-cyan group-hover:scale-110 transition-transform"><Icon size={20} /></span>
                    <div className="min-w-0">
                      <p className="text-sm text-mute">{label}</p>
                      <p className="font-medium break-all">{value}</p>
                    </div>
                  </div>
                )
                return href ? <a key={label} href={href} target="_blank" rel="noreferrer" className="block">{Inner}</a> : <div key={label}>{Inner}</div>
              })}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <form onSubmit={submit} className="card p-6 md:p-8 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input name="name" required placeholder="Your name" className={field} />
                <input name="email" type="email" required placeholder="Your email" className={field} />
              </div>
              <input name="subject" placeholder="Subject" className={field} />
              <textarea name="message" required rows={5} placeholder="Tell me about your project..." className={`${field} resize-none`} />
              <button className="shine glow-btn w-full flex items-center justify-center gap-2 bg-cyan text-ink font-semibold py-3.5 rounded-xl hover:-translate-y-0.5 transition-transform">
                <Send size={18} /> Send Message
              </button>
              <AnimatePresence>
                {sent && (
                  <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-sm text-mute text-center">
                    Your email app should open with the message ready. If it doesn’t, write to <span className="text-cyan">{profile.email}</span>.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------------- FOOTER ---------------- */
export function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-5 md:px-10 py-10">
      <div className="absolute top-0 inset-x-0 line-streak" />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6 justify-between">
        <p className="font-display font-extrabold text-2xl">{profile.initials}<span className="text-cyan">.</span></p>
        <p className="text-sm text-mute text-center">© {new Date().getFullYear()} Ahmad Hassan · Member of {profile.team}</p>
        <div className="flex items-center gap-3">
          <IconLink href={profile.github} label="GitHub"><FaGithub size={18} /></IconLink>
          <IconLink href={profile.instagram} label="Instagram"><FaInstagram size={18} /></IconLink>
          <button onClick={() => scrollToId('home')} aria-label="Back to top" className="w-10 h-10 grid place-items-center rounded-xl bg-cyan text-ink hover:-translate-y-1 transition-transform">
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  )
}
