import { useCallback, useEffect, useState } from 'react'
import { api } from '../../services/api.js'
import SectionHeader from '../SectionHeader.jsx'
import GenreForm from './GenreForm.jsx'
import GenreList from './GenreList.jsx'

export default function GenresSection() {
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadGenres = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      setGenres(await api.getGenres())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadGenres()
  }, [loadGenres])

  return (
    <div>
      <SectionHeader title="Géneros" subtitle="Categorías para clasificar tus juegos." />
      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <GenreForm onCreated={loadGenres} />
        <GenreList genres={genres} loading={loading} error={error} onRetry={loadGenres} />
      </div>
    </div>
  )
}
