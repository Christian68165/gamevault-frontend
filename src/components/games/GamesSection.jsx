import { useCallback, useEffect, useState } from 'react'
import { api } from '../../services/api.js'
import SectionHeader from '../SectionHeader.jsx'
import GameForm from './GameForm.jsx'
import GameViewer3D from './GameViewer3D.jsx'
import GameGrid from './GameGrid.jsx'

export default function GamesSection({ addToCart, isAdmin }) {
  const [games, setGames] = useState([])
  const [gamesLoading, setGamesLoading] = useState(true)
  const [gamesError, setGamesError] = useState('')
  
  const [selectedGame, setSelectedGame] = useState(null)

  const [platforms, setPlatforms] = useState([])
  const [genres, setGenres] = useState([])
  const [optionsLoading, setOptionsLoading] = useState(true)
  const [optionsError, setOptionsError] = useState('')

  // --- NUEVOS ESTADOS PARA LOS FILTROS ---
  const [filtroPlataforma, setFiltroPlataforma] = useState("todas")
  const [filtroGenero, setFiltroGenero] = useState("todos")

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

  // --- LÓGICA DE FILTRADO ---
  const juegosFiltrados = games.filter(juego => {
    const matchPlataforma = filtroPlataforma === "todas" || juego.platform_id.toString() === filtroPlataforma;
    const matchGenero = filtroGenero === "todos" || juego.genre_id.toString() === filtroGenero;
    return matchPlataforma && matchGenero;
  });

  return (
    <div className="space-y-6">
      <SectionHeader title="Juegos" subtitle="Explora nuestro catálogo de videojuegos." />
      
      {/* SI ES ADMIN: Muestra el formulario y el visor 3D lado a lado */}
      {isAdmin ? (
        <div className="grid gap-6 lg:grid-cols-[400px_1fr]">
          <GameForm
            platforms={platforms}
            genres={genres}
            optionsLoading={optionsLoading}
            optionsError={optionsError}
            onRetryOptions={loadOptions}
            onCreated={loadGames}
          />
          
          <div className="flex flex-col gap-4">
            {selectedGame?.image_url ? (
              <GameViewer3D coverUrl={selectedGame.image_url} />
            ) : (
              <div className="flex items-center justify-center h-72 bg-slate-900 rounded-xl text-slate-400 border border-slate-700">
                Selecciona un juego con imagen para ver el visor 3D
              </div>
            )}
            
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
      ) : (
        /* SI ES CLIENTE: Banner Juego Destacado */
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
          <div className="flex-1 space-y-4 z-10">
            <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              Juego Destacado
            </span>
            <h2 className="text-4xl font-black text-white">{selectedGame?.title || 'Cargando...'}</h2>
            <p className="text-slate-400 text-lg">
              Explora este título en 3D y llévatelo al mejor precio. 
              Plataforma: {selectedGame?.platform?.name} | Género: {selectedGame?.genre?.name}
            </p>
            <button 
              onClick={() => addToCart(selectedGame)}
              disabled={selectedGame?.stock === 0}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg shadow-indigo-500/30 transition-all disabled:opacity-50"
            >
              {selectedGame?.stock === 0 ? 'Agotado' : 'Comprar Ahora por $' + selectedGame?.price}
            </button>
          </div>
          
          <div className="w-full md:w-1/2 h-80 relative">
            {selectedGame?.image_url ? (
              <GameViewer3D coverUrl={selectedGame.image_url} />
            ) : (
              <div className="flex items-center justify-center h-full bg-slate-800 rounded-xl text-slate-500">Sin portada 3D</div>
            )}
          </div>
        </div>
      )}

      {/* --- FILTROS PARA EL CLIENTE --- */}
      <div className="flex flex-wrap gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2">
          <label className="text-sm font-bold text-slate-400">Plataforma:</label>
          <select 
            className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-indigo-500"
            value={filtroPlataforma}
            onChange={(e) => setFiltroPlataforma(e.target.value)}
          >
            <option value="todas">Todas las plataformas</option>
            {platforms.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-bold text-slate-400">Género:</label>
          <select 
            className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-indigo-500"
            value={filtroGenero}
            onChange={(e) => setFiltroGenero(e.target.value)}
          >
            <option value="todos">Todos los géneros</option>
            {genres.map(g => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* LA GRILLA DE JUEGOS (Usa juegosFiltrados en lugar de games) */}
      <GameGrid 
        games={juegosFiltrados} 
        loading={gamesLoading} 
        error={gamesError} 
        onRetry={loadGames} 
        onSelectGame={setSelectedGame}
        addToCart={addToCart} 
      />
    </div>
  )
}