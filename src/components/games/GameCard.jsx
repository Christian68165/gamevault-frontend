import { useState } from 'react'

export default function GameCard({ game }) {
  const [imgError, setImgError] = useState(false)
  const showImage = game.image_url && !imgError
  const outOfStock = game.stock <= 0

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition hover:-translate-y-1 hover:border-indigo-500/60 hover:shadow-xl hover:shadow-indigo-900/40">
      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-indigo-900 to-fuchsia-900">
        {showImage ? (
          <img
            src={game.image_url}
            alt={game.title}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-indigo-200/70">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-16 w-16">
              <rect x="2" y="6" width="20" height="12" rx="4" />
              <path d="M6 12h4M8 10v4M15 11h.01M18 13h.01" />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-widest">Sin portada</span>
          </div>
        )}
        <span
          className={`absolute top-3 right-3 rounded-full px-2.5 py-1 text-xs font-bold backdrop-blur ${
            outOfStock ? 'bg-red-600/80 text-white' : 'bg-emerald-600/80 text-white'
          }`}
        >
          {outOfStock ? 'Agotado' : `Stock: ${game.stock}`}
        </span>
      </div>
      <div className="space-y-3 p-4">
        <h3 className="line-clamp-2 font-bold text-white" title={game.title}>
          {game.title}
        </h3>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-indigo-500/15 px-2.5 py-1 font-semibold text-indigo-300">
            {game.platform?.name ?? 'Sin plataforma'}
          </span>
          <span className="rounded-full bg-fuchsia-500/15 px-2.5 py-1 font-semibold text-fuchsia-300">
            {game.genre?.name ?? 'Sin género'}
          </span>
        </div>
        <p className="text-2xl font-black text-emerald-400">${Number(game.price).toFixed(2)}</p>
      </div>
    </article>
  )
}
