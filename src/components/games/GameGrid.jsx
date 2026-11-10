import { Card, Loader, ErrorMessage, EmptyState } from '../ui.jsx'
import GameCard from './GameCard.jsx'

export default function GameGrid({ games, loading, error, onRetry }) {
  return (
    <Card title={`Catálogo (${games.length})`}>
      {loading ? (
        <Loader text="Cargando juegos..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={onRetry} />
      ) : games.length === 0 ? (
        <EmptyState text="Aún no hay juegos. ¡Agrega el primero!" />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </Card>
  )
}
