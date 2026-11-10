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

  const [platforms, setPlatforms] = useState([])
  const [genres, setGenres] = useState([])
  const [optionsLoading, setOptionsLoading] = useState(true)
  const [optionsError, setOptionsError] = useState('')

  const loadGames = useCallback(async () => {
    setGamesLoading(true)
    setGamesError('')
    try {
      setGames(await api.getGames())
    } catch (err) {
      setGamesError(err.message)
    } finally {
      setGamesLoading(false)
    }
  }, [])

  const loadOptions = useCallback(async () => {
    setOptionsLoading(true)
    setOptionsError('')
    try {
      const [platformsData, genresData] = await Promise.all([api.getPlatforms(), api.getGenres()])
      setPlatforms(platformsData)
      setGenres(genresData)
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
        <GameViewer3D />
      </div>
      <GameGrid games={games} loading={gamesLoading} error={gamesError} onRetry={loadGames} />
    </div>
  )
}
