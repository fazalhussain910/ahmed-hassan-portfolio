// Illustrative UI mockups for client projects that are under NDA.
import { motion } from 'framer-motion'
import { Search, ShoppingCart, LayoutDashboard, Users, Package, ClipboardList, Calendar, CalendarClock, CheckCircle2, ListTodo, Plus, Star } from 'lucide-react'

function Frame({ children, light = false }) {
  return (
    <div className={`relative rounded-xl overflow-hidden border ${light ? 'border-white/20' : 'border-cyan/25'} shadow-[0_10px_30px_-10px_rgba(0,0,0,.8)]`}>
      <div className={`flex items-center gap-1.5 px-3 h-6 ${light ? 'bg-[#e9edf5]' : 'bg-[#0d1b27]'}`}>
        <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
        <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
        <span className="w-2 h-2 rounded-full bg-[#28c840]" />
        <span className={`ml-3 h-3 flex-1 max-w-[55%] rounded ${light ? 'bg-white' : 'bg-white/5'}`} />
      </div>
      <div className="aspect-[16/10] overflow-hidden">{children}</div>
    </div>
  )
}

function Shoe({ className = '' }) {
  return (
    <svg viewBox="0 0 200 110" className={className}>
      <defs>
        <linearGradient id="sh1" x1="0" x2="1"><stop offset="0" stopColor="#f8fafc" /><stop offset="1" stopColor="#cbd5e1" /></linearGradient>
      </defs>
      <ellipse cx="105" cy="100" rx="88" ry="6" fill="#64748b" opacity=".25" />
      <path d="M18 80 C20 60 40 52 62 50 L92 30 C100 25 112 26 118 34 L132 52 C150 56 176 62 186 74 C192 82 190 92 180 94 L30 94 C20 94 16 88 18 80Z" fill="url(#sh1)" stroke="#94a3b8" strokeWidth="1.5" />
      <path d="M18 86 L188 86 L184 96 L24 96Z" fill="#334155" />
      <path d="M70 48 L84 66 M80 42 L94 60 M90 36 L104 54" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M128 50 C140 60 160 64 182 74" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

export function ShopMock() {
  return (
    <Frame light>
      <div className="h-full bg-gradient-to-br from-[#eef2ff] to-[#e2e8f0] text-[#0f172a] text-[7px] flex flex-col">
        <div className="flex items-center gap-3 px-3 py-1.5 bg-white/80">
          <span className="font-bold text-[8px] px-1 rounded bg-[#0f172a] text-white">ShopKart</span>
          <span>Shop</span><span>Products</span><span>Categories</span>
          <Search size={8} className="ml-auto" /><ShoppingCart size={8} />
        </div>
        <div className="flex-1 flex items-center px-4">
          <div className="w-[45%]">
            <p className="font-display font-bold text-[13px] leading-[1.05]">Shop the<br />Latest Collection</p>
            <p className="mt-1 text-[#64748b] text-[5.5px] leading-snug">Fresh drops every week. Free delivery across Pakistan on orders above Rs 3,000.</p>
            <span className="inline-block mt-1.5 px-2 py-0.5 rounded bg-[#0f172a] text-white text-[6px]">Shop Now</span>
          </div>
          <motion.div className="w-[55%]" animate={{ y: [0, -4, 0], rotate: [-4, -2, -4] }} transition={{ duration: 4, repeat: Infinity }}>
            <Shoe className="w-full drop-shadow-xl" />
          </motion.div>
        </div>
        <div className="grid grid-cols-4 gap-1.5 px-3 pb-2">
          {['Men', 'Women', 'Kids', 'Accessories'].map((c, i) => (
            <div key={c} className="bg-white rounded p-1 flex items-center justify-between">
              <span>{c}</span>
              <span className="flex"><Star size={5} fill="#f59e0b" stroke="none" />{4 + (i % 2) * 0.5}</span>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  )
}

export function AdminMock() {
  return (
    <Frame>
      <div className="h-full bg-[#081521] text-[6.5px] flex">
        <div className="w-[26%] border-r border-white/5 p-2 space-y-1.5">
          <p className="font-semibold text-[8px] flex items-center gap-1"><Users size={8} className="text-cyan" />Admin</p>
          {[[LayoutDashboard, 'Dashboard'], [Users, 'Users'], [Package, 'Products'], [ClipboardList, 'Orders']].map(([I, t], i) => (
            <p key={t} className={`flex items-center gap-1 px-1 py-0.5 rounded ${i === 0 ? 'bg-cyan/15 text-cyan' : 'text-white/60'}`}><I size={7} />{t}</p>
          ))}
        </div>
        <div className="flex-1 p-2 flex flex-col">
          <p className="font-semibold text-[8px]">Dashboard</p>
          <div className="grid grid-cols-2 gap-1.5 mt-1.5">
            {[['Total Users', '1,248', '+12%'], ['Total Orders', '356', '+8%']].map(([a, b, c]) => (
              <div key={a} className="rounded bg-white/[0.04] border border-white/5 p-1.5">
                <p className="text-white/60 text-[5.5px]">{a}</p>
                <p className="font-bold text-[10px]">{b}</p>
                <p className="text-emerald-400 text-[5.5px]">↑ {c}</p>
              </div>
            ))}
          </div>
          <div className="flex-1 mt-1.5 rounded bg-white/[0.03] border border-white/5 relative overflow-hidden">
            <svg viewBox="0 0 200 70" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
              <defs>
                <linearGradient id="ar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#16D9E3" stopOpacity=".45" /><stop offset="1" stopColor="#16D9E3" stopOpacity="0" /></linearGradient>
              </defs>
              {[15, 30, 45, 60].map((y) => <line key={y} x1="0" x2="200" y1={y} y2={y} stroke="#fff" strokeOpacity=".04" />)}
              <path d="M0 58 C20 50 30 54 45 46 S70 30 85 38 110 50 125 36 150 20 165 24 185 12 200 8 L200 70 L0 70Z" fill="url(#ar)" />
              <motion.path
                d="M0 58 C20 50 30 54 45 46 S70 30 85 38 110 50 125 36 150 20 165 24 185 12 200 8"
                fill="none" stroke="#16D9E3" strokeWidth="1.6"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2 }}
              />
            </svg>
          </div>
        </div>
      </div>
    </Frame>
  )
}

export function TaskMock() {
  const tasks = [['Build project UI', false], ['Setup API routes', true], ['Test and fix bugs', false], ['Connect MongoDB', true]]
  return (
    <Frame>
      <div className="h-full bg-[#081521] text-[6.5px] flex">
        <div className="w-[32%] border-r border-white/5 p-2 space-y-1.5">
          <p className="font-semibold text-[8px] flex items-center gap-1"><ListTodo size={8} className="text-cyan" />TaskFlow</p>
          {[[ClipboardList, 'My Tasks'], [Calendar, 'Today'], [CalendarClock, 'Upcoming'], [CheckCircle2, 'Completed']].map(([I, t], i) => (
            <p key={t} className={`flex items-center gap-1 px-1 py-0.5 rounded ${i === 0 ? 'bg-white/10' : 'text-white/60'}`}><I size={7} />{t}</p>
          ))}
        </div>
        <div className="flex-1 p-2.5">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-[9px]">My Tasks</p>
            <span className="w-3.5 h-3.5 grid place-items-center rounded bg-cyan text-ink"><Plus size={8} /></span>
          </div>
          <div className="mt-2 space-y-1.5">
            {tasks.map(([t, done], i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.15 }}
                className="flex items-center gap-1.5 rounded bg-white/[0.04] border border-white/5 px-1.5 py-1"
              >
                <span className={`w-2 h-2 rounded-[2px] border grid place-items-center ${done ? 'bg-cyan border-cyan' : 'border-white/40'}`}>
                  {done && <svg viewBox="0 0 10 10" className="w-1.5 h-1.5"><path d="M1 5 L4 8 L9 2" stroke="#050B14" strokeWidth="2" fill="none" /></svg>}
                </span>
                <span className={done ? 'line-through text-white/50' : ''}>{t}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  )
}

export const mockups = { shop: ShopMock, admin: AdminMock, tasks: TaskMock }
