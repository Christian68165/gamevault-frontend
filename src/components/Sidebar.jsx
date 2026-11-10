const icon = (d) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    {d}
  </svg>
)

const SECTIONS = [
  {
    id: 'games',
    label: 'Juegos',
    icon: icon(
      <>
        <rect x="2" y="6" width="20" height="12" rx="4" />
        <path d="M6 12h4M8 10v4M15 11h.01M18 13h.01" />
      </>,
    ),
  },
  {
    id: 'platforms',
    label: 'Plataformas',
    icon: icon(
      <>
        <rect x="2" y="4" width="20" height="13" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </>,
    ),
  },
  {
    id: 'genres',
    label: 'Géneros',
    icon: icon(
      <>
        <path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82Z" />
        <path d="M7 7h.01" />
      </>,
    ),
  },
]

export default function Sidebar({ active, onChange }) {
  return (
    <aside className="border-b border-indigo-500/20 bg-slate-900/80 md:sticky md:top-0 md:h-screen md:w-64 md:shrink-0 md:border-r md:border-b-0">
      <div className="flex items-center gap-3 px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-600 text-xl font-black shadow-lg shadow-indigo-900/60">
          G
        </div>
        <div>
          <h1 className="bg-gradient-to-r from-indigo-300 to-fuchsia-400 bg-clip-text text-xl font-black tracking-wider text-transparent">
            GameVault
          </h1>
          <p className="text-xs text-slate-500">Tu bóveda de videojuegos</p>
        </div>
      </div>
      <nav className="flex gap-2 px-4 pb-4 md:flex-col">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => onChange(s.id)}
            className={`flex flex-1 items-center gap-3 rounded-xl px-4 py-3 text-left font-semibold transition md:flex-none ${
              active === s.id
                ? 'bg-indigo-600/20 text-indigo-200 ring-1 ring-indigo-500/60'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
            }`}
          >
            <span>{s.icon}</span>
            {s.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}
