import { useCallback, useEffect, useState } from 'react'
import { api } from '../../services/api.js'
import SectionHeader from '../SectionHeader.jsx'
import PlatformForm from './PlatformForm.jsx'
import PlatformList from './PlatformList.jsx'

export default function PlatformsSection() {
  const [platforms, setPlatforms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadPlatforms = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      setPlatforms(await api.getPlatforms())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadPlatforms()
  }, [loadPlatforms])

  return (
    <div>
      <SectionHeader title="Plataformas" subtitle="Consolas y sistemas donde se juega." />
      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <PlatformForm onCreated={loadPlatforms} />
        <PlatformList platforms={platforms} loading={loading} error={error} onRetry={loadPlatforms} />
      </div>
    </div>
  )
}
