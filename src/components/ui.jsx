export function Card({ title, children, className = '' }) {
  return (
    <section
      className={`rounded-2xl border border-indigo-500/20 bg-slate-900/70 p-6 shadow-lg shadow-indigo-950/40 backdrop-blur ${className}`}
    >
      {title && <h2 className="mb-4 text-lg font-bold tracking-wide text-indigo-300">{title}</h2>}
      {children}
    </section>
  )
}

export function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-slate-300">{label}</span>
      {children}
    </label>
  )
}

export const inputClass =
  'w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40'

export function SubmitButton({ loading, children }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full rounded-lg bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-4 py-2.5 font-semibold text-white shadow-lg shadow-indigo-900/50 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? 'Guardando...' : children}
    </button>
  )
}

export function Loader({ text = 'Cargando...' }) {
  return (
    <div className="flex items-center justify-center gap-3 py-10 text-slate-400">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
      {text}
    </div>
  )
}

export function ErrorMessage({ message, onRetry }) {
  if (!message) return null
  return (
    <div className="flex items-start justify-between gap-3 rounded-lg border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-300">
      <span>{message}</span>
      {onRetry && (
        <button onClick={onRetry} className="shrink-0 font-semibold text-red-200 underline hover:text-white">
          Reintentar
        </button>
      )}
    </div>
  )
}

export function SuccessMessage({ message }) {
  if (!message) return null
  return (
    <div className="rounded-lg border border-emerald-500/40 bg-emerald-950/40 px-4 py-3 text-sm text-emerald-300">
      {message}
    </div>
  )
}

export function EmptyState({ text }) {
  return <p className="py-10 text-center text-slate-500">{text}</p>
}
