import { Card, Loader, ErrorMessage, EmptyState } from '../ui.jsx'
import GameCard from './GameCard.jsx'

// 1. Agregamos onSelectGame a las propiedades que recibe
export default function GameGrid({ games, loading, error, onRetry, onSelectGame }) {
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
            // 2. Envolvemos la tarjeta en un div para detectar el clic
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