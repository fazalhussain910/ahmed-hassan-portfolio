// ✏️ Edit everything about the site from this one file.

export const profile = {
  initials: 'AH',
  firstName: 'Ahmad',
  lastName: 'Hassan',
  role: 'MERN Stack Developer',
  team: 'The Agentic State',
  location: 'Faisalabad, Pakistan',
  tagline:
    'A MERN stack developer from Faisalabad who builds full-stack web applications and APIs with MongoDB, Express.js, React and Node.js.',
  about: [
    "I'm Ahmad Hassan, a MERN stack developer from Faisalabad, Pakistan, and a member of The Agentic State — a team that builds modern web products and agentic AI systems.",
    'I build full-stack web applications end to end: React interfaces on the front, Node.js and Express REST APIs in the middle, and MongoDB underneath. Dashboards and admin panels are my favourite kind of work — clean UI backed by solid APIs.',
    'I completed the MERN Development program at LAHZA IT Programs by Legacy, and I’ve since worked on real client projects for a company.',
  ],
  email: 'ahmadhassankhan034@gmail.com',
  github: 'https://github.com/itx-ah-khan',
  githubHandle: 'itx-ah-khan',
  instagram: 'https://www.instagram.com/itx_ah__khan',
  instagramHandle: '@itx_ah__khan',
  cv: 'Ahmad_Hassan_CV.pdf', // lives in /public
}

export const stats = [
  { value: 4, suffix: '', label: 'Core MERN technologies' },
  { value: 3, suffix: '+', label: 'Full-stack client builds' },
  { value: 2025, suffix: '', label: 'MERN certified', plain: true },
  { value: 100, suffix: '%', label: 'Responsive, API-driven UIs' },
]

export const skillGroups = [
  { title: 'Stack', icon: 'layers', items: ['MongoDB', 'Express.js', 'React', 'Node.js'] },
  { title: 'Backend', icon: 'server', items: ['REST APIs', 'Node.js', 'Express routing', 'MongoDB models'] },
  { title: 'Frontend', icon: 'monitor', items: ['JavaScript', 'React', 'HTML', 'CSS'] },
  { title: 'Tools', icon: 'git', items: ['Git', 'GitHub', 'npm', 'VS Code'] },
]

export const whatIBuild = [
  'Full-stack web applications on the MERN stack',
  'React dashboards and admin panels backed by Node.js APIs and MongoDB databases',
  'REST APIs with Express.js and MongoDB',
]

export const certification = {
  title: 'MERN Development',
  issuer: 'LAHZA IT Programs by Legacy',
  detail: 'Certificate of Achievement',
  date: '17 Nov 2025',
  reg: 'LZ-666-43',
}

// Client projects are under company NDA — mockups are illustrative, no live/code links.
export const projects = [
  {
    id: 'shop',
    title: 'E-Commerce Store',
    desc: 'A full-stack e-commerce web app with product management, cart and orders.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    icon: 'cart',
    features: [
      'Product catalogue with categories, search and filters',
      'Cart, checkout flow and order history',
      'Admin product management (create, edit, stock)',
      'REST API with Express and MongoDB models',
    ],
  },
  {
    id: 'admin',
    title: 'Admin Dashboard',
    desc: 'A MERN dashboard to manage users, products and orders with a clean UI.',
    tags: ['React', 'Express', 'MongoDB'],
    icon: 'chart',
    features: [
      'Live stats cards and sales charts',
      'User, product and order management tables',
      'Role-based access for admins',
      'Node.js API feeding every widget',
    ],
  },
  {
    id: 'tasks',
    title: 'Task Management App',
    desc: 'A simple and efficient task manager to create, update and track daily tasks.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    icon: 'check',
    features: [
      'Create, update, complete and delete tasks',
      'Today / Upcoming / Completed views',
      'Persistent storage in MongoDB',
      'Fast, responsive React interface',
    ],
  },
]
