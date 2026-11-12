import { useCallback, useEffect, useState } from 'react'
import { api } from '../../services/api.js'
import SectionHeader from '../SectionHeader.jsx'
import GameForm from './GameForm.jsx'
import GameViewer3D from './GameViewer3D.jsx'
import GameGrid from './GameGrid.jsx'

// 1. Recibimos la prop addToCart desde App.jsx
export default function GamesSection({ addToCart }) {
  const [games, setGames] = useState([])
  const [gamesLoading, setGamesLoading] = useState(true)
  const [gamesError, setGamesError] = useState('')
  
  const [selectedGame, setSelectedGame] = useState(null)

  const [platforms, setPlatforms] = useState([])
  const [genres, setGenres] = useState([])
  const [optionsLoading, setOptionsLoading] = useState(true)
  const [optionsError, setOptionsError] = useState('')

  const loadGames = useCallback(async () => {
    setGamesLoading(true)
    setGamesError('')
    try {
      const data = await api.getGames()
      const safeData = data || [] 
      setGames(safeData)
      
      if (safeData.length > 0 && !selectedGame) {
        setSelectedGame(safeData[0])
      }
    } catch (err) {
      setGamesError(err.message)
    } finally {
      setGamesLoading(false)
    }
  }, [selectedGame])

  const loadOptions = useCallback(async () => {
    setOptionsLoading(true)
    setOptionsError('')
    try {
      const [platformsData, genresData] = await Promise.all([api.getPlatforms(), api.getGenres()])
      setPlatforms(platformsData || []) 
      setGenres(genresData || [])       
    } catch (err) {
      setOptionsError(`No se pudieron cargar plataformas/géneros. ${err.message}`)
    } finally {
      setOptionsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadGames()
    loadOptions()
  }, [loadGames, loadOptions])

  return (
    <div className="space-y-6">
      <SectionHeader title="Juegos" subtitle="Administra el catálogo de videojuegos de la bóveda." />
      
      <div className="grid gap-6 lg:grid-cols-[400px_1fr]">
        {/* FORMULARIO (Lo ocultaremos luego con el Modo Admin) */}
        <GameForm
          platforms={platforms}
          genres={genres}
          optionsLoading={optionsLoading}
          optionsError={optionsError}
          onRetryOptions={loadOptions}
          onCreated={loadGames}
        />
        
        {/* VISOR 3D y BOTÓN DE COMPRAR DESTACADO */}
        <div className="flex flex-col gap-4">
          {selectedGame?.image_url ? (
            <GameViewer3D coverUrl={selectedGame.image_url} />
          ) : (
            <div className="flex items-center justify-center h-72 bg-slate-900 rounded-xl text-slate-400 border border-slate-700">
              Selecciona un juego con imagen para ver el visor 3D
            </div>
          )}
          
          {/* Botón para comprar el juego que está en el visor 3D */}
          {selectedGame && (
            <div className="bg-slate-800 p-4 rounded-xl border border-indigo-500/30 flex justify-between items-center">
              <div>
                <p className="text-white font-bold text-lg">{selectedGame.title}</p>
                <p className="text-indigo-400 font-bold">${selectedGame.price}</p>
              </div>
              <button 
                onClick={() => addToCart(selectedGame)}
                disabled={selectedGame.stock === 0}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20"
              >
                Comprar Destacado 🛒
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* GRILLA DE JUEGOS (Le pasamos addToCart) */}
      <GameGrid 
        games={games} 
        loading={gamesLoading} 
        error={gamesError} 
        onRetry={loadGames} 
        onSelectGame={setSelectedGame}
        addToCart={addToCart} 
      />
    </div>
  )
}