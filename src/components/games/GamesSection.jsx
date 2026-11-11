import { useCallback, useEffect, useState } from 'react'
import { api } from '../../services/api.js'
import SectionHeader from '../SectionHeader.jsx'
import GameForm from './GameForm.jsx'
import GameViewer3D from './GameViewer3D.jsx'
import GameGrid from './GameGrid.jsx'

export default function GamesSection() {
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
      const safeData = data || [] // Protección por si la API devuelve null
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
      setPlatforms(platformsData || []) // Protección
      setGenres(genresData || [])       // Protección
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
        <GameForm
          platforms={platforms}
          genres={genres}
          optionsLoading={optionsLoading}
          optionsError={optionsError}
          onRetryOptions={loadOptions}
          onCreated={loadGames}
        />
        
        <GameViewer3D coverUrl={selectedGame?.image_url || null} />
      </div>
      
      <GameGrid 
        games={games} 
        loading={gamesLoading} 
        error={gamesError} 
        onRetry={loadGames} 
        onSelectGame={setSelectedGame} 
      />
    </div>
  )
}