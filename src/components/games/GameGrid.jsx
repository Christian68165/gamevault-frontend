import { Card, Loader, ErrorMessage, EmptyState } from '../ui.jsx'
import GameCard from './GameCard.jsx'

// 1. Recibimos addToCart
export default function GameGrid({ games, loading, error, onRetry, onSelectGame, addToCart }) {
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
              className="transition-transform hover:scale-105"
            >
              {/* Le pasamos la función al GameCard */}
              <GameCard 
                game={game} 
                onClick={() => onSelectGame && onSelectGame(game)} 
                onBuy={() => addToCart && addToCart(game)} 
              />
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}