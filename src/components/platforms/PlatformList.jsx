import { Card, Loader, ErrorMessage, EmptyState } from '../ui.jsx'

export default function PlatformList({ platforms, loading, error, onRetry }) {
  return (
    <Card title={`Plataformas registradas (${platforms.length})`}>
      {loading ? (
        <Loader text="Cargando plataformas..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={onRetry} />
      ) : platforms.length === 0 ? (
        <EmptyState text="No hay plataformas registradas." />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-700 text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-3 py-3">ID</th>
                <th className="px-3 py-3">Nombre</th>
                <th className="px-3 py-3">Compañía</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {platforms.map((p) => (
                <tr key={p.id} className="transition hover:bg-indigo-500/5">
                  <td className="px-3 py-3 font-mono text-indigo-400">#{p.id}</td>
                  <td className="px-3 py-3 font-semibold text-white">{p.name}</td>
                  <td className="px-3 py-3 text-slate-300">{p.company}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  )
}
