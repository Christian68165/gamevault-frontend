import { Card, Loader, ErrorMessage, EmptyState } from '../ui.jsx'
import GameCard from './GameCard.jsx'

export default function GameGrid({ games, loading, error, onRetry, onSelectGame }) {
  // Aseguramos que games siempre sea un arreglo para evitar errores
  const safeGames = games || [];

  return (
    <Card title={`Catálogo (${safeGames.length})`}>
      {loading ? (
        <Loader text="Cargando juegos..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={onRetry} />
      ) : safeGames.length === 0 ? (
        <EmptyState text="Aún no hay juegos. ¡Agrega el primero!" />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {safeGames.map((game) => (
            <div 
              key={game.id} 
              onClick={() => onSelectGame && onSelectGame(game)} 
              className="cursor-pointer transition-transform hover:scale-105"
            >
              <GameCard game={game} />
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}