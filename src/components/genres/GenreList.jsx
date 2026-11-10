import { Card, Loader, ErrorMessage, EmptyState } from '../ui.jsx'

export default function GenreList({ genres, loading, error, onRetry }) {
  return (
    <Card title={`Géneros registrados (${genres.length})`}>
      {loading ? (
        <Loader text="Cargando géneros..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={onRetry} />
      ) : genres.length === 0 ? (
        <EmptyState text="No hay géneros registrados." />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-700 text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-3 py-3">ID</th>
                <th className="px-3 py-3">Nombre</th>
                <th className="px-3 py-3">Descripción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {genres.map((g) => (
                <tr key={g.id} className="transition hover:bg-fuchsia-500/5">
                  <td className="px-3 py-3 font-mono text-fuchsia-400">#{g.id}</td>
                  <td className="px-3 py-3">
                    <span className="rounded-full bg-fuchsia-500/15 px-3 py-1 font-semibold text-fuchsia-300">{g.name}</span>
                  </td>
                  <td className="px-3 py-3 text-slate-300">{g.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  )
}
